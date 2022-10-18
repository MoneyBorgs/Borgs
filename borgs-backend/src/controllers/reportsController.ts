import { Controller, Get, Params, Patch, Post, Put, Response } from '@decorators/express';
import dbPool from '../db/dbPool';

@Controller('/')
export default class ReportsController {
    @Get("/accounts_balance/:userId")
	async getMonthlyBalanceForUser(req, res) {
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

		res.send(rows);
	}
}