import dbPool from "../db/dbPool";
import {ClientBase, QueryResult} from "pg";
import Transaction from "../model/Transaction";
import DailyTransactions from "../model/DailyTransactions";
import TransferTransaction, { getFromAccountTransaction, getToAccountTransaction } from "../model/TransferTransaction";

export default class TransactionsRepository {

    /**
     * Retrieves all the transactions for a given date range
     * @param userId
     * @param startDate UNIX time
     * @param endDate UNIX time
     */
    async getTransactionsForUserInPeriod(userId: number,
                                         startDate : number,
                                         endDate : number
    ): Promise<QueryResult<Transaction>> {
        return dbPool.query(
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
			INNER JOIN VirtualAccounts VA ON T.virtual_account = VA.account_id 
			INNER JOIN Tags ON Tags.transaction_id = T.transaction_id
			WHERE VA.user_id = $1 AND timestampepochseconds BETWEEN $2 AND $3
			GROUP BY T.transaction_id`,
            [userId, startDate, endDate]
        );
    }

    async getTransactionsGroupedPerDay(userId: number,
                                       startDate : number,
                                       endDate : number
    ): Promise<QueryResult<DailyTransactions>> {

        return dbPool.query(
            `
                SELECT
                       json_agg(q) AS transactions,
                       extract(epoch from date_trunc('day', to_timestamp(timestampepochseconds) AT TIME ZONE 'UTC')::timestamp::date) as date,
                       min(ending_balance) filter(where nth_transaction = n_transactions) AS day_ending_balance
                FROM (
                  SELECT
                        T.transaction_id,
                        virtual_account,
                        physical_account,
                        VA.user_id AS va_user_id,
                        value,
                        (
                            SELECT row_to_json(TC.*)
                            FROM borgs.public.TransactionsCategories TC
                            WHERE TC.category_id = T.category
                        ) AS category,
                        timestampepochseconds,
                        description,
                        notes,
                        array_agg(Tags.tag) AS tags,
                        sum(value) OVER (ORDER BY timestampepochseconds ASC) AS ending_balance,
                        count(*) OVER (PARTITION BY date_trunc('day', to_timestamp(timestampepochseconds) AT TIME ZONE 'UTC')) AS n_transactions,
                        row_number() OVER (PARTITION BY date_trunc('day', to_timestamp(timestampepochseconds) AT TIME ZONE 'UTC') ORDER BY timestampepochseconds) AS nth_transaction
                    FROM borgs.public.Transactions T
                    INNER JOIN borgs.public.VirtualAccounts VA ON T.virtual_account = VA.account_id 
                    INNER JOIN borgs.public.Tags ON Tags.transaction_id = T.transaction_id
                    WHERE VA.user_id = $1
                    GROUP BY T.transaction_id, va_user_id
                ) q
                WHERE timestampepochseconds BETWEEN $2 AND $3
                GROUP BY date_trunc('day', to_timestamp(timestampepochseconds) AT TIME ZONE 'UTC')
                ORDER BY date DESC
			`, [userId, startDate, endDate]
        )

    }

    async createTransaction(t: Transaction) {
        const client = await dbPool.connect()
        try {
            await client.query('BEGIN')

            await this.insertTransactionNested(client, t);

            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw (e);
        } finally {
            client.release();
        }
    }

    async createTransferTransaction(t: TransferTransaction) {
        const client = await dbPool.connect()
        try {
            await client.query('BEGIN')

            const fromAccountTransaction = getFromAccountTransaction(t);
            fromAccountTransaction.transaction_id = (await this.insertTransactionNested(client, fromAccountTransaction)).transaction_id;

            const toAccountTransaction = getToAccountTransaction(t);
            toAccountTransaction.transaction_id = (await this.insertTransactionNested(client, toAccountTransaction)).transaction_id;

            await client.query(
                `
					UPDATE borgs.public.Transactions
					SET
						sister_transfer_transaction = $1
					WHERE transaction_id = $2;
				`,
                [toAccountTransaction.transaction_id, fromAccountTransaction.transaction_id]
            );

            await client.query(
                `
					UPDATE borgs.public.Transactions
					SET
						sister_transfer_transaction = $1
					WHERE transaction_id = $2;
				`,
                [fromAccountTransaction.transaction_id, toAccountTransaction.transaction_id,]
            );

            fromAccountTransaction.sister_transfer_transaction = toAccountTransaction.transaction_id;

            await client.query('COMMIT')
            return fromAccountTransaction;
        } catch (e) {
            await client.query('ROLLBACK')
            throw (e);
        } finally {
            client.release();
        }
    }

    /**
     * Routine for inserting a transaction with its tags.
     * Should be preferably called within a SQL Transaction
     * @param client Base client where queries will be sent to; can be in a Transaction state
     * @param t The Borgs transaction to insert
     */
    private async insertTransactionNested(client: ClientBase, t: Transaction) {
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

        return t;
    }

}