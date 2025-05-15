import { Request, Response, RequestHandler } from "express";
import db from "../config/db.ts";

class PetControllet{

    static getPetId: RequestHandler = async (req: Request, res: Response) => {
        
        const { token } = req.body;
        const petId = req.params.id_pet;

        if(!petId || token){
            res.sendStatus(400);
            return;
        }

        try{
            const client = await db();

            const pet = await client.query(`
                SELECT Pet.*, Ong.ong_nome 
                FROM Pet 
                INNER JOIN Ong ON Ong.ong_id = Pet.ong_id
                WHERE Pet.pet_id = $1 `, [petId]);

                if(pet.rows.length == 0){
                    res.status(404).send('Pet não encontrado');
                    return;
                }

                res.status(200).send(pet.rows[0]);
                return;
        } catch (error){
            res.sendStatus(400);
        }
    }
}

export default PetControllet;