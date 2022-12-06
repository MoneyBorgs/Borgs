import React, { useState } from 'react'
import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Box, ButtonGroup, List, Typography } from '@mui/material';
import DashboardStore from '../stores/DashboardStore';
import Dashboard from '../model/Dashboard';
import { useStores } from '../hooks/useStores';
import { Table } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import accountCard, { categoryCard, incomesAndExpensesCard } from '../components/dashboard/accountCard';
import { useRouterStore } from 'mobx-state-router';

export const MainPage = observer(() => {
	const {dashboardStore, userStore} = useStores();
	const routerStore = useRouterStore();

	return (
		<div>
			<Typography variant='h5' paddingLeft='3%' paddingTop='3%'>
				Welcome {userStore.firstname} {userStore.lastname}!
			</Typography>
			<Typography variant='h2' align='center' padding='1%'>
				Home
			</Typography>

			<Typography variant='h4' align='center'>
				Total Balance = <strong>$ {dashboardStore.currentTotalBalance.toFixed(2)}</strong>
			</Typography>

			<div style={{ 
					display: 'flex', 
					flexDirection: 'row'}}>

				<div style={{ 
					width: '50%', 
					paddingLeft: '8%',
					paddingTop: '5%',
					paddingRight: '4%',
					paddingBottom: '8%'}}>
					
					<div style={{ 
						paddingLeft: '8%',
						paddingTop: '5%',
						paddingRight: '4%',
						paddingBottom: '8%'}}>
							{accountCard(dashboardStore, routerStore)}
						</div>
					
					{categoryCard(dashboardStore, routerStore)}

				

				</div>

				<div style={{ 
					width: '50%', 
					paddingLeft: '4%',
					paddingTop: '5%',
					paddingRight: '8%',
					paddingBottom: '8%'}}>

					{incomesAndExpensesCard(dashboardStore, routerStore)}

				</div>	

			</div>

		</div>
	)
});