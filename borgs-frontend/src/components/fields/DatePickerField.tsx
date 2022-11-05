import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';
import { observer } from 'mobx-react-lite';

export interface DatePickerFieldProps extends Omit<DesktopDatePickerProps<Dayjs, Dayjs>, "value" | "renderInput"> {
	/**
	 * The default date to pick in UNIX time
	 */
	defaultValue?: number;
}

export const DatePickerField = observer((props: DatePickerFieldProps) => {
		const [value, setValue] = React.useState<Dayjs | null>(
			props.defaultValue ? dayjs.unix(props.defaultValue) : dayjs()
		);

		const handleChange = (newValue: Dayjs | null) => {
			setValue(newValue);
			props.onChange(newValue);
		};

		return (
					<DesktopDatePicker
						{...props}
						inputFormat="MM/DD/YYYY"
						value={value}
						onChange={handleChange}
						renderInput={(params) => <TextField {...params} />}
					/>
			
		);
	}
)
