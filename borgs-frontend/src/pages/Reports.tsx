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
import { vaTableCard, paTableCard } from '../components/reports/tableCard';
import { vaChartCard, paChartCard } from '../components/reports/chartCard';

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

export const CurrencyCell = ({rowData, dataKey, ...props }) => (
	<Cell {...props}>
		<Typography color={conditionalColor(rowData[dataKey])}>
		{formatCurrencyText(rowData[dataKey])}
		</Typography>
		
	</Cell>
	);

export const PercentCell = ({rowData, dataKey, ...props }) => (
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
			<div style={{ 
				width: '75%', 
				display: 'flex', 
				justifyContent: 'space-between', 
				alignItems: 'center',
				paddingLeft: '15%',
				paddingTop: '5%'}}>
			
			{vaChartCard(reportsStore, accountsStore)}
			
			</div>

			<div style={{ 
				width: '75%', 
				display: 'flex', 
				justifyContent: 'space-between', 
				alignItems: 'center',
				paddingLeft: '15%',
				paddingTop: '5%'}}>
			
			{paChartCard(reportsStore, accountsStore)}
			
			</div>

			<div style={{ 
				width: '75%', 
				display: 'flex', 
				justifyContent: 'space-between', 
				alignItems: 'center',
				paddingLeft: '15%',
				paddingTop: '5%'}}>
			
			{vaTableCard(reportsStore)}
			
			</div>

			<div style={{ 
				width: '75%', 
				display: 'flex', 
				justifyContent: 'space-between', 
				alignItems: 'center',
				paddingLeft: '15%',
				paddingTop: '5%'}}>

			{paTableCard(reportsStore)}
			
			</div>

		</div>

		
	)
});
