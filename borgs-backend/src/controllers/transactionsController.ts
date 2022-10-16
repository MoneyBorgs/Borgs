import { Controller, Get, Params, Patch, Post, Put, Response } from '@decorators/express';
import dbPool from '../db/dbPool';
import { updateTransactionById } from '../util/queryBuilder';
import format from 'pg-format';
import { ClientBase, PoolClient } from 'pg';
import Transaction from '../model/Transaction';

@Controller('/')
export default class TransactionsController {
	@Get("/transaction/:userId")
	async getTransactionsForUser(req, res) {
		const userId = req.params.userId;

		const { rows } = await dbPool.query(
			`SELECT
				T.transaction_id,
				virtual_account,
				physical_account,
				value,
				TC.displayName AS category,
				timestampepochseconds,
				description,
				notes,
				array_agg(Tags.tag) AS tags
			FROM Transactions T
			INNER JOIN VirtualAccounts VA ON T.virtual_account = VA.account_id 
			INNER JOIN TransactionsCategories TC ON T.category = TC.category_Id
			INNER JOIN Tags ON Tags.transaction_id = T.transaction_id
			WHERE VA.user_id = $1
			GROUP BY T.transaction_id, TC.displayName`,
			[userId]
		);

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
				TC.displayName AS category,
				timestampepochseconds,
				description,
				notes,
				array_agg(Tags.tag) AS tags
			FROM Transactions T
			INNER JOIN TransactionsCategories TC ON T.category = TC.category_Id
			INNER JOIN Tags ON Tags.transaction_id = T.transaction_id
			WHERE T.transaction_id = $1
			GROUP BY T.transaction_id, TC.displayName`,
			[transactionId]
		);

		res.send(rows[0]);
	}

	@Post("/transaction/:userId")
	async createTransactionForUser(req, res) {

		const t : Transaction = req.body;

		const client = await dbPool.connect()
		try {
			await client.query('BEGIN')

			await this.insertTransaction(client, t);

			await client.query('COMMIT')
			res.send(t);
		} catch (e) {
			await client.query('ROLLBACK')
			throw (e);
		} finally {
			client.release();
		}
	}

	@Patch("/transaction/:userId/:transactionId")
	async updateTransaction(req, res) {
		const userId = req.params.userId;
		const transactionId: number = req.params.transactionId

		const tags = req.body.tags;

		const transactionTableParameters = req.body;
		delete transactionTableParameters.tags;

		var transactionQuery = updateTransactionById(transactionId, transactionTableParameters);

		// Turn req.body into an array of values
		var colValues = Object.keys(transactionTableParameters).map(function (key) {
			return transactionTableParameters[key];
		});

		const client = await dbPool.connect()
		try {
			await client.query(
				transactionQuery, colValues
			)

			if (tags) {
				await client.query(
					format("DELETE FROM Tags WHERE transaction_id = %L", transactionId)
				);

				for (const tag of tags) {
					await client.query( // TODO: Do within single transaction
						`
							INSERT INTO Tags(
								tag,
								transaction_id
							) VALUES ($1,$2);
						`,
						[tag, transactionId]
					);
				}
			}

			// Handle transfer transaction
			// TODO test

			const transactionCategory = await this.getTransactionType(client, transactionId);

			if (transactionCategory === "TRANSFER") {
				client.query(format(
					`
					UPDATE Transactions
					SET value = %L
					WHERE sister_transfer_transaction = %L
					`,
					-transactionTableParameters.value, // Negative needed for transfer
					transactionId
				)
				)
			}

			const returnObject = req.body;
			returnObject.tags = tags;
			returnObject.transaction_id = transactionId;
			res.send(req.body);

			await client.query('COMMIT');
		} catch (e) {
			await client.query('ROLLBACK')
			throw (e);
		} finally {
			client.release();
		}
	}
	/**
	 * 
	 */
	@Post("/transaction/transfer/:userId")
	async createTransferTransaction(req, res) {

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

	async insertTransaction(client: ClientBase, t: Transaction) {
		const result = await client.query(
			`
					INSERT INTO Transactions(
						virtual_account,
						physical_account,
						value,
						category,
						timestampEpochSeconds,
						description,
						notes
					) VALUES ($1,$2,$3,$4,$5,$6,$7)
					RETURNING transaction_id;
				`,
			[t.virtual_account, t.physical_account, t.value, t.category, t.timestampEpochSeconds, t.description, t.notes]
		);

		t.transaction_id = result.rows[0].transaction_id;

		for (const tag of t.tags) {
			await client.query( // TODO: Do within single transaction
				`
						INSERT INTO Tags(
							tag,
							transaction_id
						) VALUES ($1,$2);
					`,
				[tag, t.transaction_id]
			);
		}
	}
}