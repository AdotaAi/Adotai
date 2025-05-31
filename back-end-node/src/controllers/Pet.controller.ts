import { Request, Response, RequestHandler } from "express";
import db from "../config/db.ts";

interface SavedPetResponse {
    petId: number;
    petName: string;
    petPhoto: string;
    ongName: string;
    ongId: number;
}

class PetController {

    static getPetInfo: RequestHandler = async (req: Request, res: Response) => {

        const petId = req.params.id;

        if (!petId) {
            res.sendStatus(400);
            console.log('Falta dados');
            return;
        }

        const client = await db();
        try {

            let pet = await client.query(`
                SELECT  
                    Pet.pet_id, 
                    Ong.ong_nome, 
                    Endereco.end_cidade, 
                    Endereco.end_bairro, 
                    Endereco.end_rua, 
                    Endereco.end_numero, 
                    Endereco.end_complemento, 
                    Pet.pet_nome, 
                    Pet.pet_idade, 
                    Pet.pet_especie, 
                    Pet.pet_raca, 
                    Pet.pet_peso, 
                    Pet.pet_sexo, 
                    Pet.pet_temperamento, 
                    Pet.pet_Pcd, 
                    Pet.pet_descricao, 
                    Pet.pet_img_url, 
                    Pet.pet_cor
                    FROM Pet
                    INNER JOIN Ong ON Pet.ong_id = Ong.ong_id
                    INNER JOIN Endereco ON Ong.user_id = Endereco.user_id
                    WHERE Pet.pet_id = $1
                `, [petId]);

            if (pet.rows.length == 0) {
                res.status(404).send('Pet não encontrado');
                return;
            }

            pet = {
                pet_id: pet.rows[0].pet_id,
                ong_nome: pet.rows[0].ong_nome,
                endereco: `${pet.rows[0].end_cidade}, ${pet.rows[0].end_bairro}, ${pet.rows[0].end_rua}, ${pet.rows[0].end_numero} ${pet.rows[0].end_complemento}`,
                pet_nome: pet.rows[0].pet_nome,
                pet_idade: pet.rows[0].pet_idade,
                pet_especie: pet.rows[0].pet_especie,
                pet_raca: pet.rows[0].pet_raca,
                pet_peso: pet.rows[0].pet_peso,
                pet_sexo: pet.rows[0].pet_sexo,
                pet_temperamento: pet.rows[0].pet_temperamento,
                pet_Pcd: pet.rows[0].pet_Pcd,
                pet_descricao: pet.rows[0].pet_descricao,
                pet_img_url: pet.rows[0].pet_img_url,
                pet_cor: pet.rows[0].pet_cor
            }

            res.status(200).send(pet);
            return;
        } catch (error) {
            res.sendStatus(400);
            console.log(error);
            return;
        } finally {
            client.release();
        }
    }

    static getSavedPets: RequestHandler = async (req: Request, res: Response) => {
        const petIds = req.body; // Recebe array de IDs diretamente no body

        if (!petIds || !Array.isArray(petIds)) {
            res.status(400).send('Envie um array com os IDs dos pets');
            console.log('Falta dados ou formato inválido');
            return;
        }

        if (petIds.length === 0) {
            res.status(200).send([]);
            return;
        }

        const client = await db();
        try {
            const pets = await client.query(`
            SELECT
                Pet.pet_id,
                Pet.pet_nome,
                Pet.pet_img_url,
                Ong.ong_nome,
                Ong.ong_id,
                Endereco.end_cidade
            FROM Pet
            INNER JOIN Ong ON Pet.ong_id = Ong.ong_id
            LEFT JOIN Endereco ON Ong.user_id = Endereco.user_id
            WHERE Pet.pet_id = ANY($1::int[])
        `, [petIds]);

            const formattedPets = pets.rows.map(pet => ({
                petId: pet.pet_id,
                petName: pet.pet_nome,
                petPhoto: pet.pet_img_url,
                ongName: pet.ong_nome,
                ongId: pet.ong_id,
                cidade: pet.end_cidade
            }));

            res.status(200).send(formattedPets);
        } catch (error) {
            res.status(400).send('Erro ao buscar pets salvos');
            console.log(error);
        } finally {
            client.release();
        }
    };

    
    static getRecomendedPets: RequestHandler = async (req: Request, res: Response) => {
        const userId = req.params.userId; // Ou extrair do token JWT

        if (!userId) {
            res.status(400).send('ID do usuário é obrigatório');
            return;
        }

        const client = await db();
        try {
            // 1. Obter CEP e preferências do adotante
            const userData = await client.query(`
            SELECT 
                e.end_cep,
                p.pref_especie,
                p.pref_porte,
                p.pref_idade,
                p.pref_temperamento
            FROM Usuarios u
            JOIN Adotante a ON u.user_id = a.user_id
            JOIN Preferencia p ON a.adt_id = p.adt_id
            JOIN Endereco e ON u.user_id = e.user_id
            WHERE u.user_id = $1
        `, [userId]);

            if (userData.rows.length === 0) {
                res.status(404).send('Usuário não encontrado');
                return;
            }

            const { end_cep, pref_especie, pref_porte, pref_idade, pref_temperamento } = userData.rows[0];
            const cepBase = end_cep.substring(0, 4); // Pega os primeiros 4 dígitos do CEP

            // 2. Definir faixa de CEP (ex: 5008 -> busca 5005 a 5011)
            const cepMin = `${Number(cepBase) - 3}0000`;
            const cepMax = `${Number(cepBase) + 3}9999`;

            // 3. Buscar pets compatíveis
            const recommendedPets = await client.query(`
            SELECT 
                p.pet_id as petId,
                p.pet_nome as petName,
                p.pet_img_url as petPhoto,
                p.pet_idade as petAge,
                p.pet_temperamento as petTemperament,
                o.ong_nome as ongName,
                e.end_rua || ', ' || e.end_numero || ' - ' || e.end_bairro || ', ' || e.end_cidade as address
            FROM Pet p
            JOIN Ong o ON p.ong_id = o.ong_id
            JOIN Usuarios u ON o.user_id = u.user_id
            JOIN Endereco e ON u.user_id = e.user_id
            WHERE 
                e.end_cep BETWEEN $1 AND $2
                AND ($3::varchar IS NULL OR p.pet_especie = $3)
                AND ($4::varchar IS NULL OR p.pet_porte = $4)
                AND ($5::varchar IS NULL OR 
                    CASE 
                        WHEN $5 = 'Filhote' THEN p.pet_idade <= 2
                        WHEN $5 = 'Adulto' THEN p.pet_idade > 2 AND p.pet_idade <= 8
                        WHEN $5 = 'Idoso' THEN p.pet_idade > 8
                        ELSE true
                    END)
                AND ($6::varchar IS NULL OR p.pet_temperamento ILIKE '%' || $6 || '%')
            ORDER BY RANDOM()
            LIMIT 10
        `, [cepMin, cepMax, pref_especie, pref_porte, pref_idade, pref_temperamento]);

            // 4. Formatar resposta
            const formattedPets = recommendedPets.rows.map(pet => ({
                petId: pet.petid,
                petName: pet.petname,
                petPhoto: pet.petphoto,
                address: pet.address,
                ongName: pet.ongname,
                age: pet.petage,
                temperament: pet.pettemperament
            }));

            res.status(200).json(formattedPets);
        } catch (error) {
            console.error('Erro na recomendação:', error);
            res.status(500).send('Erro ao buscar pets recomendados');
        } finally {
            client.release();
        }
    };
}

export default PetController;