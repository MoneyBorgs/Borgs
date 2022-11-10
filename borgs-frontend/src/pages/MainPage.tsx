import React, { useState } from 'react'
import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { ButtonGroup, List, Typography } from '@mui/material';
import DashboardStore from '../stores/DashboardStore';
import Dashboard from '../model/Dashboard';
import { useStores } from '../hooks/useStores';
import { AccountCard } from '../components/dashboard/accountCard';

export const MainPage = observer(() => {
	const {dashboardStore} = useStores();
	return (
		<div>
			<h1>Home</h1>
			<div>

			<Typography>
				Total balance = ${dashboardStore.currentTotalBalance}
			</Typography>

			<h2>Account Balances</h2>

			{
			dashboardStore.currentBalancesData.map( 
				dashboard => {
					return <li key={dashboard.name.toString()}>
						<b>{dashboard.name + ": "}</b> 
						{dashboard.balance.toFixed(2)}
					</li>})
			}
			</div>
		</div>
	)
});