import { Controller, Get, Params, Patch, Post, Put, Response } from '@decorators/express';
import { Console } from 'console';
import dbPool from '../db/dbPool';

@Controller('/')
export default class ReportsController {
    @Get("/reports_va_table/:userId")
	async getTotalVaBalanceUser(req, res) {
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
				SUM(T.value) AS balance,
				SUM(CASE WHEN TC.category_type = 'EXPENSE' THEN T.value ELSE 0 END) AS total_expenses,
				SUM(CASE WHEN TC.category_type = 'INCOME' THEN T.value ELSE 0 END) AS total_incomes,
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

	@Get("/reports_pa_table/:userId")
	async getTotalPaBalanceUser(req, res) {
		const userId = req.params.userId;

		const { rows } = await dbPool.query(
			`WITH totals AS (
				SELECT
					PA.user_id,
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
					PA.user_id = $1
				GROUP BY
					1
			)
			SELECT
				PA.name,
				COUNT(*) AS number_of_transactions,
				SUM(T.value) AS balance,
				SUM(CASE WHEN TC.category_type = 'EXPENSE' THEN T.value ELSE 0 END) AS total_expenses,
				SUM(CASE WHEN TC.category_type = 'INCOME' THEN T.value ELSE 0 END) AS total_incomes,
				SUM(CASE WHEN TC.category_type = 'EXPENSE' THEN T.value ELSE 0 END)/total_expenses * 100 AS percent_total_expenses,
				SUM(CASE WHEN TC.category_type = 'INCOME' THEN T.value ELSE 0 END)/total_incomes * 100 AS percent_total_incomes
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
			JOIN 
				totals
			ON
				totals.user_id = PA.user_id
			WHERE
				PA.user_id = $1
			GROUP BY
				PA.name, T.physical_account, total_expenses, total_incomes`,
			[userId]
		);

		res.send(rows);
	}

	@Get("/reports_va_monthly_balance/:va/:year")
	async getMonthlyVirtualAccountBalance(req, res) {
		const va = req.params.va;
		const year = req.params.year;

		const { rows } = await dbPool.query(
			`SELECT
				virtual_account  AS account,
				EXTRACT(MONTH FROM TO_TIMESTAMP(timestampepochseconds)) AS month,
				SUM(CASE WHEN TC.category_type = 'EXPENSE' THEN T.value ELSE 0 END) AS total_expenses,
				SUM(CASE WHEN TC.category_type = 'INCOME' THEN T.value ELSE 0 END) AS total_incomes,
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
					account: +va, // + operator turns strings to int
					total_expenses: 0,
					total_incomes: 0,
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

	@Get("/reports_pa_monthly_balance/:pa/:year")
	async getMonthlyPhysicalAccountBalance(req, res) {
		const pa = req.params.pa;
		const year = req.params.year;

		const { rows } = await dbPool.query(
			`SELECT
				physical_account AS account,
				EXTRACT(MONTH FROM TO_TIMESTAMP(timestampepochseconds)) AS month,
				SUM(CASE WHEN TC.category_type = 'EXPENSE' THEN T.value ELSE 0 END) AS total_expenses,
				SUM(CASE WHEN TC.category_type = 'INCOME' THEN T.value ELSE 0 END) AS total_incomes,
				SUM(value) AS net_result,
				COUNT(*) AS number_of_transactions
			FROM
				Transactions T
			JOIN
				TransactionsCategories TC
			ON
				T.category = TC.category_id
			WHERE 
				physical_account = $1
				AND EXTRACT(YEAR FROM TO_TIMESTAMP(timestampepochseconds)) = $2
			GROUP BY 
				1, 2
			ORDER BY
				1, 2, 5`,
			[pa, year]
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
					account: +pa, // + operator turns strings to int
					total_expenses: 0,
					total_incomes: 0,
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