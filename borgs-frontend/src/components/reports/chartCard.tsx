import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts';
import {formatCurrencyText} from "../../utils/TextUtils";
import {IconButton, Stack, Table} from 'rsuite';
import { AccountPicker } from '../fields/AccountPicker';
import 'rsuite/dist/rsuite.min.css';
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine';
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine';
import { RouterStore } from 'mobx-state-router';
import { useRouterStore } from 'mobx-state-router';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

var cardStyle = {
	display: 'block'
}

export function vaChartCard(reportsStore, accountsStore) {
  	return (
    <Card style = {cardStyle}>
      <CardContent>
        <CardHeader title = "Virtual Account Balances"/>
		<div style={{
		display: 'block', width: 1100
		}}>
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
					onClick={() => {reportsStore.updateYear(reportsStore.year - 1)}}
					icon={<ArrowLeftLineIcon/>}
				/>
				<h5>{reportsStore.year}</h5>
				<IconButton
					appearance="subtle"
					onClick={() => {reportsStore.updateYear(reportsStore.year + 1)}}
					icon={<ArrowRightLineIcon/>}
				/>
			</Stack>

			<ComposedChart width={1100} height={250} data={reportsStore.monthlyVaBalance} margin={{ top: 5, right: 20, bottom: 5, left: 100 }}>
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis dataKey="month" />
				<YAxis
					tickFormatter={(value) => {return formatCurrencyText(value)}}
				/>
				<Bar dataKey="total_expenses" fill="#F26CA7" />
          		<Bar dataKey="total_incomes" fill="#21FA90" />
				<Line type="monotone" dataKey="net_result" stroke="#8884d8"/>
				<Tooltip />
			</ComposedChart>

			<br></br> 
			The change in balance of account: <strong>{accountsStore.currentVirtualAccountsData[0]['name']}</strong>  throughout {reportsStore.year} is: {formatCurrencyText(reportsStore.totalAccountBalance)}
			<br></br>
		</div>

      </CardContent>
    </Card>
  );
}

export function paChartCard(reportsStore, accountsStore) {
    return (
  <Card style = {cardStyle}>
    <CardContent>
      <CardHeader title = "Physical Account Balances"/>
        <div style={{
        display: 'block', width: 1100
        }}>
            <AccountPicker
                defaultValue = {accountsStore.currentPhysicalAccountsData[0]}
                options={accountsStore.currentPhysicalAccountsData}
                label={"Physical Account"}
                inputName="physical-account-picker"
                onChange={((event, account) => {reportsStore.updateVirtualAccount(account.account_id)})} 
            />


            <Stack style={{marginTop: "1em", marginBottom: "1em"}}>
                <IconButton
                    appearance="subtle"
                    onClick={() => {reportsStore.updateYear(reportsStore.year - 1)}}
                    icon={<ArrowLeftLineIcon/>}
                />
                <h5>{reportsStore.year}</h5>
                <IconButton
                    appearance="subtle"
                    onClick={() => {reportsStore.updateYear(reportsStore.year + 1)}}
                    icon={<ArrowRightLineIcon/>}
                />
            </Stack>

            <ComposedChart width={1100} height={250} data={reportsStore.monthlyVaBalance} margin={{ top: 5, right: 20, bottom: 5, left: 100 }}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis
                    tickFormatter={(value) => {return formatCurrencyText(value)}}
                />
                <Bar dataKey="total_expenses" fill="#F26CA7" />
                    <Bar dataKey="total_incomes" fill="#21FA90" />
                <Line type="monotone" dataKey="net_result" stroke="#8884d8"/>
                <Tooltip />
            </ComposedChart>

            <br></br> 
            The change in balance of account: <strong>{accountsStore.currentPhysicalAccountsData[0]['name']}</strong>  throughout {reportsStore.year} is: {formatCurrencyText(reportsStore.totalAccountBalance)}
            <br></br>
        </div>

    </CardContent>
  </Card>
);
}

export function vaChartAccordion(reportsStore, accountsStore) {
    return (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>Virtual Accounts Chart</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div style={{
            display: 'block', width: 1100
            }}>
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
                        onClick={() => {reportsStore.updateYear(reportsStore.year - 1)}}
                        icon={<ArrowLeftLineIcon/>}
                    />
                    <h5>{reportsStore.year}</h5>
                    <IconButton
                        appearance="subtle"
                        onClick={() => {reportsStore.updateYear(reportsStore.year + 1)}}
                        icon={<ArrowRightLineIcon/>}
                    />
                </Stack>

                <ComposedChart width={1100} height={250} data={reportsStore.monthlyVaBalance} margin={{ top: 5, right: 20, bottom: 5, left: 100 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="month" />
                    <YAxis
                        tickFormatter={(value) => {return formatCurrencyText(value)}}
                    />
                    <Bar dataKey="total_expenses" fill="#F26CA7" />
                    <Bar dataKey="total_incomes" fill="#21FA90" />
                    <Line type="monotone" dataKey="net_result" stroke="#8884d8"/>
                    <Tooltip />
                </ComposedChart>

                <br></br> 
                The change in balance of account: <strong>{accountsStore.currentVirtualAccountsData[0]['name']}</strong>  throughout {reportsStore.year} is: {formatCurrencyText(reportsStore.totalAccountBalance)}
                <br></br>
            </div>
        </AccordionDetails>
  </Accordion>
);
}

export function paChartAccordion(reportsStore, accountsStore) {
    return (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>Physical Accounts Chart</Typography>
        </AccordionSummary>

        <AccordionDetails>
            <div style={{
            display: 'block', width: 1100
            }}>
                <AccountPicker
                    defaultValue = {accountsStore.currentPhysicalAccountsData[0]}
                    options={accountsStore.currentPhysicalAccountsData}
                    label={"Physical Account"}
                    inputName="physical-account-picker"
                    onChange={((event, account) => {reportsStore.updateVirtualAccount(account.account_id)})} 
                />


                <Stack style={{marginTop: "1em", marginBottom: "1em"}}>
                    <IconButton
                        appearance="subtle"
                        onClick={() => {reportsStore.updateYear(reportsStore.year - 1)}}
                        icon={<ArrowLeftLineIcon/>}
                    />
                    <h5>{reportsStore.year}</h5>
                    <IconButton
                        appearance="subtle"
                        onClick={() => {reportsStore.updateYear(reportsStore.year + 1)}}
                        icon={<ArrowRightLineIcon/>}
                    />
                </Stack>

                <ComposedChart width={1100} height={250} data={reportsStore.monthlyVaBalance} margin={{ top: 5, right: 20, bottom: 5, left: 100 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="month" />
                    <YAxis
                        tickFormatter={(value) => {return formatCurrencyText(value)}}
                    />
                    <Bar dataKey="total_expenses" fill="#F26CA7" />
                        <Bar dataKey="total_incomes" fill="#21FA90" />
                    <Line type="monotone" dataKey="net_result" stroke="#8884d8"/>
                    <Tooltip />
                </ComposedChart>

                <br></br> 
                The change in balance of account: <strong>{accountsStore.currentPhysicalAccountsData[0]['name']}</strong>  throughout {reportsStore.year} is: {formatCurrencyText(reportsStore.totalAccountBalance)}
                <br></br>
            </div>
        </AccordionDetails>
    </Accordion>
);
}