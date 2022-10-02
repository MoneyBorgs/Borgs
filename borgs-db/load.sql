INSERT INTO PhysicalAccounts DEFAULT VALUES;
INSERT INTO PhysicalAccounts DEFAULT VALUES;
INSERT INTO VirtualAccounts DEFAULT VALUES;
INSERT INTO VirtualAccounts DEFAULT VALUES;

INSERT INTO Categories(name) VALUES ('Testing');

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