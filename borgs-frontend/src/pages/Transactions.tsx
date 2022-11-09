import React from 'react'
import { useStores } from '../hooks/useStores';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { observer } from "mobx-react-lite";
import { ExpenseEditCreateModal } from '../components/transactions/NewExpenseModal';
import { NewTransactionMenu } from '../components/transactions/NewTransactionMenu';
import Transaction from '../model/Transaction';
import { Typography } from '@mui/material';

export const Transactions = observer(() => {

	let { transactionsStore, accountsStore, dashboardStore } = useStores();

	return (
		<div
			style={{
				padding: "1em 2.5em",
			}}>
			<h1>Transactions</h1>
			<NewTransactionMenu/>
		</div>
	)
});