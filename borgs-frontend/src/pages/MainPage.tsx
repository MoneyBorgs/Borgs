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
import { Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export const MainPage = observer(() => {
	const {dashboardStore} = useStores();
	const {Column, HeaderCell, Cell} = Table;

	return (
		<div>
			<h1>Home</h1>
			<div>

			<br></br>

			<Typography>
				Total balance = ${dashboardStore.currentTotalBalance.toFixed(2)}
			</Typography>

			<br></br>
			<br></br>

			<h2>Account Balances</h2>

			<div style={{
            display: 'block', width: 500
        	}}>
				<Table
				autoHeight={true}
				data={dashboardStore.currentBalancesData}
				onRowClick={data => {
					console.log(data);
				}}
				>
					<Column width={300} align="center" fixed>
						<HeaderCell><b>Physical Account</b></HeaderCell>
						<Cell dataKey="name" />
					</Column>

					<Column width={150} align="center">
						<HeaderCell><b>Balance</b></HeaderCell>
						<Cell dataKey="balance" />
					</Column>
				</Table>	
			</div>

			<br></br>
			<br></br>

			<h2>Top Categories</h2>

			<div style={{
            display: 'block', width: 500
        	}}>
				<Table
				autoHeight={true}
				data={dashboardStore.currentTopCategories}
				onRowClick={data => {
					console.log(data);
				}}
				>
					<Column width={300} align="center" fixed>
						<HeaderCell><b>Category</b></HeaderCell>
						<Cell dataKey="category" />
					</Column>

					<Column width={150} align="center">
						<HeaderCell><b>Balance</b></HeaderCell>
						<Cell dataKey="balance" />
					</Column>
				</Table>	
			</div>

			<br></br>
			<br></br>

			<h2>Incomes and Expenses Summary</h2>

			<div style={{
            display: 'block', width: 500
        	}}>
				<Table
				autoHeight={true}
				data={dashboardStore.currentExpensesIncomes}
				onRowClick={data => {
					console.log(data);
				}}
				>
					<Column width={300} align="center" fixed>
						<HeaderCell><b>Total Incomes</b></HeaderCell>
						<Cell dataKey="total_incomes" />
					</Column>

					<Column width={150} align="center">
						<HeaderCell><b>Total Expenses</b></HeaderCell>
						<Cell dataKey="total_expenses" />
					</Column>
				</Table>	
			</div>

			</div>
		</div>
	)
});