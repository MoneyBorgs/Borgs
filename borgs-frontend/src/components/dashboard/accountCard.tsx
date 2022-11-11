import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const {Column, HeaderCell, Cell} = Table;
const BoldCell = ({rowData, dataKey, ...props }) => (
	<Cell {...props}>
		<b>{rowData[dataKey]}</b>
	</Cell>
	);
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
		$ {rowData[dataKey].toFixed(2)}
		</Typography>
		
	</Cell>
	);

export default function accountCard(dashboardStore) {
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
        <Button size="small">See Accounts</Button>
      </CardActions>
    </Card>
  );
}

export function categoryCard(dashboardStore) {
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
	  	<Button size="small">See Detailed Reports</Button>
	  </CardActions>
    </Card>
  );
}

export function incomesAndExpensesCard(dashboardStore) {
	return (
  <Card>
	<CardContent>
	  <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
		Incomes and Expenses Summary
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
						<HeaderCell><b>Total Incomes</b></HeaderCell>
						<CurrencyCell dataKey="total_incomes" rowData={undefined}/>
					</Column>

					<Column width={250} align="center">
						<HeaderCell><b>Total Expenses</b></HeaderCell>
						<CurrencyCell dataKey="total_expenses" rowData={undefined}/>
					</Column>
				</Table>	
			</div>
	</CardContent>
	<CardActions>
	  <Button size="small">See Detailed Reports</Button>
	</CardActions>
  </Card>
);
}