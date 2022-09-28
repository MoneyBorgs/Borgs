import React from 'react'
import { useStores } from '../hooks/useStores';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { observer } from "mobx-react-lite";

export const Transactions = observer(() => {

	let { transactionsStore } = useStores();

	return (
		<div>
			<h1>Transactions + {transactionsStore.test}</h1>
			<CssVarsProvider>
				<Button onClick={() => { transactionsStore.test = transactionsStore.test + "1"}}>Joy UI</Button>
			</CssVarsProvider>
		</div>
	)
});