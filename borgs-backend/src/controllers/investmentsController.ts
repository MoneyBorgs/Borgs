import { Controller, Post, Get, Put, Delete } from '@decorators/express';
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

    @Get("/investment_table/:uid")
    async updateInvestmentTable(req, res) {
        const uid = req.params.uid;

        const { rows } = await dbPool.query(
            `SELECT
                investment_id,
                ticker,
                price AS purchase_price,
                timestampepochseconds AS purchase_date,
                count
            FROM
                Investments I
            WHERE 
                user_id = $1`,
            [uid]
        );
        
        const stockdata = require('node-stock-data');

        for (let i = 0; i < rows.length; i++) {
            
            const response = await stockdata.stocks(
                {
                    API_TOKEN: '2c5d00420484e57438fcb9494d63be16',
                    options: {
                    limit: 1,
                    symbols: rows[i].ticker
                    }
                })
        
            rows[i].current_price = response.data[0].open
            rows[i].value = rows[i].count * rows[i].current_price
            rows[i].percent_change = (100*(rows[i].current_price - rows[i].purchase_price)/rows[i].purchase_price)
        }

        res.send(rows);
    }

    @Delete("/liquidate/:investment_id")
	async liquidateInvestment(req, res) {

        const investment_id = req.params.investment_id
		const i : Investment = req.body;
            const result = await dbPool.query(
                `DELETE FROM Investments
                WHERE investment_id = $1`,
                [investment_id]
            )

			res.send();
		}
}