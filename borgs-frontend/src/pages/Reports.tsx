import React, { useState, PureComponent } from 'react';
import { observer } from "mobx-react-lite";
import { useStores } from '../hooks/useStores';
import { AccountPicker } from '../components/fields/AccountPicker';
import Button from '@mui/material/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table } from 'rsuite';

export const Reports = observer(() => {

	const { reportsStore, userStore, accountsStore } = useStores();

	const { Column, HeaderCell, Cell } = Table;

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
			{year}
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

			<Table
			height={400}
			data={reportsStore.getTableData()}
			onRowClick={rowData => {
				console.log(rowData);
			}}
			>
			<Column width={60} align="center" fixed>
				<HeaderCell>Id</HeaderCell>
				<Cell dataKey="id" />
			</Column>

			<Column width={150}>
				<HeaderCell>First Name</HeaderCell>
				<Cell dataKey="firstName" />
			</Column>

			<Column width={150}>
				<HeaderCell>Last Name</HeaderCell>
				<Cell dataKey="lastName" />
			</Column>

			<Column width={100}>
				<HeaderCell>Gender</HeaderCell>
				<Cell dataKey="gender" />
			</Column>

			<Column width={100}>
				<HeaderCell>Age</HeaderCell>
				<Cell dataKey="age" />
			</Column>

			<Column width={150}>
				<HeaderCell>Postcode</HeaderCell>
				<Cell dataKey="postcode" />
			</Column>

			<Column width={300}>
				<HeaderCell>Email</HeaderCell>
				<Cell dataKey="email" />
			</Column>
			<Column width={80} fixed="right">
				<HeaderCell>...</HeaderCell>

				<Cell>
				{rowData => (
					<span>
					<a onClick={() => alert(`id:${rowData.id}`)}> Edit </a>
					</span>
				)}
				</Cell>
			</Column>
			</Table>

			</div>

		
	)
});
