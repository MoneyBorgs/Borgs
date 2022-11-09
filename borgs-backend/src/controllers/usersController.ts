import { Controller, Post, Get } from '@decorators/express';
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

    @Get("/user/:emailAddress")
    async getUserWithEmail(req, res) {
        const emailAddress = req.params.emailAddress;
            const { rows } = await dbPool.query(
                `SELECT *
                FROM Users
                WHERE email = $1`,
                [emailAddress]
            )
            res.send(rows);
    }

    @Get("/user/:emailAddress/:passWord")
    async getUserWithPassWord(req, res) {
        const passWord = req.params.passWord;
        const emailAddress = req.params.emailAddress;
            const { rows } = await dbPool.query(
                `SELECT *
                FROM Users
                WHERE password = $1 AND email = $2`,
                [passWord, emailAddress]
            )
            res.send(rows);
    }

    @Get("/user/:firstName")
    async getUsersWithName(req, res) {
        const firstName = req.params.firstName;
            const { rows } = await dbPool.query(
                `SELECT *
                FROM Users
                WHERE firstname = $1`,
                [firstName]
            );
            res.send(rows);
        }
	}