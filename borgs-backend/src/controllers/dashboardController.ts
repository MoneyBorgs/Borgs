import { Controller, Get, Params, Patch, Post, Put, Response } from '@decorators/express';
import dbPool from '../db/dbPool';
import { updateTransactionById } from '../util/queryBuilder';
import format from 'pg-format';
import { ClientBase, PoolClient } from 'pg';
import Transaction from '../model/Transaction';

@Controller('/')
export default class DashboardController {
    @Get("/balances/:userId")
	async getBalancesForUser(req, res) {
		const userId = req.params.userId;

		const { rows } = await dbPool.query(
			`SELECT
				name,
				SUM(value) AS balance
			FROM Transactions T
			INNER JOIN PhysicalAccounts PA ON T.physical_account = PA.account_id
			WHERE PA.user_id = $1
			GROUP BY name`,
			[userId]
		);

		res.send(rows);
	}

	@Get("/total/:userId")
	async getTotalForUser(req, res) {
		const userId = req.params.userId;

		const { rows } = await dbPool.query(
			`SELECT
				SUM(value) AS balance
			FROM Transactions T
			INNER JOIN PhysicalAccounts PA ON T.physical_account = PA.account_id
			WHERE PA.user_id = $1`,
			[userId]
		);

		res.send(rows[0]);
	}
}