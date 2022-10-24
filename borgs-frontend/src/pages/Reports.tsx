import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import { useStores } from '../hooks/useStores';
import { CssVarsProvider } from '@mui/joy/styles';
import { Typography } from '@mui/material';
import Button from '@mui/joy/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const Reports = observer(() => {

	const { reportsStore, userStore } = useStores();

	return (
		<div>
			<h1>Reports for user {userStore.uid}</h1>
			<CssVarsProvider>
				<Button onClick={() => { reportsStore.updateBalance() }}> Pull data </Button>
			</CssVarsProvider>
			<br></br>
			<Typography>
				Total balance = ${reportsStore.currentBalance}
			</Typography>
		</div>
	)
});