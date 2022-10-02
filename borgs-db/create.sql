-- Put CREATE TABLES SQL Commands here

-- Create VirtualAccounts
CREATE TABLE VirtualAccounts (
	account_id SERIAL PRIMARY KEY
);

CREATE TABLE PhysicalAccounts (
	account_id SERIAL PRIMARY KEY
);

CREATE TABLE Categories (
	category_id SERIAL PRIMARY KEY,
	name VARCHAR(50)
);

-- Create Transactions
CREATE TABLE Transactions (
	transaction_id SERIAL PRIMARY KEY,
	virtual_account INT NOT NULL REFERENCES VirtualAccounts(account_id),
	physical_account INT NOT NULL REFERENCES PhysicalAccounts(account_id),
	value INT NOT NULL,
	category INT NOT NULL REFERENCES Categories(category_id),
	timestampEpochSeconds INT NOT NULL,
	description VARCHAR(255),
	notes VARCHAR(255)
);

-- Create tags
CREATE TABLE Tags (
	tag VARCHAR(50) NOT NULL,
	transaction_id INT NOT NULL REFERENCES Transactions(transaction_id),
	PRIMARY KEY (transaction_id, tag)
);