import React, { useState, PureComponent } from 'react';
import { observer } from "mobx-react-lite";
import { useStores } from '../hooks/useStores';
import { AccountPicker } from '../components/fields/AccountPicker';
import Button from '@mui/material/Button';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts';
import {IconButton, Stack, Table} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import {formatCurrencyText} from "../utils/TextUtils";
import { Typography } from '@mui/material';

const { Column, HeaderCell, Cell } = Table;

function conditionalColor(data) {
	var color = "black";
	if (data < 0) {
		color = "red";
	}
	else if (data > 0) {
		color = "green";
	}
	return color;
}

const CurrencyCell = ({rowData, dataKey, ...props }) => (
	<Cell {...props}>
		<Typography color={conditionalColor(rowData[dataKey])}>
		{formatCurrencyText(rowData[dataKey])}
		</Typography>
		
	</Cell>
	);

const PercentCell = ({rowData, dataKey, ...props }) => (
	<Cell {...props}>
		<Typography>
		{rowData[dataKey].toFixed(2)}%
		</Typography>
		
	</Cell>
	);

export const Reports = observer(() => {

	const { reportsStore, userStore, accountsStore } = useStores();

	const year = reportsStore.year;

	const next_year = +year + 1;
	const last_year = +year - 1;

	return (
		<div>
			<br></br>
			<br></br>
			
			<AccountPicker
				defaultValue = {accountsStore.currentVirtualAccountsData[0]}
				options={accountsStore.currentVirtualAccountsData}
				label={"Virtual Account"}
				inputName="virtual-account-picker"
				onChange={((event, account) => {reportsStore.updateVirtualAccount(account.account_id)})} 
			/>


			<Stack style={{marginTop: "1em", marginBottom: "1em"}}>
				<IconButton
					appearance="subtle"
					onClick={() => {reportsStore.updateYear(last_year)}}
					icon={<ArrowLeftLineIcon/>}
				/>
				<h5>{year}</h5>
				<IconButton
					appearance="subtle"
					onClick={() => {reportsStore.updateYear(next_year)}}
					icon={<ArrowRightLineIcon/>}
				/>
			</Stack>

			<ComposedChart width={1100} height={250} data={reportsStore.monthlyBalance} margin={{ top: 5, right: 20, bottom: 5, left: 100 }}>
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis dataKey="month" />
				<YAxis
					tickFormatter={(value) => {return formatCurrencyText(value)}}
				/>
				<Bar dataKey="total_va_expenses" fill="#F26CA7" />
          		<Bar dataKey="total_va_incomes" fill="#21FA90" />
				<Line type="monotone" dataKey="net_result" stroke="#8884d8"/>
				<Tooltip />
			</ComposedChart>

			<br></br> 
			rowData={undefined}
			<br></br>

			<Button variant="contained" onClick={() => {reportsStore.getTableData()}}>Update table</Button>

			<br></br>
			<br></br>

			<Table
			virtualized height={1200}
			data={reportsStore.tableBalance}
			onRowClick={data => {
				console.log(data);
			  }}
			>
				<Column width={250} align="center" fixed>
					<HeaderCell>Virtual Account</HeaderCell>
					<Cell dataKey="name" />
				</Column>

				<Column width={150}>
					<HeaderCell>Account expenses</HeaderCell>
					<CurrencyCell dataKey="total_va_expenses" rowData={undefined}/>
				</Column>

				<Column width={150}>
					<HeaderCell>Account income</HeaderCell>
					<CurrencyCell dataKey="total_va_incomes" rowData={undefined} />
				</Column>

				<Column width={100}>
					<HeaderCell>% of expenses</HeaderCell>
					<PercentCell dataKey="percent_total_expenses" rowData={undefined} />
				</Column>

				<Column width={100}>
					<HeaderCell>% of income</HeaderCell>
					<PercentCell dataKey="percent_total_incomes" rowData={undefined} />
				</Column>
			</Table>

			</div>

		
	)
});
