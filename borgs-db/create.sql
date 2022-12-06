-- Put CREATE TABLES SQL Commands here


CREATE TABLE Users (
	uid SERIAL PRIMARY KEY,
	email VARCHAR(48) NOT NULL,
	password VARCHAR(512) NOT NULL, -- Hashed password
	firstname VARCHAR(32),
	lastname VARCHAR(32)
);

CREATE TABLE Logins (
	uid INT NOT NULL REFERENCES Users(uid),
	login_date INT NOT NULL, -- Date stored in unix/epoch time
	PRIMARY KEY (uid, login_date)
);

CREATE TABLE VirtualAccounts (
	account_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES Users(uid),
	name VARCHAR(32) NOT NULL
);

CREATE TABLE PhysicalAccounts (
	account_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES Users(uid),
	name VARCHAR(32) NOT NULL
);

CREATE TYPE transaction_category_type AS ENUM('INCOME', 'EXPENSE', 'TRANSFER');

CREATE TABLE TransactionsCategories (
	category_id SERIAL PRIMARY KEY,
	parent_category int REFERENCES TransactionsCategories(category_id),
	displayName TEXT NOT NULL,
	user_id INT NOT NULL REFERENCES Users(uid),
	category_type transaction_category_type NOT NULL
	
);

-- Create Transactions
CREATE TABLE Transactions (
	transaction_id SERIAL PRIMARY KEY,
	virtual_account INT NOT NULL REFERENCES VirtualAccounts(account_id) ON DELETE CASCADE,
	physical_account INT NOT NULL REFERENCES PhysicalAccounts(account_id) ON DELETE CASCADE,
	value NUMERIC NOT NULL,
	category INT NOT NULL REFERENCES TransactionsCategories(category_id),
	timestampepochseconds INT NOT NULL, -- Date stored in unix/epoch time
	description TEXT,
	notes TEXT,
	sister_transfer_transaction INT REFERENCES Transactions(transaction_id)
);

-- Create tags
CREATE TABLE Tags (
	tag TEXT NOT NULL,
	transaction_id INT NOT NULL REFERENCES Transactions(transaction_id) ON DELETE CASCADE DEFERRABLE,
	PRIMARY KEY (transaction_id, tag)
);