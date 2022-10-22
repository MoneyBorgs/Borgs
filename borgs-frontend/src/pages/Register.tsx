import React from 'react'
import { useStores } from '../hooks/useStores';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { observer } from "mobx-react-lite";
import { RegisterCreateModal } from '../components/users/NewRegisteredUser';
import { NewRegistrationMenu } from '../components/users/NewRegistrationMenu';
import User from '../model/User';
import { Typography } from '@mui/material';

export const Register = observer(() => {

	let { userStore, dashboardStore } = useStores();

	return (
		<div
			style={{
				padding: "1em 2.5em",
			}}>
			<h1>Register</h1>
			<NewRegistrationMenu/>
		</div>
	)
});