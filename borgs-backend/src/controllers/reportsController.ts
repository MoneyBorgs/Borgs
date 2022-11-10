import { Controller, Get, Params, Patch, Post, Put, Response } from '@decorators/express';
import { Console } from 'console';
import dbPool from '../db/dbPool';

@Controller('/')
export default class ReportsController {
    @Get("/accounts_balance/:userId")
	async getTotalBalanceUser(req, res) {
		const userId = req.params.userId;

		const { rows } = await dbPool.query(
			`SELECT
				SUM(value)
			FROM
				Transactions T
			JOIN
				VirtualAccounts VA
			ON
				T.virtual_account = VA.account_id 
			WHERE
				VA.user_id = $1`,
			[userId]
		);

		res.send(rows[0]);
	}

	@Get("/monthly_balance/:va/:year")
	async getMonthlyAccountBalance(req, res) {
		const va = req.params.va;
		const year = req.params.year;

		const { rows } = await dbPool.query(
			`SELECT 
				virtual_account,
				EXTRACT(MONTH FROM TO_TIMESTAMP(timestampepochseconds)) AS month,
				SUM(value) AS net_result
			FROM
				Transactions
			WHERE 
				virtual_account = $1
				AND EXTRACT(YEAR FROM TO_TIMESTAMP(timestampepochseconds)) = $2
			GROUP BY 
				1, 2
			ORDER BY
				1, 2, 3`,
			[va, year]
		);

		let empty_space = rows.length

		let included_months : number[] = []

		for (let j = 0; j < rows.length; j++) {
			included_months.push(rows[j].month)
		}

		let ret : any[] = []

		for (let i = 1; i < 13; i++) {
			if (!included_months.includes(i)) {
				let temp = {
					virtual_account: +va, // + operator turns strings to int
					month: i,
					net_result: 0,
				}

				ret.push(temp)
			} else {
				ret.push(rows.shift())
			}
		}

		res.send(ret);
	}
}