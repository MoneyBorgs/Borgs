import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Table } from 'rsuite';
import {formatCurrencyText} from "../../utils/TextUtils";
import 'rsuite/dist/rsuite.min.css';
import { RouterStore } from 'mobx-state-router';
import { useRouterStore } from 'mobx-state-router';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
export const CurrencyCell = ({rowData, dataKey, ...props }) => (
	<Cell {...props}>
		<Typography color={conditionalColor(rowData[dataKey])}>
		{formatCurrencyText(rowData[dataKey])}
		</Typography>
		
	</Cell>
	);

var cardStyle = {
	display: 'block'
}

export const PercentCell = ({rowData, dataKey, ...props }) => (
	<Cell {...props}>
		<Typography>
		{rowData[dataKey].toFixed(2)}%
		</Typography>
		
	</Cell>
	);
/*
export function vaTableCard(reportsStore) {
  	return (
    <Card style = {cardStyle}>
      <CardContent>
        <CardHeader title = "Virtual Account Balances"/>
		<div style={{
		display: 'block', width: 1100
		}}>
			<Table
			virtualized height={300}
			data={reportsStore.vaTableBalance}
			onRowClick={data => {
				console.log(data);
			  }}
			>
				<Column width={250} align="center" fixed>
					<HeaderCell>Virtual Account</HeaderCell>
					<Cell dataKey="name" />
				</Column>

				<Column width={150}>
				  <HeaderCell>Account balance</HeaderCell>
				  <CurrencyCell dataKey="balance" rowData={undefined} />
			  	</Column>

				<Column width={150}>
					<HeaderCell>Account expenses</HeaderCell>
					<CurrencyCell dataKey="total_expenses" rowData={undefined}/>
				</Column>

				<Column width={150}>
					<HeaderCell>Account income</HeaderCell>
					<CurrencyCell dataKey="total_incomes" rowData={undefined} />
				</Column>

				<Column width={100}>
					<HeaderCell> Number of transactions</HeaderCell>
					<Cell dataKey="number_of_transactions"/>
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

      </CardContent>
	  <CardActions>
        <Button size="small" onClick={() => { routerStore.goTo('accounts'); }}>See Accounts</Button>
      </CardActions>
    </Card>
  );
}

export function paTableCard(reportsStore) {
	const router = useRouterStore();
	return (
  <Card style = {cardStyle}>
	<CardContent>
		<Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
			Physical Account Balances
		</Typography>

		<div style={{
			display: 'block', width: 1100
				}}>
			<Table
			virtualized height={300}
			data={reportsStore.paTableBalance}
			onRowClick={data => {
				console.log(data);
				}}
			>
				<Column width={250} align="center" fixed>
					<HeaderCell>Physical Account</HeaderCell>
					<Cell dataKey="name" />
				</Column>

				<Column width={150}>
					<HeaderCell>Account balance</HeaderCell>
					<CurrencyCell dataKey="balance" rowData={undefined} />
				</Column>

				<Column width={150}>
					<HeaderCell>Account expenses</HeaderCell>
					<CurrencyCell dataKey="total_expenses" rowData={undefined}/>
				</Column>

				<Column width={150}>
					<HeaderCell>Account income</HeaderCell>
					<CurrencyCell dataKey="total_incomes" rowData={undefined} />
				</Column>

				<Column width={100}>
					<HeaderCell> Number of transactions</HeaderCell>
					<Cell dataKey="number_of_transactions"/>
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

	</CardContent>
	<CardActions>
        <Button size="small" onClick={() => { router.goTo('accounts'); }}>See Accounts</Button>
      </CardActions>
  </Card>
);
}
*/
export function vaTableAccordion(reportsStore, routerStore) {
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
				>
				<Typography>Virtual Accounts Table</Typography>
			</AccordionSummary>
	
			<AccordionDetails>
				<div style={{
				display: 'block', width: 1100
				}}>
					<Table
					virtualized height={300}
					data={reportsStore.vaTableBalance}
					onRowClick={data => {
						console.log(data);
					}}
					>
						<Column width={250} align="center" fixed>
							<HeaderCell>Virtual Account</HeaderCell>
							<Cell dataKey="name" />
						</Column>

						<Column width={150}>
						<HeaderCell>Account balance</HeaderCell>
						<CurrencyCell dataKey="balance" rowData={undefined} />
						</Column>

						<Column width={150}>
							<HeaderCell>Account expenses</HeaderCell>
							<CurrencyCell dataKey="total_expenses" rowData={undefined}/>
						</Column>

						<Column width={150}>
							<HeaderCell>Account income</HeaderCell>
							<CurrencyCell dataKey="total_incomes" rowData={undefined} />
						</Column>

						<Column width={100}>
							<HeaderCell> Number of transactions</HeaderCell>
							<Cell dataKey="number_of_transactions"/>
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

				<br></br>

				<Button size="small" onClick={() => { routerStore.goTo('accounts'); }}>See Accounts</Button>
				
			</AccordionDetails>
		</Accordion>
	);
}

export function paTableAccordion(reportsStore, routerStore) {
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
				>
				<Typography>Physical Accounts Table</Typography>
			</AccordionSummary>
	
			<AccordionDetails>
				<div style={{
				display: 'block', width: 1100
					}}>
				<Table
				virtualized height={300}
				data={reportsStore.paTableBalance}
				onRowClick={data => {
					console.log(data);
					}}
				>
					<Column width={250} align="center" fixed>
						<HeaderCell>Physical Account</HeaderCell>
						<Cell dataKey="name" />
					</Column>

					<Column width={150}>
						<HeaderCell>Account balance</HeaderCell>
						<CurrencyCell dataKey="balance" rowData={undefined} />
					</Column>

					<Column width={150}>
						<HeaderCell>Account expenses</HeaderCell>
						<CurrencyCell dataKey="total_expenses" rowData={undefined}/>
					</Column>router

					<Column width={150}>
						<HeaderCell>Account income</HeaderCell>
						<CurrencyCell dataKey="total_incomes" rowData={undefined} />
					</Column>

					<Column width={100}>
						<HeaderCell> Number of transactions</HeaderCell>
						<Cell dataKey="number_of_transactions"/>
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

				<br></br>

				<Button size="small" onClick={() => { routerStore.goTo('accounts'); }}>See Accounts</Button>
				
			</AccordionDetails>
		</Accordion>
	);
}