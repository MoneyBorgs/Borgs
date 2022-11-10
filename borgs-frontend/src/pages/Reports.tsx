import React, { useState, PureComponent } from 'react';
import { observer } from "mobx-react-lite";
import { useStores } from '../hooks/useStores';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AccountPicker } from '../components/fields/AccountPicker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Reports = observer(() => {

	const { reportsStore, userStore, accountsStore } = useStores();

	const [year, setYear] = useState('');

	return (
		<div>
			<br></br>
			<br></br>
			
			<AccountPicker
				options={accountsStore.currentVirtualAccountsData}
				label={"Virtual Account"}
				inputName="virtual-account-picker"
				onChange={((event, account) => { reportsStore.getMonthlyData(account.account_id, +year) })} //+ turns stringyear into int
			/>

			<br></br>
			<br></br>

			<FormControl fullWidth>
			<InputLabel id="select-year-label">Year</InputLabel>
			<Select
				labelId="select-year-label"
				id="select-year"
				value={year}
				label="Year"
				onChange={(event) => setYear(event.target.value)}
			>
				<MenuItem value={2016}>2016</MenuItem>
				<MenuItem value={2017}>2017</MenuItem>
				<MenuItem value={2018}>2018</MenuItem>
				<MenuItem value={2019}>2019</MenuItem>
				<MenuItem value={2020}>2020</MenuItem>
			</Select>
			</FormControl>

			<br></br>
			<br></br>

			<BarChart width={600} height={300} data={reportsStore.monthlyBalance} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis dataKey="month" />
				<YAxis/>
				<Bar dataKey="net_result" fill="#8884d8" />
			</BarChart>

			<br></br> 

			Current balance of account is {reportsStore.totalAccountBalance}

		</div>
	)
});
