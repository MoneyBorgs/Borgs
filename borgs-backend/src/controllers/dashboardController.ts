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

	@Get("/top_categories/:userId")
	async getTopCategories(req, res) {
		const userId = req.params.userId;

		const { rows } = await dbPool.query(
			`SELECT
				TC.displayName AS category,
				SUM(value) AS balance
			FROM Transactions T
			JOIN 
				PhysicalAccounts PA 
				ON 
					T.physical_account = PA.account_id
			JOIN
				TransactionsCategories TC
				ON
					T.category = TC.category_id
			WHERE 
				PA.user_id = $1
			GROUP BY 
				TC.displayName
			ORDER BY 
				balance DESC
			LIMIT 5`,
			[userId]
		);

		res.send(rows);
	}

	@Get("/expenses_incomes/:userId")
	async getExpensesAndIncomes(req, res) {
		const userId = req.params.userId;

		const { rows } = await dbPool.query(
			`SELECT
				SUM(CASE WHEN TC.category_type = 'EXPENSE' THEN T.value ELSE 0 END) AS total_expenses,
				SUM(CASE WHEN TC.category_type = 'INCOME' THEN T.value ELSE 0 END) AS total_incomes
			FROM
				Transactions T
			JOIN
				PhysicalAccounts PA
			ON
				T.physical_account = PA.account_id
			JOIN
				TransactionsCategories TC
			ON
				T.category = TC.category_id
			WHERE
				PA.user_id = $1`,
			[userId]
		);

		res.send(rows);
	}
}