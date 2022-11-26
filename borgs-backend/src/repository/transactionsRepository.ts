import dbPool from "../db/dbPool";
import {QueryResult} from "pg";
import Transaction from "../model/Transaction";
import DailyTransactions from "../model/DailyTransactions";

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

}