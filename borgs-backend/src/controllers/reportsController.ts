import { Controller, Get, Params, Patch, Post, Put, Response } from '@decorators/express';
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

	@Get("/monthly_balance/:userId/:year")
	async getMonthlyAccountBalance(req, res) {
		const userId = req.params.userId;
		const year = req.params.year;

		const { rows } = await dbPool.query(
			`SELECT 
				virtual_account,
				EXTRACT(MONTH FROM TO_TIMESTAMP(timestampepochseconds)) AS month,	
				SUM(value) AS net_result
			FROM
				Transactions
			WHERE 
				virtual_account IN (
					SELECT
						account_id
					FROM
						VirtualAccounts
					WHERE
						user_id = $1
				)
				AND EXTRACT(YEAR FROM TO_TIMESTAMP(timestampepochseconds)) = $2
			GROUP BY 
				1, 2`,
			[userId, year]
		);

		res.send(rows);
	}
}