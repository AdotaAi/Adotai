import { Request, Response } from "express";
import { comparePassword } from "../core/hash";
import db from "../config/db";
import { RequestHandler } from "express-serve-static-core";

class UserController {
    static login: RequestHandler = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            res.sendStatus(400);
            return;
        }

        const client = await db();

        try {

            const user = await client.query('SELECT user_senha, user_token, tipo_id FROM Usuarios WHERE user_email = $1', [email]);
            if (!user.rows[0]) {
                res.sendStatus(404);
                return;
            }

            const isValidPassword = await comparePassword(password, user.rows[0].user_senha);
            if (!isValidPassword) {
                res.sendStatus(401);
                return;
            }

            res.status(200).json({ token: user.rows[0].user_token, type: user.rows[0].tipo_id });
            return;
        } catch (error) {
            res.sendStatus(500);
            return;
        } finally {
            client.release();
        }
    }

    static getProfile: RequestHandler = async (req: Request, res: Response) => {
        const token = req.params.token;

        if(!token) {
            res.sendStatus(400);
            return;
        }

        const client = await db();

        try {
            
            const tipo = await client.query(`
                SELECT tipo_id, user_id FROM Usuarios
                WHERE user_token = $1
            `, [token]);

            if (!tipo.rows[0]) {
                res.sendStatus(404);
                return;
            }

            if (tipo.rows[0].tipo_id === 1) {
                const user = await client.query(`
                    SELECT user_nome, user_email, user_img_url FROM Usuarios
                    WHERE user_token = $1
                `, [token]);

                if (!user.rows[0]) {
                    res.sendStatus(404);
                    return;
                }

                res.status(200).send(user.rows[0]);
                return;
            } else if (tipo.rows[0].tipo_id === 2) {
                const user = await client.query(`
                    SELECT Ong.ong_nome, Usuarios.user_email, Usuarios.user_img_url
                    FROM Usuarios
                    INNER JOIN Ong
                    ON Ong.user_id = Usuarios.user_id
                    WHERE Usuarios.user_token = $1
                `, [token]);

                if (!user.rows[0]) {
                    res.sendStatus(404);
                    return;
                }

                res.status(200).send(user.rows[0]);
                return;
            }
            
            res.sendStatus(404);
            return;

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        } finally {
            client.release();
        }
    }
}

export default UserController;