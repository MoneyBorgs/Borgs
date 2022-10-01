import { Controller, Get, Post, Put } from '@decorators/express';

@Controller('/')
export default class TransactionsController {
	@Get("/transaction/:userId")
	getTransactionsForUser(req, res) {
		res.send('respond with a resource' + req.params.userId);
	}

	@Get("/transaction/:userId/:transactionId")
	getTransaction(req, res) {
		res.send('respond with a resource' + req.params.userId + req.params.transactionId);
	}

	@Put("/transaction/:userId/:transactionId")
	updateTransaction(arg0: string, updateTransaction: any) {
		throw new Error("Method not implemented.");
	}

	@Post("/transaction/:userId")
	createTransactionForUser(arg0: string, createTransactionForUser: any) {
		throw new Error("Method not implemented.");
	}
}