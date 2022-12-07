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
import { vaTableCard, paTableCard, vaTableAccordion, paTableAccordion} from '../components/reports/tableCard';
import { vaChartCard, paChartCard, vaChartAccordion, paChartAccordion} from '../components/reports/chartCard';

export const Reports = observer(() => {

	const { reportsStore, userStore, accountsStore } = useStores();

	const year = reportsStore.year;

	return (
		<div
			style={{
				padding: "1em 2.5em",
			}}>
			<h1>Reports</h1>


			<div style={{ 
				width: '100%', 
				display: 'flex', 
				justifyContent: 'space-between', 
				alignItems: 'center',
				paddingLeft: '10%',
				paddingTop: '1%'}}>
			
			{vaChartAccordion(reportsStore, accountsStore)}

			</div>

			<div style={{ 
				width: '100%', 
				display: 'flex', 
				justifyContent: 'space-between', 
				alignItems: 'center',
				paddingLeft: '10%',
				paddingTop: '2.5%'}}>
			
			{paChartAccordion(reportsStore, accountsStore)}
			
			</div>

			<div style={{ 
				width: '100%', 
				display: 'flex', 
				justifyContent: 'space-between', 
				alignItems: 'center',
				paddingLeft: '10%',
				paddingTop: '2.5%'}}>
			
			{vaTableAccordion(reportsStore)}
			
			</div>

			<div style={{ 
				width: '100%', 
				display: 'flex', 
				justifyContent: 'space-between', 
				alignItems: 'center',
				paddingLeft: '10%',
				paddingTop: '2.5%'}}>

			{paTableAccordion(reportsStore)}
			
			</div>

			<br></br>
			<br></br>
			<br></br>
			
				to-do: change the graphs to have months instead of numbers and have better names when you hover over, reports with tags, reports with categories, maybe some math: mean, SD, median, percentiles, etc
		</div>

		
	)
});
