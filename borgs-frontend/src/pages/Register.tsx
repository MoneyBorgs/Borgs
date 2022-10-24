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

export const Register = observer(() => {

	let { userStore, dashboardStore } = useStores();
	const [firstName, setFirstName] = useState('');

	const handleOnSubmitForm = (event) => {
		console.log(firstName)
        userStore.updateFirstName(firstName);
        userStore.usersWithName();
    }

	return (
		<div
			style={{
				padding: "1em 2.5em",
			}}>
			<h1>Register</h1>
			<NewRegistrationMenu/>
			
			<TextField id="outlined-basic" 
            label="Outlined" variant="outlined" 
            onChange={(event) => setFirstName(event.target.value)}
            value = {firstName}/>
			<Button variant="solid" onClick={handleOnSubmitForm}>Find Users With Name</Button>

			<div>
            {
            userStore.currentUsersWithName.map( user => {return <li> {[user.firstname, ' ', user.lastname, ' ', user.email]} </li>}
            )}
            </div>
		</div>
	)
});