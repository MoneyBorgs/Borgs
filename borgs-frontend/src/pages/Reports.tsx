import React, { useState, PureComponent } from 'react';
import { observer } from "mobx-react-lite";
import { useStores } from '../hooks/useStores';
import { AccountPicker } from '../components/fields/AccountPicker';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

			<DataGrid
			rows={reportsStore.tableRows}
			columns={reportsStore.tableColumns}
			pageSize={5}
			rowsPerPageOptions={[5]}
			checkboxSelection
			/>

		</div>

		
	)
});
