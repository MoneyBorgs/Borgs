-- Put CREATE TABLES SQL Commands here

-- Create VirtualAccounts
CREATE TABLE Users (
	uid SERIAL PRIMARY KEY
);

CREATE TABLE VirtualAccounts (
	account_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES Users(uid)
);

CREATE TABLE PhysicalAccounts (
	account_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES Users(uid)
);

CREATE TYPE transaction_category_type AS ENUM('INCOME', 'EXPENSE', 'TRANSFER');

CREATE TABLE TransactionsCategories (
	category_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES Users(uid),
	displayName TEXT NOT NULL,
	category_type transaction_category_type NOT NULL,
	parentCategory int REFERENCES TransactionsCategories(category_id)
);

-- Create Transactions
CREATE TABLE Transactions (
	transaction_id SERIAL PRIMARY KEY,
	virtual_account INT NOT NULL REFERENCES VirtualAccounts(account_id),
	physical_account INT NOT NULL REFERENCES PhysicalAccounts(account_id),
	value INT NOT NULL,
	category INT NOT NULL REFERENCES TransactionsCategories(category_id),
	timestampEpochSeconds INT NOT NULL,
	description TEXT,
	notes TEXT
);

-- Create tags
CREATE TABLE Tags (
	tag TEXT NOT NULL,
	transaction_id INT NOT NULL REFERENCES Transactions(transaction_id) DEFERRABLE,
	PRIMARY KEY (transaction_id, tag)
);