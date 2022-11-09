import React, { useState, PureComponent } from 'react';
import { observer } from "mobx-react-lite";
import { useStores } from '../hooks/useStores';
import { CssVarsProvider } from '@mui/joy/styles';
import { Typography } from '@mui/material';
import Button from '@mui/joy/Button';
import MonthlyBalance from "../model/MonthlyBalance";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Reports = observer(() => {

	const { reportsStore, userStore } = useStores();

	return (
		<div>
			<h1>Reports for user {userStore.uid}</h1>
			<CssVarsProvider>
				<Button onClick={() => { reportsStore.getMonthlyData(2022) }}> Pull balance data </Button>
			</CssVarsProvider>

			<br></br>

			<BarChart width={600} height={300} data={reportsStore.monthlyBalance} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis dataKey="month" />
				<YAxis/>
				<Bar dataKey="net_result" fill="#8884d8" />
			</BarChart>
		</div>
	)
});
