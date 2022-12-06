import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { RouterStore } from 'mobx-state-router';
import { useRouterStore } from 'mobx-state-router';
import { CurrencyCell } from '../reports/tableCard';
import { BarChart, YAxis, Bar } from 'recharts';
import { formatCurrencyText } from '../../utils/TextUtils';

let routerStore;
const {Column, HeaderCell, Cell} = Table;
const BoldCell = ({rowData, dataKey, ...props }) => (
	<Cell {...props}>
		<b>{rowData[dataKey]}</b>
	</Cell>
		);

export default function accountCard(dashboardStore, routerStore) {
  	return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
          Account Balances
        </Typography>

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
				<Column width={250} align="center" fixed>
					<HeaderCell><b>Physical Account</b></HeaderCell>
					<BoldCell dataKey="name" rowData={undefined} />
				</Column>

				<Column width={250} align="center">
					<HeaderCell><b>Balance</b></HeaderCell>
					<CurrencyCell dataKey="balance" rowData={undefined}/>
				</Column>
			</Table>	
		</div>

      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => { routerStore.goTo('accounts'); }}>See Accounts</Button>
      </CardActions>
    </Card>
  );
}

export function categoryCard(dashboardStore, routerStore) {
  	return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
          Top Categories
        </Typography>

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
					<Column width={250} align="center" fixed>
						<HeaderCell><b>Category</b></HeaderCell>
						<BoldCell dataKey="category" rowData={undefined} />
					</Column>

					<Column width={250} align="center">
						<HeaderCell><b>Balance</b></HeaderCell>
						<CurrencyCell dataKey="balance" rowData={undefined}/>
					</Column>
				</Table>	
			</div>
      </CardContent>
	  <CardActions>
	  	<Button size="small" onClick={() => { routerStore.goTo('reports'); }}>See Detailed Reports</Button>
	  </CardActions>
    </Card>
  );
}

export function incomesAndExpensesCard(dashboardStore, routerStore) {
	return (
  <Card>
	<CardContent>
	  <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
		Current Month Incomes and Expenses
	  </Typography>

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
					<Column width={250} align="center" fixed>
						<HeaderCell><b>Monthly Expense</b></HeaderCell>
						<CurrencyCell dataKey="total_expenses" rowData={undefined}/>
					</Column>

					<Column width={250} align="center">
						<HeaderCell><b>Monthly Income</b></HeaderCell>
						<CurrencyCell dataKey="total_incomes" rowData={undefined}/>
					</Column>
				</Table>	
			</div>

		<br></br>
		<br></br>
		<br></br> 

		<div style={{
			display: 'block', width: 700
			}}>
				<BarChart width={500} height={250} data={dashboardStore.currentExpensesIncomes} margin={{ top: 5, right: 20, bottom: 5, left: 100 }}>
					<YAxis
						tickFormatter={(value) => {return formatCurrencyText(value)}}
					/>
					<Bar dataKey="total_expenses" fill="#F84F31" />
					<Bar dataKey="total_incomes" fill="#23C552" />
				</BarChart>

				

				<br></br> 
				{dashboardStore.currentExpensesIncomes[0].diff > 0? 
					<Typography>This month you have spent <strong>{formatCurrencyText(dashboardStore.currentExpensesIncomes[0].diff)}</strong> less than you have deposited.</Typography>
					:
					<Typography>This month you have spent <strong>{formatCurrencyText(Math.abs(dashboardStore.currentExpensesIncomes[0].diff))}</strong> more than you have deposited.</Typography> }
				<br></br>
        	</div>
	</CardContent>
	<CardActions>
	  <Button size="small" onClick={() => { routerStore.goTo('reports'); }}>See Detailed Reports</Button>
	</CardActions>
  </Card>
);
}