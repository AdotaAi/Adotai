import { Request, Response, RequestHandler } from "express";
import db from "../config/db.ts";
import { request } from "http";

class RequestsController {
    static newRequest: RequestHandler = async (req: Request, res: Response) => {
        const { token, petId } = req.body;

        if (!token || !petId) {
            res.sendStatus(400);
            return;
        }

        const client = await db();
        try {
            let ongId = await client.query(`
                SELECT ong_id
                FROM Pet
                WHERE pet_id = $1
                `, [petId]);

            ongId = ongId.rows[0].ong_id;

            let userId = await client.query(`
                SELECT user_id
                FROM Usuarios
                WHERE user_token = $1
                `, [token]);

            userId = userId.rows[0].user_id;

            let adopterId = await client.query(`
                SELECT adt_id
                FROM Adotantes
                WHERE user_id = $1
                `, [userId]);
            
            adopterId = adopterId.rows[0].adt_id;

            let requestId = await client.query(`
                INSERT INTO Pedidos (
                    adt_id,
                    ong_id,
                    pet_id,
                    ped_status
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    'PENDENTE'
                )
                RETURNING ped_id
                `, [adopterId, ongId, petId]);

            requestId = requestId.rows[0].ped_id;

            res.sendStatus(200);
            return;

        } catch (error) {
            res.sendStatus(500);
            console.log(error);
            return;
        } finally {
            client.release();
        }
    }

    static getRequests: RequestHandler = async (req: Request, res: Response) => {
        const { token } = req.params;

        if (!token) {
            res.sendStatus(400);
            return;
        }

        const client = await db();

        try {
            let userId = await client.query(`
                SELECT user_id
                FROM Usuarios
                WHERE user_token = $1
            `, [token]);

            userId = userId.rows[0].user_id;

            let adopterId = await client.query(`
                SELECT adt_id
                FROM Adotante
                WHERE user_id = $1
            `, [userId]);

            if (!adopterId.rows[0]) {
                let ongId = await client.query(`
                    SELECT ong_id
                    FROM Ong
                    WHERE user_id = $1
                `, [userId]);

                ongId = ongId.rows[0].ong_id;

                let requests = await client.query(`
                    SELECT Pedidos.ped_id, Pedidos.ped_status, Pet.pet_nome, Pet.pet_img_url
                    FROM Pedidos
                    INNER JOIN Pet ON Pedidos.pet_id = Pet.pet_id
                    WHERE Pedidos.ong_id = $1
                `, [ongId]);

                res.status(200).json(requests.rows);
            } else {
                adopterId = adopterId.rows[0].adt_id;

                let requests = await client.query(`
                    SELECT Pedidos.ped_id, Pedidos.ped_status, Pet.pet_nome, Pet.pet_img_url
                    FROM Pedidos
                    INNER JOIN Pet ON Pedidos.pet_id = Pet.pet_id
                    WHERE adt_id = $1
                `, [adopterId]);

                res.status(200).json(requests.rows);
            }
            
            return;
        } catch (error) {
            res.sendStatus(500);
            console.log(error);
            return;
        } finally {
            client.release();
        }
    }

    static sendMessage: RequestHandler = async (req: Request, res: Response) => {
        const { email, message, pedId } = req.body;
        
        
        if (!email || !pedId || !message) {
            res.sendStatus(400);
            console.error('Falta dados');
            return;
        }

        const client = await db();
        try {
            await client.query(`
                INSERT INTO Mensagem (
                    user_email,
                    ped_id,
                    msg_conteudo,
                    msg_visualizado
                ) VALUES (
                    $1,
                    $2,
                    $3,
                    FALSE
                )
            `, [email, pedId, message]);
            
            res.sendStatus(200);
            return;
        } catch (error) {
            res.sendStatus(500);
            console.error('Erro ao enviar mensagem ', error);
            console.error(error);
            return;
        } finally {
            client.release();
        }
    }

    static getMessages: RequestHandler = async (req: Request, res: Response) => {
        const { pedId } = req.params;
        
        if (!pedId) {
            res.sendStatus(400);
            return;
        }

        const client = await db();
        try {
            let messages = await client.query(`
                SELECT 
                    msg_id,
                    user_email,
                    msg_conteudo,
                    msg_visualizado
                FROM Mensagem
                WHERE ped_id = $1
            `, [pedId]);
            
            res.status(200).json(messages.rows);
            return;
        } catch (error) {
            res.sendStatus(500);
            console.log(error);
            return;
        } finally {
            client.release();
        }

    }

}

export default RequestsController;