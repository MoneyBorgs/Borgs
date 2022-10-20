import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { observer } from 'mobx-react-lite';
import Category from '../../model/Category';
import Box from '@mui/material/Box';
import { Typography, AutocompleteProps } from '@mui/material';

export interface CategoryPickerProps
	extends Omit<AutocompleteProps<Category, false, true, false>, "renderOption" | "renderInput"> {
	inputName: string
}

export const CategoryPicker = observer((props: CategoryPickerProps) => {

	const { inputName } = props;

	return (
		<Autocomplete
			{...props}
			disablePortal
			id="ca"
			sx={{ width: 300 }}
			getOptionLabel={(category) => category.displayname}
			renderOption={(props, category) => renderCategoryOption(props, category)}
			renderInput={(params) => renderCategoryInput(params, inputName)}
		/>
	);
}
)

function renderCategoryOption(props, category) : React.ReactElement {
	return (
		<Box {...props} key={category.displayname}>
			<Typography>{category.displayname}</Typography>
		</Box>
	);
}

function renderCategoryInput(params, inputName) {
	return <TextField {...params} label={"Category"} name={inputName}/>
}
