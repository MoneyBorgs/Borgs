import React from 'react'
import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { ButtonGroup } from '@mui/material';

export const Accounts = observer(() => {
	return (
		<div>
			<h1>Accounts</h1>
			<TextField id="outlined-basic" label="Outlined" variant="outlined" />
			<Button variant="outlined">Outlined</Button>
		</div>
		
	)
});