import { Controller, Get, Params, Patch, Post, Put, Response } from '@decorators/express';
import dbPool from '../db/dbPool';
import { updateTransactionById } from '../util/queryBuilder';
import format from 'pg-format';
import { ClientBase, PoolClient } from 'pg';
@Controller('/')
export default class AccountsController {
    @Get("/virtualaccounts/:userId")
	async getVirtualAccountsForUser(req, res) {
		const userId = req.params.userId;
		const { rows } = await dbPool.query(
			`SELECT
                name
            FROM VirtualAccounts
            WHERE user_id = $1`,
			[userId]
		);
		res.send(rows);
	}
	@Get("/physicalaccounts/:userId")
	async getPhysicalAccountsForUser(req, res) {
		const userId = req.params.userId;

		const { rows } = await dbPool.query(
			`SELECT
                name
            FROM PhysicalAccounts
            WHERE user_id = $1`,
			[userId]
		);

		res.send(rows);
	}
}