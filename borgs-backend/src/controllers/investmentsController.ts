import { Controller, Post, Get, Put } from '@decorators/express';
import dbPool from '../db/dbPool';
import Investment from '../model/Investment';

@Controller('/')
export default class InvestmentsController {
    @Post("/investment")
	async addNewInvestment(req, res) {

		const i : Investment = req.body;
            const result = await dbPool.query(
                `INSERT INTO Investments (
                    user_id,
                    count,
                    timestampepochseconds,
                    ticker,
                    price
                )
                VALUES ($1, $2, $3, $4, $5)
                RETURNING investment_id`,
                [i.user_id, i.count, i.timestampepochseconds, i.ticker, i.price]
            )

            i.investment_id = result.rows[0].investment_id;

            console.log("investment inserted into database")

			res.send(i);
		}

    //@Get("/investment/:uid")
}

/*

{
    email: "hello@email.com"
    password: a
    firstname: b
    lastname: c
}

*/