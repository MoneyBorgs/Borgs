import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { observer } from 'mobx-react-lite';
import Account from '../../model/Account';

interface Props {
	availableAccounts: Account[]
}

export const AccountPicker = observer((props : Props) => {

		const { availableAccounts } = props;

		return (
			<Autocomplete
				disablePortal
				id="combo-box-demo"
				options={availableAccounts}
				sx={{ width: 300 }}
				renderInput={(params) => <TextField {...params} label="Movie" />}
			/>
		);
	}
)

