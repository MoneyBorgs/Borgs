import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { observer } from 'mobx-react-lite';
import Category from '../../model/Category';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface Props {
	availableCategories: Category[]
}

export const CategoryPicker = observer((props: Props) => {

	const { availableCategories } = props;

	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={availableCategories}
			sx={{ width: 300 }}
			getOptionLabel={(category) => category.displayname}
			renderOption={(props, category) => renderCategoryOption(props, category)}
			renderInput={(params) => renderCategoryInput(params)}
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

function renderCategoryInput(params) {
	return <TextField {...params} label={"Category"}/>
}
