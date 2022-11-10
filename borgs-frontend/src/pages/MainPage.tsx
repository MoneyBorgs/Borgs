import React, { useState } from 'react'
import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Box, ButtonGroup, List, Typography } from '@mui/material';
import DashboardStore from '../stores/DashboardStore';
import Dashboard from '../model/Dashboard';
import { useStores } from '../hooks/useStores';
import { Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import accountCard, { categoryCard, incomesAndExpensesCard } from '../components/dashboard/accountCard';

export const MainPage = observer(() => {
	const {dashboardStore} = useStores();

	return (
		<div>
			<h1>Home</h1>

			<Typography variant='h4' align='center'>
				Total Balance = <strong>$ {dashboardStore.currentTotalBalance.toFixed(2)}</strong>
			</Typography>

			<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

			{accountCard(dashboardStore)}

			{categoryCard(dashboardStore)}

			{incomesAndExpensesCard(dashboardStore)}

			

			</div>
		</div>
	)
});