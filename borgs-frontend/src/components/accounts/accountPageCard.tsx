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
import {formatCurrencyText} from "../../utils/TextUtils";

let routerStore;
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
		{formatCurrencyText(rowData[dataKey])}
		</Typography>
	</Cell>
	);

export function accountCardPhysical(accountsStore, routerStore) {
  	return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
          Physical Accounts
        </Typography>

		<div style={{
		display: 'block', width: 300
		}}>
			<Table
			autoHeight={true}
			data={accountsStore.currentPhysicalAccountsData}
			onRowClick={data => {
				console.log(data);
			}}
			>	
				<Column width={250} align="center" fixed>
					<HeaderCell><b>Account Name</b></HeaderCell>
					<BoldCell dataKey="name" rowData={undefined} />
				</Column>
			</Table>	
		</div>

      </CardContent>
    </Card>
  );
}


export function accountCardVirtual(accountsStore, routerStore) {
	return (
  <Card>
	<CardContent>
	  <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
		Virtual Accounts
	  </Typography>

	  <div style={{
	  display: 'block', width: 300
	  }}>
		  <Table
		  autoHeight={true}
		  data={accountsStore.currentVirtualAccountsData}
		  onRowClick={data => {
			  console.log(data);
		  }}
		  >	
			  <Column width={250} align="center" fixed>
				  <HeaderCell><b>Account Name</b></HeaderCell>
				  <BoldCell dataKey="name" rowData={undefined} />
			  </Column>
		  </Table>	
	  </div>

	</CardContent>
  </Card>
);
}

// export function categoryCard(accountsStore, routerStore) {
//   	return (
//     <Card>
//       <CardContent>
//         <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
//           Top Categories
//         </Typography>

// 		<div style={{
//             display: 'block', width: 500
//         	}}>
// 				<Table
// 				autoHeight={true}
// 				data={accountsStore.currentVirtualAccountsData.map( account => {return <li> {account.name} </li>}}
// 				onRowClick={data => {
// 					console.log(data);
// 				}}
// 				>
// 					<Column width={250} align="center" fixed>
// 						<HeaderCell><b>Category</b></HeaderCell>
// 						<BoldCell dataKey="category" rowData={undefined} />
// 					</Column>

// 					<Column width={250} align="center">
// 						<HeaderCell><b>Balance</b></HeaderCell>
// 						<CurrencyCell dataKey="balance" rowData={undefined}/>
// 					</Column>
// 				</Table>	
// 			</div>
//       </CardContent>
// 	  <CardActions>
// 	  	<Button size="small" onClick={() => { routerStore.goTo('reports'); }}>See Detailed Reports</Button>
// 	  </CardActions>
//     </Card>
//   );
// }

// export function incomesAndExpensesCard(dashboardStore, routerStore) {
// 	return (
//   <Card>
// 	<CardContent>
// 	  <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom>
// 		Incomes and Expenses Summary
// 	  </Typography>

// 	  <div style={{
//             display: 'block', width: 500
//         	}}>
// 				<Table
// 				autoHeight={true}
// 				data={dashboardStore.currentExpensesIncomes}
// 				onRowClick={data => {
// 					console.log(data);
// 				}}
// 				>
// 					<Column width={250} align="center" fixed>
// 						<HeaderCell><b>Total Incomes</b></HeaderCell>
// 						<CurrencyCell dataKey="total_incomes" rowData={undefined}/>
// 					</Column>

// 					<Column width={250} align="center">
// 						<HeaderCell><b>Total Expenses</b></HeaderCell>
// 						<CurrencyCell dataKey="total_expenses" rowData={undefined}/>
// 					</Column>
// 				</Table>	
// 			</div>
// 	</CardContent>
// 	<CardActions>
// 	  <Button size="small" onClick={() => { routerStore.goTo('reports'); }}>See Detailed Reports</Button>
// 	</CardActions>
//   </Card>
// );
// }