import { Controller, Post, Get, Put } from '@decorators/express';
import dbPool from '../db/dbPool';
import Investment from '../model/Investment';

@Controller('/')
export default class UsersController {
    @Post("/investment")
	async addNewInvestment(req, res) {

		const i : Investment = req.body;
            const result = await dbPool.query(
                `INSERT INTO Investments (
                    count,
                    timestampepochseconds,
                    ticker,
                    price
                )
                VALUES ($1, $2, $3, $4)
                RETURNING uid`,
                [i.count, i.timestampepochseconds, i.ticker, i.price]
            )

            console.log("investment inserted into database")

			res.send(i);
		}
	}