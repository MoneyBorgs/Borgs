import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { observer } from 'mobx-react-lite';

export interface DatePickerFieldProps extends Omit<DesktopDatePickerProps<Dayjs, Dayjs>, "value" | "renderInput"> {}

export const DatePickerField = observer((props: DatePickerFieldProps) => {
		const [value, setValue] = React.useState<Dayjs | null>(
			dayjs('2014-08-18T21:11:54'),
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