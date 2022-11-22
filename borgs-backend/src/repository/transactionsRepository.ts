import dbPool from "../db/dbPool";

export default class TransactionsRepository {

    /**
     * Retrieves all the transactions for a given date range
     * @param userId
     * @param startDate UNIX time
     * @param endDate UNIX time
     */
    async getTransactionsForUserInPeriod(userId: number, startDate : number, endDate : number) {
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

}