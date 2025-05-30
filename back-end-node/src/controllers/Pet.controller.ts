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
}

export default PetController;