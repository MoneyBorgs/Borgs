INSERT INTO Users DEFAULT VALUES;

INSERT INTO PhysicalAccounts(user_id) VALUES (1);
INSERT INTO VirtualAccounts(user_id) VALUES (1);

INSERT INTO TransactionsCategories(user_id, displayName, category_type) VALUES (1, 'Salary', 'INCOME');
INSERT INTO TransactionsCategories(user_id, displayName, category_type) VALUES (1, 'Rent', 'EXPENSE');

INSERT INTO Transactions(
	virtual_account,
	physical_account,
	value,
	category,
	timestampEpochSeconds,
	description,
	notes
) VALUES (
	1,
	1,
	100,
	1,
	10000,
	'A big description',
	'Some notes here'
);

INSERT INTO Tags(
	tag,
	transaction_id
) VALUES (
	'ESSENTIAL_EXPENSE',
	1
);