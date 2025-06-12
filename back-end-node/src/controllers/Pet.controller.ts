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
            const pets = await client.query(`
                WITH preferencias_adotante AS (
                    SELECT pref.*, e.end_cep AS adotante_cep
                    FROM Usuarios u
                    JOIN Adotante a ON u.user_id = a.user_id
                    JOIN Preferencia pref ON a.adt_id = pref.adt_id
                    JOIN Endereco e ON u.user_id = e.user_id
                    WHERE u.user_token = $1
                    AND u.tipo_id = (SELECT tipo_id FROM Tipo WHERE tipo_nome = 'Adotante')
                )

                SELECT 
                    p.pet_id,
                    p.pet_nome,
                    p.pet_img_url,
                    o.ong_nome,
                    e_ong.end_bairro
                FROM Pet p
                JOIN Ong o ON p.ong_id = o.ong_id
                JOIN Usuarios u_ong ON o.user_id = u_ong.user_id
                JOIN Endereco e_ong ON u_ong.user_id = e_ong.user_id
                WHERE 
                    o.ong_validado = FALSE
                    AND EXISTS (
                        SELECT 1 FROM preferencias_adotante pref
                        WHERE (
                            p.pet_especie = pref.pref_especie 
                            OR pref.pref_especie IS NULL 
                            OR pref.pref_especie = 'Ambos'
                            OR pref.pref_especie = 'Sem preferência'
                        )
                        AND (
                            (pref.pref_porte = 'Pequeno' AND p.pet_peso <= 10) OR
                            (pref.pref_porte = 'Médio' AND p.pet_peso > 10 AND p.pet_peso <= 25) OR
                            (pref.pref_porte = 'Grande' AND p.pet_peso > 25) OR
                            pref.pref_porte IS NULL OR
                            pref.pref_porte = 'Sem preferência'
                        )
                        AND (
                            (pref.pref_idade = 'Filhote' AND p.pet_idade <= 2) OR
                            (pref.pref_idade = 'Adulto' AND p.pet_idade > 2 AND p.pet_idade <= 8) OR
                            (pref.pref_idade = 'Idoso' AND p.pet_idade > 8) OR
                            pref.pref_idade IS NULL OR
                            pref.pref_idade = 'Sem preferência'
                        )
                        AND (
                            p.pet_sexo = pref.pref_sexo 
                            OR pref.pref_sexo IS NULL 
                            OR pref.pref_sexo = 'Ambos'
                            OR pref.pref_sexo = 'Sem preferência'
                        )
                        AND (
                            p.pet_temperamento = pref.pref_temperamento 
                            OR pref.pref_temperamento IS NULL 
                            OR pref.pref_temperamento = 'Sem preferência'
                        )
                        AND (
                            p.pet_pcd = FALSE 
                            OR pref.pref_aceita_pets_pcd = TRUE
                            OR pref.pref_aceita_pets_pcd IS NULL
                        )
                        AND CAST(e_ong.end_cep AS BIGINT) BETWEEN 
                            (CAST(SUBSTRING((SELECT adotante_cep FROM preferencias_adotante), 1, 2) AS BIGINT) * 1000000 + 
                            GREATEST(CAST(SUBSTRING((SELECT adotante_cep FROM preferencias_adotante), 3, 6) AS BIGINT) - 30000, 0))
                            AND 
                            (CAST(SUBSTRING((SELECT adotante_cep FROM preferencias_adotante), 1, 2) AS BIGINT) * 1000000 + 
                            LEAST(CAST(SUBSTRING((SELECT adotante_cep FROM preferencias_adotante), 3, 6) AS BIGINT) + 30000, 999999))
                    )
                ORDER BY 
                    CASE
                        WHEN EXISTS (
                            SELECT 1 FROM preferencias_adotante pref 
                            WHERE p.pet_especie = pref.pref_especie 
                            AND pref.pref_especie NOT IN ('Ambos', 'Sem preferência')
                        ) THEN 0 ELSE 1 
                    END,
                    CASE
                        WHEN p.pet_peso <= 10 AND EXISTS (
                            SELECT 1 FROM preferencias_adotante pref 
                            WHERE pref.pref_porte = 'Pequeno' 
                            AND pref.pref_porte NOT IN ('Sem preferência')
                        ) THEN 0
                        WHEN p.pet_peso > 10 AND p.pet_peso <= 25 AND EXISTS (
                            SELECT 1 FROM preferencias_adotante pref 
                            WHERE pref.pref_porte = 'Médio' 
                            AND pref.pref_porte NOT IN ('Sem preferência')
                        ) THEN 0
                        WHEN p.pet_peso > 25 AND EXISTS (
                            SELECT 1 FROM preferencias_adotante pref 
                            WHERE pref.pref_porte = 'Grande' 
                            AND pref.pref_porte NOT IN ('Sem preferência')
                        ) THEN 0
                        ELSE 1 
                    END,
                    ABS(CAST(e_ong.end_cep AS BIGINT) - CAST((SELECT adotante_cep FROM preferencias_adotante) AS BIGINT)),
                    p.pet_id
                LIMIT 10;
                `, [userId]);
            
            res.status(200).json(pets.rows);
        } catch (error) {
            console.error('Erro na recomendação:', error);
            res.status(500).send('Erro ao buscar pets recomendados');
        } finally {
            client.release();
        }
    };
}

export default PetController;