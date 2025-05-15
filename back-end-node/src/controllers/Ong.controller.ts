import { Request, Response, RequestHandler } from "express";
import db from "../config/db.ts";
import createToken from "../core/token.ts";
import { comparePassword, hashPassword } from "../core/hash.ts";

class OngController {
    static createOng: RequestHandler = async (req: Request, res: Response) => {
        const {
            about,
            address,
            organization,
            login
        } = req.body;

        if (
            !about ||
            !address ||
            !organization ||
            !login
        ) {
            res.sendStatus(400);
            return;
        }

        try {
            const client = await db();
            await client.query(`
                    INSERT INTO Usuarios (
                        user_id,
                        tipo_id,
                        user_nome,
                        user_telefone,
                        user_email,
                        user_senha,
                        user_token,
                        user_img_url
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6, $7, $8
                    )
                    `, [
                about.cpf,
                2,
                about.name,
                about.phone,
                login.email,
                await hashPassword(login.password),
                createToken(),
                'https://imgs.search.brave.com/awksT_Zoh8G9Qn5d-CbZP4gAPcl0EDxLP0J88fgAnB4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTg3/ODA1MTU2L3ZlY3Rv/ci9wcm9maWxlLXBp/Y3R1cmUtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Z2t2TERDZ3NI/SC04SGVRZTdKc2po/bE9ZNnZSQkprX3NL/VzlseWFMZ21Mbz0'
            ]);

            await client.query(`
                        INSERT INTO Ong (
                            user_id,
                            ong_nome,
                            ong_cnpj,
                            ong_validado,
                            ong_site,
                            ong_descricao
                        ) VALUES (
                            $1, $2, $3, $4, $5, $6
                        )
                        
                    `, [
                about.cpf,
                organization.name,
                organization.cnpj,
                false,
                organization.site,
                organization.description,
            ]);

            await client.query(`
                INSERT INTO Endereco (
                    user_id,
                    end_cep,
                    end_estado,
                    end_cidade,
                    end_bairro,
                    end_rua,
                    end_numero,
                    end_complemento
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8
                )
            `, [
                about.cpf,
                address.cep,
                address.state,
                address.city,
                address.neighborhood,
                address.street,
                address.number,
                address.complement
            ]);

            let sessionToken = await client.query(`SELECT user_token FROM Usuarios WHERE user_id = $1`, [about.cpf]);
            console.log(sessionToken.rows[0]);
            res.status(200).send(sessionToken.rows[0]);
            return;
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
            return;
        }
    }

    static createPet: RequestHandler = async (req: Request, res: Response) => { 

        const {
            token,
            name,
            age,
            gender,
            specie,
            race,
            color,
            size,
            temperament,
            petPcd,
            description
        } = req.body;

        if (
            !token ||
            !name ||
            !age ||
            !gender ||
            !specie ||
            !race ||
            !color ||
            !size ||
            !temperament ||
            !description
        ) {
            res.sendStatus(400);
            return;
        }

        try {
            const client = await db();

            const userId = await client.query(`SELECT user_id FROM Usuarios WHERE user_token = $1`, [token]);
            const ongId = await client.query(`SELECT ong_id FROM Ong WHERE user_id = $1`, [userId.rows[0].user_id]);

            await client.query(`
                    INSERT INTO Pet (
                        ong_id,
                        pet_nome,
                        pet_idade,
                        pet_especie,
                        pet_raca,
                        pet_peso,
                        pet_sexo,
                        pet_temperamento,
                        pet_pcd,
                        pet_descricao,
                        pet_img_url
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
                    )
                    `, [
                ongId.rows[0].ong_id,
                name,
                age,
                specie,
                race,
                size,
                gender,
                temperament,
                petPcd,
                description,
                `http://192.168.0.104:3000/img/${req.file?.filename}`
            ]);

            res.sendStatus(200);
            return;
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
            return;
        }
    }

    static getPets: RequestHandler = async (req: Request, res: Response) => {
        const { token } = req.body;

        if (!token) {
            res.sendStatus(400);
            return;
        }

        try {
            const client = await db();

            const userId = await client.query(`SELECT user_id FROM Usuarios WHERE user_token = $1`, [token]);
            const ongId = await client.query(`SELECT ong_id FROM Ong WHERE user_id = $1`, [userId.rows[0].user_id]);

            const pets = await client.query(`
                SELECT Pet.pet_id, Pet.pet_nome, Pet.pet_img_url, Ong.ong_nome
                FROM Pet
                INNER JOIN Ong ON Pet.ong_id = Ong.ong_id
                WHERE Pet.ong_id = $1;
            `, [ongId.rows[0].ong_id]);

            res.status(200).send(pets.rows);
            return;
        } catch (error) {
            console.error(error);
            res.sendStatus(400);
            return;
        }


    }
    
}

export default OngController;