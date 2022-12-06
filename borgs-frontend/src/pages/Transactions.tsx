import React from 'react'
import { useStores } from '../hooks/useStores';
import { observer } from "mobx-react-lite";
import { NewTransactionMenu } from '../components/transactions/NewTransactionMenu';
import {TransactionList} from "../components/transactions/list/TransactionList";
import dayjs from "dayjs";
import {CategoryButton} from "../components/transactions/category/CategoryButton";
import { Stack } from 'rsuite';

export const Transactions = observer(() => {

	let { transactionsStore} = useStores();

	// transactionsStore.updateDailyTransactionsForDateRange(dayjs().startOf("month"), dayjs().endOf("month"));

	return (
		<div
			style={{
				padding: "1em 2.5em",
			}}>
			<h1>Transactions</h1>
			<Stack spacing={5}>
				<NewTransactionMenu/>
				<CategoryButton/>
			</Stack>
			<TransactionList/>
		</div>
	)
});