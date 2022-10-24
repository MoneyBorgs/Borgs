import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import { useStores } from '../../hooks/useStores';
import { ModalClose } from '@mui/joy';
import { observer } from 'mobx-react-lite';
import { CurrencyField } from '../fields/CurrencyField';
import { Button, Modal, ModalUnstyledOwnProps, TextField } from '@mui/material';
import { DatePickerField } from '../fields/DatePickerField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import { CategoryPicker } from '../fields/CategoryPicker';
import { AccountPicker } from '../fields/AccountPicker';
import TransactionsStore from '../../stores/TransactionsStore';
import Transaction from '../../model/Transaction';
import { useState } from 'react';
import { TagsPicker } from '../fields/TagsPicker';
import Tag from '../../model/Tag';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

export interface ExpenseEditCreateModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
	onClose: () => void	
}

export const ExpenseEditCreateModal = observer((props : ExpenseEditCreateModalProps) => {
	
		const { accountsStore, transactionsStore} = useStores();

		// TODO get default transaction and make values consistent across usages
		const [ transactionState, setTransactionState ] = useState(new Transaction());

		/**
		 * Handles the value change on the inputs by setting the respective field variable
		 * on the transactionState with the recently chosen value
		 * @param field the field of the Transaction type to be set
		 * @param value the value 
		 */
		const handleOnValueChange = (field, value) => {
			setTransactionState({...transactionState, [field] : value})
		}

		const handleOnSubmitForm = (event) => {			
			transactionsStore.createNewTransaction(transactionState);
			props.onClose();
			// transactionsStore.setIsExpenseModalOpen(false);
		}

		return (
				<Modal {...props}>
					<Box
						aria-labelledby="basic-modal-dialog-title"
						aria-describedby="basic-modal-dialog-description"
						sx={style}
					>
					<ModalClose
						variant="outlined"
						sx={{
							top: 'calc(-1/4 * var(--IconButton-size))',
							right: 'calc(-1/4 * var(--IconButton-size))',
							boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
							borderRadius: '50%',
							bgcolor: 'background.body',
						}}
						onClick={() => {props.onClose()}}
					/>
						<Typography
							id="basic-modal-dialog-title"
							component="h2"
							level="inherit"
							fontSize="1.25em"
							mb="1em"
						>
							Create new expense
						</Typography>
						<form
							onSubmit={(event) => {
								event.preventDefault();
								handleOnSubmitForm(event);
							}}
						>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Stack spacing={2}>
								<TextField
									required
									label="Description" autoFocus
									onChange={(event) => { handleOnValueChange("description", event.target.value) }}
								/>
								<CurrencyField
									label="Value"
									onChange={(newValue) => { handleOnValueChange("value", newValue) }}
								/>
								<DatePickerField
									label="Transaction date"
									onChange={(newDate) => { handleOnValueChange("timestampEpochSeconds", newDate?.unix())}}
								/>
								<CategoryPicker
									options={transactionsStore.availableCategories}
									onChange={((event, category) => {handleOnValueChange("category", category)})}
									inputName={"category"}
								/>
								<AccountPicker
									options={accountsStore.currentVirtualAccountsData}
									label={"Virtual Account"}
									onChange={((event, account) => { handleOnValueChange("virtual_account", account.account_id) })}
									inputName="virtual-account-picker"
								/>
								<AccountPicker
									options={accountsStore.availablePhysicalAccounts}
									label={"Physical Account"}
									onChange={((event, account) => { handleOnValueChange("physical_account", account.account_id) })}
									inputName="physical-account-picker"
								/>
								<TagsPicker
									tags={transactionsStore.availableTags}
									onChange={ (newTags) => { handleOnValueChange("tags", newTags) }}
								/>
								<Button type="submit">Create</Button>
							</Stack>
						</LocalizationProvider>
						</form>
					</Box>
				</Modal>
		);
	}
)

function transactionFromFormData(data: FormData) : Transaction {
	let t = new Transaction();

	throw new Error('Function not implemented.');
}

const exampleTags = ["tag1", "tag2", "tag3"]
