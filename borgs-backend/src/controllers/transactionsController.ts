import { Controller, Get, Params, Patch, Post, Put, Query, Response } from '@decorators/express';
import dbPool from '../db/dbPool';
import { updateTransactionById } from '../util/queryBuilder';
import format from 'pg-format';
import { ClientBase, PoolClient } from 'pg';
import Transaction from '../model/Transaction';
import TransactionsRepository from "../repository/transactionsRepository";

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

	@Put("/transaction/:userId/:transactionId")
	async updateTransaction(req, res) {
		const userId = req.params.userId;
		const transactionId: number = req.params.transactionId

		const t : Transaction = req.body;
		const tags = req.body.tags;

		const client = await dbPool.connect()

		try {
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
						notes = $7
					WHERE transaction_id = $8
				`,
				[t.virtual_account, t.physical_account, t.value, t.category.category_id, t.timestampepochseconds, t.description, t.notes, transactionId]
			)

			if (tags) {
				await client.query(
					format("DELETE FROM Tags WHERE transaction_id = %L", transactionId)
				);

				for (const tag of tags) {
					await client.query(
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
						-t.value, // Negative needed for transfer
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

	@Post("/transaction/transfer/:userId")
	async createTransferTransaction(req, res) {

	}

	@Get("/category/:userId")
	async getCategories(req, res) {
		const userId = req.params.userId;

		const availableCategories = (
			await dbPool.query(
				`
				SELECT
					category_id,
					displayname,
					user_id,
					category_type,
					(
						SELECT json_agg(nested_category)
						FROM (
								SELECT
								category_id,
								displayname,
								user_id,
								category_type
							FROM
								TransactionsCategories T_sub
							WHERE
								user_id = $1 AND T_sub.parent_category = T.category_id
						) AS nested_category
					) AS children
				FROM
					TransactionsCategories T
				WHERE user_id =$1 AND parent_category IS NULL
				`,
				[userId]
			)
		).rows;

		res.send(availableCategories);		
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

	@Get("/transaction_per_day/:userId/:transactionId")
	async getTransactionsGroupedPerDay(req, res) {
		const userId = req.params.userId;
		const startDate = req.query.startDate;
		const endDate = req.query.endDate;

		const { rows } = await this.transactionsRepo.getTransactionsForUserInPeriod(userId, startDate, endDate);

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
			[t.virtual_account, t.physical_account, t.value, t.category.category_id, t.timestampepochseconds, t.description, t.notes]
		);

		t.transaction_id = result.rows[0].transaction_id;
		if(t.tags) {
			for (const tag of t.tags) {
				await client.query( // TODO: Do within single transaction
					`
						INSERT INTO Tags(tag,
										 transaction_id)
						VALUES ($1, $2);
					`,
					[tag, t.transaction_id]
				);
			}
		}
	}
}