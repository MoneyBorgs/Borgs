import React, { useState, PureComponent } from 'react';
import { observer } from "mobx-react-lite";
import { useStores } from '../hooks/useStores';
import { AccountPicker } from '../components/fields/AccountPicker';
import Button from '@mui/material/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const { Column, HeaderCell, Cell } = Table;

export const Reports = observer(() => {

	const { reportsStore, userStore, accountsStore } = useStores();

	const year = reportsStore.year;

	const next_year = +year + 1
	const last_year = +year - 1

	return (
		<div>
			<br></br>
			<br></br>
			
			<AccountPicker
				options={accountsStore.currentVirtualAccountsData}
				label={"Virtual Account"}
				inputName="virtual-account-picker"
				onChange={((event, account) => { reportsStore.updateVirtualAccount(account.account_id) })} //+ turns stringyear into int
			/>

			<br></br>
			<br></br>

			<Button variant="contained" onClick={() => {reportsStore.updateYear(next_year)}}>Increase year</Button>

			<br></br>
			<h2>{year}</h2>
			<br></br>

			<Button variant="contained" onClick={() => {reportsStore.updateYear(last_year)}}>Decrease year</Button>

			<br></br>
			<br></br>

			<BarChart width={600} height={300} data={reportsStore.monthlyBalance} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis dataKey="month" />
				<YAxis/>
				<Bar dataKey="net_result" fill="#8884d8" />
			</BarChart>

			<br></br> 

			The change in balance of {reportsStore.virtualAccount} throughout {year} is {reportsStore.totalAccountBalance}

			<br></br>
			<br></br>

			<h2>General virtual account reports</h2>

			<br></br>

			<Button variant="contained" onClick={() => {reportsStore.getTableData()}}>Update table</Button>

			<br></br>
			<br></br>

			<Table
			virtualized height={800}
			data={reportsStore.tableBalance}
			onRowClick={data => {
				console.log(data);
			  }}
			>
				<Column width={60} align="center" fixed>
					<HeaderCell>Id</HeaderCell>
					<Cell dataKey="virtual_account" />
				</Column>

				<Column width={150}>
					<HeaderCell>Account expenses</HeaderCell>
					<Cell dataKey="total_va_expenses" />
				</Column>

				<Column width={150}>
					<HeaderCell>Account income</HeaderCell>
					<Cell dataKey="total_va_incomes" />
				</Column>

				<Column width={100}>
					<HeaderCell>% of total expenses</HeaderCell>
					<Cell dataKey="percent_total_expenses" />
				</Column>

				<Column width={100}>
					<HeaderCell>% of total income</HeaderCell>
					<Cell dataKey="percent_total_incomes" />
				</Column>
			</Table>

			</div>

		
	)
});
