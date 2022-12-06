import { Controller, Get, Params, Patch, Post, Put, Response, Delete } from '@decorators/express';
import dbPool from '../db/dbPool';
import { updateTransactionById } from '../util/queryBuilder';
import format from 'pg-format';
import { ClientBase, PoolClient } from 'pg';
import Account from '../model/Account';
@Controller('/')
export default class AccountsController {
    @Get("/virtualaccounts/:userId")
	async getVirtualAccountsForUser(req, res) {
		const userId = req.params.userId;
		const { rows } = await dbPool.query(
			`SELECT
                name,
				account_id,
				user_id
            FROM VirtualAccounts
            WHERE user_id = $1`,
			[userId]
		);
		res.send(rows);
	}
	@Get("/physicalaccounts/:userId")
	async getPhysicalAccountsForUser(req, res) {
		const userId = req.params.userId;
		console.log("Getting physical accounts for user controller");
		const { rows } = await dbPool.query(
			`SELECT
                name,
				account_id,
				user_id
            FROM PhysicalAccounts
            WHERE user_id = $1`,
			[userId]
		);

		res.send(rows);
	}
	@Post("/physicalaccount/:userId")
	async addNewPhysicalAccount(req, res) {
		console.log(`Creating new physical account AccountsController`);
		const userId = req.params.userId;
		const a : Account = req.body;
            const result = await dbPool.query(
                `INSERT INTO PhysicalAccounts (
                    user_id,
					name
                )
                VALUES ($1, $2)
                RETURNING account_id`,
                [userId, a.name]
            )

            a.account_id = result.rows[0].account_id;

			res.send(a);
		} 
	@Post("/virtualaccount/:userId")
	async addNewVirtualAccount(req, res) {
		console.log(`Creating new virtual account AccountsController`);
		const userId = req.params.userId;
		const a : Account = req.body;
            const result = await dbPool.query(
                `INSERT INTO VirtualAccounts (
                    user_id,
					name
                )
                VALUES ($1, $2)
                RETURNING account_id`,
                [userId, a.name]
            )

            a.account_id = result.rows[0].account_id;

			res.send(a);
		} 
	@Delete("/virtualaccount/:accountId")
	async deleteVirtualAccount(req, res) {
		console.log(`Deleting virtual account AccountsController`);
		const accountId = req.params.accountId;
		const a : Account = req.body;
            const result = await dbPool.query(
                `DELETE FROM VirtualAccounts 
				WHERE account_id = $1`,
                [accountId]
            )

            a.account_id = result.rows[0].account_id;

			res.send(a);
	}
	@Delete("/physicalaccount/:accountId")
	async deletePhysicalAccount(req, res) {
		console.log(`Deleting physical account AccountsController`);
		const accountId = req.params.accountId;
		const a : Account = req.body;
            const result = await dbPool.query(
                `DELETE FROM PhysicalAccounts 
				WHERE account_id = $1`,
                [accountId]
            )

            a.account_id = result.rows[0].account_id;

			res.send(a);
	}
	@Get("/monthly_physical_balance/:pa/:year")
	async getMonthlyPhysicalAccountBalance(req, res) {
		console.log("Getting physical id monthly balances controller");
		const pa = req.params.pa;
		const year = req.params.year;

		const { rows } = await dbPool.query(
			`SELECT 
				physical_account,
				EXTRACT(MONTH FROM TO_TIMESTAMP(timestampepochseconds)) AS month,
				SUM(value) AS net_result
			FROM
				Transactions
			WHERE 
				physical_account = $1
				AND EXTRACT(YEAR FROM TO_TIMESTAMP(timestampepochseconds)) = $2
			GROUP BY 
				1, 2
			ORDER BY
				1, 2, 3`,
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
					virtual_account: +pa, // + operator turns strings to int
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

	@Get("/monthly_virtual_balance/:va/:year")
	async getMonthlyVirtualAccountBalance(req, res) {
		console.log("Getting virtual id monthly balances controller");
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