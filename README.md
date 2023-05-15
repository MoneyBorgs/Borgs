# Overview

Most applications used for managing your money rely on strict, parallel representations of existing bank accounts. These applications serve the purpose well of telling a user *where* their money is, but it fails to separate different money purposes. Often, people will open new checking or savings accounts in different banks just to have a separate place to save money for a specific purpose.

Our project entails an application that will allow users to keep track of virtual accounts (money with different purposes) and their allocations on physical accounts (where the money actually is). These relationships are many-to-many: you can have one virtual account whose different parcels might be allocated in many different physical accounts, while one physical account might contain money linked to different virtual accounts.

This project becomes powerful when you consider that physical accounts might also be investments or other types of assets and that the return coming from these investments' valuation or dividends can be divided proportionally into the virtual accounts that hold participation in those assets.

The idea is inspired by [Wise's jar feature](https://wise.com/gb/blog/save-with-jars-feature-launch), which allows you to keep different money purposes separate within your main Wise account, and [Nubank's "Money Boxes,"](https://international.nubank.com.br/consumer/nubank-announces-money-boxes-a-new-feature-in-the-app-to-save-money-in-a-personalized-way-and-with-varied-yields/) which separates different money purposes in their savings account. Our application expands on this idea by allowing users to set also the physical accounts/investment targets for those money boxes or jars.

## System Design

Below, you may find the complete diagram for the base tables used in the website. 

In addition, we also detail the SQL creation queries with the constraints in place,.

Most assumptions regarding relationship multiplicity are relatively obvious. A user can have multiple virtual and physical accounts, and each account can have only one user attached to it. For the TransactionsCategories table, each user shall have a particular set of categories, and every transaction is mapped to only a single category. One transaction may have multiple associated Tags, and one tag might be associated to multiple transactions, characterizing a many to many relationship.

Future improvements on the database definition may include constraints such as: a Transaction can only have an associated TransactionCategory with the same user id. To avoid multi-level nested categories and for query simplicity, the parent category can not have a parent category itself. 

![Transactions ER Diagram drawio-2](https://github.com/MoneyBorgs/Borgs/assets/38005452/88374fbd-db4e-49ab-852e-0aea4552ce9b)

****************Notably,**************** this ER diagram does not include the investments relation which was added as bonus functionality. It would look like Investments(investment_id, user_id, count, date, ticker, price) where user_id is a foreign key with Users.

We dedicated some of the design thinking process into the Transactions table and how we would compute balances at certain moments in time. We based our transactions on a double-entry accounting system (fully implemented for Transfer transactions) and we have different transactions inputed with their given values and categories.

For computing balance, we settled on dynamically acquiring the balance using SQL's aggregation functions as it ensured consistency with relatively good performance. We considered having separate columns for balance after that given transaction, but that would've incurred a risk of introducing inconsistency to the database as it would be the client's responsibility to properly compute the balance.

### Frameworks used

**Front-End**

React with TypeScript + Mobx

**Back-end**

**API:** NodeJS + Express

**DDBM:** PostgreSQL

# Main functionalities

## Dashboard

As a user, I want to:

1. Easily digest a high-level summary of my transactions from the last month (perfectly complete)
2. Have an updated current balance on all my accounts (perfectly complete)
3. Understand how my money is distributed across my Physical/Virtual Accounts (perfectly complete)
4. Quickly navigate to other parts of the website with more detailed information (perfectly complete)

## Physical x Virtual Accounts Registration

Here, users can register their existing bank accounts, investments, and assets as "physical" accounts—where the money actually is. They can also register jars—virtual accounts with different purposes.

All features are perfectly complete. 

**Create, Edit, and Delete, Accounts**

Be able to create, edit, and delete accounts (either physical or virtual) for the current logged in user, based on name

**Displaying Accounts**

Forgot to include this in the basic functionality previously in the milestones but we will be displaying all accounts in real time, responsive to changes

## Transactions

Users manage their accounts by specifying transactions within their virtual accounts. The transactions can be of type Income, Expense, or Transfer. For future features, transfer transactions wouldn't count for aggregated Reports on income or expenditure.

As a user, I want to:

1. View all my transaction history with associated information. (perfectly realized)
2. Create a transaction with Name, Value, Category, and Notes. (perfectly realized)
    1. When registering an income or expense, a user specifies the target physical account with a default value. (realized but imperfect — no default value is specified)
3. Create a Transfer transaction with Name, Value, Origin (virtual) Account, and Destination (virtual) Account. (perfectly realized)
    1. The user specifies the origin and target physical accounts with default values. (perfectly realized)

## User Registration/Logins

This allows users to create accounts on our site and login with proper credentials.

All features are perfectly complete. 

1. Have a user create an account specifying their name and password
2. Properly validate logins with hashed passwords
3. Allow users to change their display names and reset their passwords

## Reports

A page where users can see reports for their accounts.

All features are perfectly complete. 

1. Graphs outlining account balances for both physical and virtual accounts
2. Detailed breakdown of account balance, expenses, etc. 

# Bonus functionalities

## Investments management

Given that physical accounts might also be investments, we include additional functionalities for managing investments.

All features in this section are perfectly complete. 

1. Choose to invest money from virtual and physical accounts into tickers
2. Track how much money is allocated in each investment
3. Track the change in these investments over time
4. Choose to liquidate money into virtual and physical accounts, which do not necessarily have to be the same ones as before

## Budgeting

Features to consider in future

1. Specify budget for different categories for given months within a time period.
2. Allow budget roll-out for months where actual value < budgeted.
3. View projections on the money I'll have in the future based on my current assets and budgeted income/expenses.

### Evaluation of our system

We tested the application performance against a peak database of ~10,000 users with ~1,000,000 transactions and we consistently got performances of all endpoints having response times under 1 second for ordinary requests. We also took advantage of pgweb query analysis tools to evaluate query plans and we implemented two indexes on VirtualAccounts and Transactions to optimize join and filter times.

### Future work

For improvements and future work, we didn’t do the budgeting bonus feature we initially put in our milestones, but it would be a nice functionality to have for the application due to the idea of virtual accounts being very helpful to the creation and supervision of a budget. We can always improve the look and overall design of some of the pages. If more features are added, perhaps certain pages we have currently can be consolidated into less pages with more functionality on each.

## Starting the front-end

```bash
cd ~/Borgs/borgs-frontend
npm start
### Then navigate to localhost:3000
```

## Starting the back-end

```bash
cd ~/Borgs/borgs-backend
npm start
### You can send REST requests to localhost:8000
```
