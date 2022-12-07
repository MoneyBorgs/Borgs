import React, { useState } from 'react'
import { useStores } from '../hooks/useStores';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { observer } from "mobx-react-lite";
import { RegisterCreateModal } from '../components/users/NewRegisteredUser';
import { NewRegistrationMenu } from '../components/users/NewRegistrationMenu';
import User from '../model/User';
import { Typography } from '@mui/material';
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import { spacing } from '@mui/system';

export const Register = observer(() => {

	let { userStore, dashboardStore } = useStores();
	const [firstName, setFirstName] = useState('');

	return (
		<div
			style={{
				padding: "1em 2.5em",
			}}>
			<div
      			style={{
        		display: 'flex',
        		alignItems: 'center',
        		justifyContent: 'center',
      			}}
    		>
			<Box sx={{ pt: 10 }}>
			<img style={{ width: 960, height: 320 }} src={require('../resources/moneyborgslogo.jpg')} alt='money borgs logo'/>
			</Box>
			</div>
			<h1 style={{textAlign: "center"}}>Welcome to MoneyBorgs!</h1>
			<h4 style={{textAlign: "center"}}>Login or Register an Account</h4>
			<NewRegistrationMenu/>
		</div>
	)
});
