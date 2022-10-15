\COPY Users FROM 'Users.csv' WITH DELIMITER ',' NULL '' CSV
-- since id is auto-generated; we need the next command to adjust the counter
-- for auto-generation so next INSERT will not clash with ids loaded above:
SELECT pg_catalog.setval('public.users_uid_seq',
                         (SELECT MAX(uid)+1 FROM Users),
                         false);

\COPY Logins FROM 'Logins.csv' WITH DELIMITER ',' NULL '' CSV

\COPY VirtualAccounts FROM 'VirtualAccounts.csv' WITH DELIMITER ',' NULL '' CSV
SELECT pg_catalog.setval('public.virtualaccounts_account_id_seq',
                         (SELECT MAX(account_id)+1 FROM VirtualAccounts),
                         false);

\COPY PhysicalAccounts FROM 'PhysicalAccounts.csv' WITH DELIMITER ',' NULL '' CSV
SELECT pg_catalog.setval('public.physicalaccounts_account_id_seq',
                         (SELECT MAX(account_id)+1 FROM PhysicalAccounts),
                         false);

\COPY TransactionsCategories FROM 'TransactionsCategories.csv' WITH DELIMITER ',' NULL '' CSV
SELECT pg_catalog.setval('public.transactionscategories_category_id_seq',
                         (SELECT MAX(category_id)+1 FROM TransactionsCategories),
                         false);

\COPY Transactions FROM 'Transactions.csv' WITH DELIMITER ',' NULL '' CSV
SELECT pg_catalog.setval('public.transactions_transaction_id_seq',
                         (SELECT MAX(transaction_id)+1 FROM Transactions),
                         false);

\COPY Tags FROM 'Tags.csv' WITH DELIMITER ',' NULL '' CSV