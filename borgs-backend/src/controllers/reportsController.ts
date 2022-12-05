import { Controller, Get, Params, Patch, Post, Put, Response } from '@decorators/express';
import { Console } from 'console';
import dbPool from '../db/dbPool';

@Controller('/')
export default class ReportsController {
    @Get("/reports_accounts_balance/:userId")
	async getTotalBalanceUser(req, res) {
		const userId = req.params.userId;

		const { rows } = await dbPool.query(
			`WITH totals AS (
				SELECT
					VA.user_id,
					SUM(CASE WHEN TC.category_type = 'EXPENSE' THEN T.value ELSE 0 END) AS total_expenses,
					SUM(CASE WHEN TC.category_type = 'INCOME' THEN T.value ELSE 0 END) AS total_incomes
				FROM
					Transactions T
				JOIN
					VirtualAccounts VA
				ON
					T.virtual_account = VA.account_id
				JOIN
					TransactionsCategories TC
				ON
					T.category = TC.category_id
				WHERE
					VA.user_id = $1
				GROUP BY
					1
			)
			SELECT
				VA.name,
				COUNT(*) AS number_of_transactions,
				SUM(CASE WHEN TC.category_type = 'EXPENSE' THEN T.value ELSE 0 END) AS total_VA_expenses,
				SUM(CASE WHEN TC.category_type = 'INCOME' THEN T.value ELSE 0 END) AS total_VA_incomes,
				SUM(CASE WHEN TC.category_type = 'EXPENSE' THEN T.value ELSE 0 END)/total_expenses * 100 AS percent_total_expenses,
				SUM(CASE WHEN TC.category_type = 'INCOME' THEN T.value ELSE 0 END)/total_incomes * 100 AS percent_total_incomes
			FROM
				Transactions T
			JOIN
				VirtualAccounts VA
			ON
				T.virtual_account = VA.account_id
			JOIN
				TransactionsCategories TC
			ON
				T.category = TC.category_id
			JOIN 
				totals
			ON
				totals.user_id = VA.user_id
			WHERE
				VA.user_id = $1
			GROUP BY
				VA.name, T.virtual_account, total_expenses, total_incomes`,
			[userId]
		);

		res.send(rows);
	}

	@Get("/reports_monthly_balance/:va/:year")
	async getMonthlyAccountBalance(req, res) {
		const va = req.params.va;
		const year = req.params.year;

		const { rows } = await dbPool.query(
			`SELECT 
				virtual_account,
				EXTRACT(MONTH FROM TO_TIMESTAMP(timestampepochseconds)) AS month,
				SUM(CASE WHEN TC.category_type = 'EXPENSE' THEN T.value ELSE 0 END) AS total_VA_expenses,
				SUM(CASE WHEN TC.category_type = 'INCOME' THEN T.value ELSE 0 END) AS total_VA_incomes,
				SUM(value) AS net_result,
				COUNT(*) AS number_of_transactions
			FROM
				Transactions T
			JOIN
				TransactionsCategories TC
			ON
				T.category = TC.category_id
			WHERE 
				virtual_account = $1
				AND EXTRACT(YEAR FROM TO_TIMESTAMP(timestampepochseconds)) = $2
			GROUP BY 
				1, 2
			ORDER BY
				1, 2, 5`,
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
					number_of_transactions: '0',
				}

				ret.push(temp)
			} else {
				ret.push(rows.shift())
			}
		}

		res.send(ret);
	}
}