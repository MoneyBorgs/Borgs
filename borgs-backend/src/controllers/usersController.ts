import { Controller, Post } from '@decorators/express';
import dbPool from '../db/dbPool';
import User from '../model/User';

@Controller('/')
export default class UsersController {
    @Post("/user")
	async addNewAccount(req, res) {

		const u : User = req.body;
            const result = await dbPool.query(
                `INSERT INTO Users (
                    email,
                    password,
                    firstname,
                    lastname
                )
                VALUES ($1, $2, $3, $4)
                RETURNING uid`,
                [u.email, u.password, u.firstname, u.lastname]
            )

            u.uid = result.rows[0].uid;

			res.send(u);
		} 
	}