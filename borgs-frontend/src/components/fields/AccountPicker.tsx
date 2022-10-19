import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { observer } from 'mobx-react-lite';
import Account from '../../model/Account';
import { Box, Typography } from '@mui/material';

interface Props {
	availableAccounts: Account[],
	label: string
}

export const AccountPicker = observer((props : Props) => {
		const { availableAccounts, label } = props;

		console.log("Rerendering")

		return (
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={availableAccounts}
				sx={{ width: 300 }}
				getOptionLabel={(account) => account.name}
				renderOption={(props, category) => renderAccountOption(props, category)}
				renderInput={(params) => renderAccountInput(params, label)}
			/>
		);
	}
)

function renderAccountOption(props, account : Account): React.ReactElement {
	return (
		<Box {...props} key={account.name}>
			<Typography>{account.name}</Typography>
		</Box>
	);
}

function renderAccountInput(params, label) {
	return <TextField {...params} label={label} />
}