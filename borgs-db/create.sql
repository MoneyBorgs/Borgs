-- Put CREATE TABLES SQL Commands here


CREATE TABLE Users (
	uid SERIAL PRIMARY KEY,
	email VARCHAR(48) NOT NULL UNIQUE,
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
	user_id INT NOT NULL REFERENCES Users(uid), -- main owner
	name VARCHAR(32) NOT NULL
);

CREATE TABLE VirtualAccountCoOwners (
    user_id INT NOT NULL REFERENCES Users(uid),
    account_id INT NOT NULL REFERENCES VirtualAccounts(account_id), -- secondary owners
    PRIMARY KEY (user_id, account_id)
);

CREATE TABLE PhysicalAccounts (
	account_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES Users(uid),
	name VARCHAR(32) NOT NULL
);

CREATE TABLE PhysicalAccountCoOwners (
    user_id INT NOT NULL REFERENCES Users(uid),
    account_id INT NOT NULL REFERENCES PhysicalAccounts(account_id),
    PRIMARY KEY (user_id, account_id)
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
	virtual_account INT NOT NULL REFERENCES VirtualAccounts(account_id),
	physical_account INT NOT NULL REFERENCES PhysicalAccounts(account_id),
	value NUMERIC NOT NULL,
	category INT NOT NULL REFERENCES TransactionsCategories(category_id),
	timestampepochseconds INT NOT NULL, -- Date stored in unix/epoch time
	description TEXT,
	notes TEXT,
    from_transfer_transaction INT REFERENCES Transactions(transaction_id) ON DELETE CASCADE,
	to_transfer_transaction INT REFERENCES Transactions(transaction_id) ON DELETE CASCADE
);

-- Create tags
CREATE TABLE Tags (
	tag TEXT NOT NULL,
	transaction_id INT NOT NULL REFERENCES Transactions(transaction_id) ON DELETE CASCADE DEFERRABLE,
	PRIMARY KEY (transaction_id, tag)
);

-- Create indexes
CREATE INDEX transactions_virtual_account_timestampepochseconds_index
    ON transactions (virtual_account ASC, timestampepochseconds DESC);

create index virtualaccounts_user_id_index
    on virtualaccounts (user_id);