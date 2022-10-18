import React from 'react'
import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

export const Accounts = observer(() => {
	return (
		<div>
			<h1>Accounts</h1>
			<FormControl>
  				<InputLabel htmlFor="my-input">Email address</InputLabel>
  				<Input id="my-input" aria-describedby="my-helper-text" />
			</FormControl>
		</div>
		
	)
});