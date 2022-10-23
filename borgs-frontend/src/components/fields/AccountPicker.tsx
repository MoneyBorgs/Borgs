import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { observer } from 'mobx-react-lite';
import Account from '../../model/Account';
import { Box, Typography } from '@mui/material';

interface Props extends Omit<AutocompleteProps<Account, false, true, false>, "renderOption" | "renderInput"> {
	label: string,
	inputName: string
}

export const AccountPicker = observer((props : Props) => {
		const { label, inputName } = props;
		return (
			<Autocomplete
				{...props}
				disablePortal
				id="combo-box-demo"
				sx={{ width: 300 }}
				getOptionLabel={(account) => account.name}
				renderOption={(props, category) => renderAccountOption(props, category)}
				renderInput={(params) => renderAccountInput(params, label, inputName)}
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

function renderAccountInput(params, label, inputName) {
	return <TextField {...params} label={label} name={inputName} />
}
