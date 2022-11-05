import React, { useState, PureComponent } from 'react';
import { observer } from "mobx-react-lite";
import { useStores } from '../hooks/useStores';
import { CssVarsProvider } from '@mui/joy/styles';
import { Typography } from '@mui/material';
import Button from '@mui/joy/Button';
import MonthlyBalance from "../model/MonthlyBalance";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Reports = observer(() => {

	const { reportsStore, userStore } = useStores();

	return (
		<div>
			<h1>Reports for user {userStore.uid}</h1>
			<CssVarsProvider>
				<Button onClick={() => { reportsStore.getMonthlyData(2022) }}> Pull balance data </Button>
			</CssVarsProvider>

			<br></br>

			<LineChart width={600} height={300} data={reportsStore.monthlyBalance} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
				<Line type="monotone" dataKey="net_result" stroke="#8884d8" />
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis dataKey="month" />
				<YAxis dataKey="net_result"/>
				<Tooltip />
			</LineChart>
		</div>
	)
});