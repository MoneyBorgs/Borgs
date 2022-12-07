import React from 'react'
import { observer } from "mobx-react-lite";
import { NewInvestmentMenu } from '../components/investments/NewInvestmentMenu';
import Button from '@mui/material/Button';
import { useStores } from '../hooks/useStores';
import { useRouterStore } from 'mobx-state-router';

export const Investments = observer(() => {
	const { reportsStore, userStore, accountsStore } = useStores();
	const routerStore = useRouterStore();

	if (accountsStore.currentPhysicalAccountsData.length === 0) {
		return (
			<div
			style={{
				padding: "1em 2.5em",
			}}>
			<h1>Investments</h1>

			<br></br>

			Make sure to add <strong>both</strong> virtual and physical accounts to create investments!

			<br></br>

			<Button size="small" onClick={() => { routerStore.goTo('accounts'); }}>See Accounts</Button>

			</div>
		)
	}

	return (
		<div
			style={{
				padding: "1em 2.5em",
			}}>
			<h1>Investments</h1>
			<NewInvestmentMenu/>

			
		</div>
	)
});