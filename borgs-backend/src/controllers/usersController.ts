import { Controller, Post, Get, Put } from '@decorators/express';
import dbPool from '../db/dbPool';
import User from '../model/User';

@Controller('/')
export default class UsersController {
    // register a new account into the database
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

    // get all accounts with a given email address in the database
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

    // get all accounts with a given password in the database
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

<<<<<<< HEAD
    // change a user's first and last name in the database
=======
>>>>>>> feature/reports
    @Put("/user/:emailAddress/:firstName/:lastName")
    async updateDisplayName(req) {
        const firstName = req.params.firstName;
        const emailAddress = req.params.emailAddress;
        const lastName = req.params.lastName;
            const { rows } = await dbPool.query(
                `UPDATE Users
                SET firstname = $1, lastname = $2
                WHERE email = $3`,
                [firstName, lastName, emailAddress]
            )
    }

<<<<<<< HEAD
    // change a user's password in the database
=======
>>>>>>> feature/reports
    @Put("/user/:emailAddress/:passWord")
    async resetPassword(req) {
        const passWord = req.params.passWord;
        const emailAddress = req.params.emailAddress;
            const { rows } = await dbPool.query(
                `UPDATE Users
                SET password = $1
                WHERE email = $2`,
                [passWord, emailAddress]
            )
    }

<<<<<<< HEAD
    // get all accounts with a given first name in the database
=======
    @Get("/user/count/:emailAddress")
    async getAccsWithEmail(req, res) {
        const emailAddress = req.params.emailAddress;
            const { rows } = await dbPool.query(
                `SELECT COUNT(*)
                FROM Users
                WHERE email = $1
                GROUP BY email`,
                [emailAddress]
            );
            res.send(rows);
        }

>>>>>>> feature/reports
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