import * as React from 'react';
import { InputAttributes, NumericFormat } from 'react-number-format';
import FormControl from '@mui/joy/TextField';
import { observer } from 'mobx-react-lite';
import { FormHelperText, FormLabel } from '@mui/joy';
import { Input, TextField } from '@mui/material';

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const NumberFormatCustom = React.forwardRef<
	typeof NumericFormat<InputAttributes>,
	CustomProps
>(function NumberFormatCustom(props, ref) {
	const { onChange, ...other } = props;

	return (
		<NumericFormat
			{...other}
			getInputRef={ref}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator
			valueIsNumericString
			prefix="$"
		/>
	);
});

interface State {
	numberformat: string;
}

interface Props {
	label : String
	onChange?: (newValue : number) => void
}

export const CurrencyField = observer((props : Props) => {
		const [values, setValues] = React.useState<State>({
			numberformat: '0',
		});

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			setValues({
				...values,
				[event.target.name]: event.target.value,
			});

			if(props.onChange) {
				props.onChange(Number(event.target.value));
			}
		};

		return (
				<TextField
					label={props.label}
					value={values.numberformat}
					onChange={handleChange}
					name="numberformat"
					id="formatted-numberformat-input"
					InputProps={{
						inputComponent: NumberFormatCustom as any,
					}}
				/>
		);
	}
)