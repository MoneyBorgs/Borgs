import React from 'react';
import { observer } from "mobx-react-lite";
import { useStores } from '../hooks/useStores';
import { CssVarsProvider } from '@mui/joy/styles';
import { Typography } from '@mui/material';
import Button from '@mui/joy/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const Reports = observer(() => {

	let { reportsStore } = useStores();

	return (
		<div>
			<h1>Reports</h1>
			<CssVarsProvider>
				<Button onClick={() => { reportsStore.updateBalance() }}> please bruh </Button>
			</CssVarsProvider>
			<br></br>
			<Box
				component="form"
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete="off"
				>
				<TextField id="outlined-basic" label="Outlined" variant="outlined" />
			</Box>
			<br></br>
			<Typography>
				{reportsStore.currentBalance}
			</Typography>
		</div>
	)
});