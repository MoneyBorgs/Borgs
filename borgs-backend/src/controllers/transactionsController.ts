import { Controller, Get, Params, Post, Put, Response } from '@decorators/express';
import dbPool from '../db/dbPool';

@Controller('/')
export default class TransactionsController {
	@Get("/transaction/:userId")
	getTransactionsForUser(req, res) {

		dbPool.query("SELECT * FROM Transactions").then((result) => res.send(result.rows));
	}

	@Get("/transaction/:userId/:transactionId")
	getTransaction(@Params() params, @Response() res) {
		res.send('respond with a resource' + params.userId + params.transactionId);
	}

	@Put("/transaction/:userId/:transactionId")
	updateTransaction(req, res) {
		throw new Error("Method not implemented.");
	}

	@Post("/transaction/:userId")
	createTransactionForUser(req, res) {
		throw new Error("Method not implemented.");
	}
}