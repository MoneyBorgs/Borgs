import { Controller, Delete, Get, Post, Put} from '@decorators/express';
import dbPool from '../db/dbPool';
import format from 'pg-format';
import { ClientBase} from 'pg';
import TransactionsRepository from "../repository/transactionsRepository";
import Transaction from "../model/Transaction";
import TransferTransaction, {
	getToAccountTransaction,
	getToTransactionFromFromTransaction, getFromTransactionFromToTransaction
} from "../model/TransferTransaction";
import Category from "../model/Category";

@Controller('/')
export default class TransactionsController {

	transactionsRepo = new TransactionsRepository();

	@Get("/transaction/:userId")
	async getTransactionsForUser(req, res) {
		const userId = req.params.userId;
		const startDate = req.query.startDate;
		const endDate = req.query.endDate;

		const { rows } = await this.transactionsRepo.getTransactionsForUserInPeriod(userId, startDate, endDate);

		res.send(rows);
	}

	@Get("/transaction/:userId/:transactionId")
	async getTransaction(req, res) {
		const userId = req.params.userId;
		const transactionId = req.params.transactionId

		const { rows } = await dbPool.query(
			/// TODO Return category object instead of displayName
			`SELECT
				T.transaction_id,
				virtual_account,
				physical_account,
				value,
				(
					SELECT row_to_json(TC.*)
					FROM TransactionsCategories TC
					WHERE TC.category_id = T.category
				) AS category,
				timestampepochseconds,
				description,
				notes,
				array_agg(Tags.tag) AS tags
			FROM Transactions T
			INNER JOIN Tags ON Tags.transaction_id = T.transaction_id
			WHERE T.transaction_id = $1
			GROUP BY T.transaction_id`,
			[transactionId]
		);

		res.send(rows[0]);
	}

	@Post("/transaction/:userId")
	async createTransactionForUser(req, res) {
		const t : Transaction = req.body;

		// TODO Validate virtual and physical accounts belong to user
		this.transactionsRepo.createTransaction(t)
			.then(() => res.send(t))
			.catch((e) => {throw(e)})
	}

	@Put("/transaction/:userId/:transactionId")
	async updateTransaction(req, res) {
		const userId = req.params.userId;
		const transactionId: number = parseInt(req.params.transactionId);

		const t : TransferTransaction = req.body;
		const tags = req.body.tags;

		const client = await dbPool.connect()

		try {
			await client.query('BEGIN')

			let from_transfer_transaction;
			let to_transfer_transaction;
			let transactionsToUpdate;

			if(transactionId === t.from_transfer_transaction) {
				from_transfer_transaction = t;
				to_transfer_transaction = getToTransactionFromFromTransaction(t);
				transactionsToUpdate = [from_transfer_transaction, to_transfer_transaction];
			} else if (transactionId === t.to_transfer_transaction) {
				to_transfer_transaction = t;
				from_transfer_transaction = getFromTransactionFromToTransaction(t);
				transactionsToUpdate = [from_transfer_transaction, to_transfer_transaction];
			} else {
				transactionsToUpdate = [t];
			}

			for(const transaction of transactionsToUpdate) {

				await client.query(
				`
					UPDATE Transactions
					SET
						virtual_account = $1,
						physical_account = $2,
						value = $3,
						category = $4,
						timestampEpochSeconds = $5,
						description = $6,
						notes = $7,
						from_transfer_transaction = $8,
						to_transfer_transaction = $9
					WHERE transaction_id = $10
				`,
					[
						transaction.virtual_account,
						transaction.physical_account,
						transaction.value,
						transaction.category.category_id,
						transaction.timestampepochseconds,
						transaction.description,
						transaction.notes,
						transaction.from_transfer_transaction,
						transaction.to_transfer_transaction,
						transaction.transaction_id
					]
				)

				if (tags) {
					await client.query(
						format("DELETE FROM Tags WHERE transaction_id = %L", transaction.transaction_id)
					);

					for (const tag of tags) {
						await client.query(
							`
							INSERT INTO Tags(
								tag,
								transaction_id
							) VALUES ($1,$2);
						`,
							[tag, transaction.transaction_id]
						);
					}
				}
			}
				await client.query('COMMIT')
				res.send(req.body);
			} catch (e) {
				await client.query('ROLLBACK')
				throw (e);
			} finally {
				client.release();
			}
	}

	@Delete("/transaction/:userId/:transactionId")
	async deleteTransaction(req, res) {
		const transactionId: number = parseInt(req.params.transactionId);

		this.transactionsRepo.deleteTransaction(transactionId)
			.then(() => res.send())
			.catch((e) => {console.log(e)});
	}

	@Post("/transaction/transfer/:userId")
	async createTransferTransaction(req, res) {
		const t : TransferTransaction = req.body;

		this.transactionsRepo.createTransferTransaction(t)
			.then(() => res.send(t))
			.catch((e) => {throw(e)})
	}

	@Get("/category/:userId")
	async getCategories(req, res) {
		const userId = req.params.userId;

		const availableCategories = (
			await this.transactionsRepo.getCategories(userId)
		).rows;

		res.send(availableCategories);
	}

	@Post("/category/:userId")
	async createCategory(req, res) {
		const category : Category = req.body;
		const userId = req.params.userId;

		// TODO Validate virtual and physical accounts belong to user
		this.transactionsRepo.createCategory(userId, category)
			.then(() => res.send(category))
			.catch((e) => {throw(e)})
	}

	@Put("/category/:categoryId")
	async updateCategory(req, res) {
		const category : Category = req.body;
		const categoryId = req.params.categoryId;

		this.transactionsRepo.updateCategory(categoryId, category).then(r => res.send(category));
	}

	@Delete("/category/:categoryIdToDelete/:replacingWith")
	async deleteCategory(req, res) {
		const categoryIdToDelete = req.params.categoryIdToDelete;
		const replacingWith = req.params.replacingWith;

		this.transactionsRepo.deleteCategory(categoryIdToDelete, replacingWith).then(r => res.send());
	}

	@Get("/tag/:userId")
	async getTagsForUser(req, res) {
		const userId = req.params.userId;

		const availableTags = (await dbPool.query(`
			SELECT DISTINCT tag
			FROM Tags, Transactions, VirtualAccounts
			WHERE Tags.transaction_id = Transactions.transaction_id
			  	AND Transactions.virtual_account = VirtualAccounts.account_id
				AND VirtualAccounts.user_id = $1
		`, [userId]
		)).rows;

		res.send(availableTags);
	}

	@Get("/transaction_per_day/:userId")
	async getTransactionsGroupedPerDay(req, res) {
		const userId = req.params.userId;
		const startDate = req.query.startDate;
		const endDate = req.query.endDate;

		const { rows } = await this.transactionsRepo.getTransactionsGroupedPerDay(userId, startDate, endDate);

		res.send(rows);
	}

	async getTransactionType(client: ClientBase, transactionId: number) {
		const transactionCategory = (await client.query(format(
			`
				SELECT category_type
				FROM Transactions, TransactionsCategories
				WHERE category = category_id AND transaction_id = %L
				`, transactionId
		))).rows[0].category_type;

		return transactionCategory;
	}
}