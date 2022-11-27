import * as React from 'react';
import Stack from '@mui/joy/Stack';
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
import Transaction from '../../model/Transaction';
import { useState } from 'react';
import { TagsPicker } from '../fields/TagsPicker';
import Tag from '../../model/Tag';
import {CategoryTypes} from "../../model/Category";

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
	onClose: () => void;
	transactionType? : CategoryTypes;
	preFilledTransaction? : Transaction;
	isEditingMode? : boolean;
}

export const ExpenseCreateOrEditModal = observer((props : ExpenseEditCreateModalProps) => {
	
		const { accountsStore, transactionsStore} = useStores();

		const preFilledTransaction = props.preFilledTransaction ? props.preFilledTransaction : new Transaction();

		// TODO get default transaction and make values consistent across usages
		const [ transactionState, setTransactionState ] = useState(JSON.parse(JSON.stringify(preFilledTransaction)));

		/**
		 * Handles the value change on the inputs by setting the respective field variable
		 * on the transactionState with the recently chosen value
		 * @param field the field of the Transaction type to be set
		 * @param value the value 
		 */
		const handleOnValueChange = (field, value) => {
			setTransactionState({...transactionState, [field] : value})
		}

		// TODO have base TransactionModal that can be extended with different behavior.
		const handleOnSubmitForm = (event) => {
			if(props.transactionType !== CategoryTypes.TRANSFER) {
				transactionsStore.createNewTransaction(transactionState);
			} else {
				transactionsStore.createNewTransferTransaction(transactionState);
			}
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
							{(props.isEditingMode ? "Edit " : "Create new ") + props.transactionType?.toLowerCase()}
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
									defaultValue={preFilledTransaction.description}
									onChange={(event) => { handleOnValueChange("description", event.target.value) }}
								/>
								<CurrencyField
									label="Value"
									defaultValue={preFilledTransaction.value}
									onChange={(newValue) => { handleOnValueChange("value", props.transactionType === CategoryTypes.EXPENSE ? -newValue : newValue) }}
								/>
								<DatePickerField
									label="Transaction date"
									defaultValue={preFilledTransaction.timestampepochseconds}
									onChange={(newDate) => { handleOnValueChange("timestampepochseconds", newDate?.unix())}}
								/>
								<CategoryPicker
									options={transactionsStore.availableCategories.filter((category) => {return category.category_type === props.transactionType})}
									defaultValue={preFilledTransaction.category}
									onChange={((event, category) => {handleOnValueChange("category", category)})}
									inputName={"category"}
								/>

								{props.transactionType !== CategoryTypes.TRANSFER ?
									renderAccountSelectorsForExpenseOrIncome(accountsStore.currentVirtualAccountsData,
										accountsStore.currentPhysicalAccountsData, handleOnValueChange, preFilledTransaction) :
									renderTransferAccountSelectors(accountsStore.currentVirtualAccountsData,
										accountsStore.currentPhysicalAccountsData, handleOnValueChange, preFilledTransaction)}

								<TagsPicker
									tags={tagObjectsToStrings(transactionsStore.availableTags)}
									defaultTags={preFilledTransaction.tags ? tagObjectsToStrings(preFilledTransaction.tags) : undefined}
									onChange={ (newTags) => { handleOnValueChange("tags", newTags) }}
								/>
								<Button type="submit">{props.isEditingMode ? "Edit" : "Create"}</Button>
							</Stack>
						</LocalizationProvider>
						</form>
					</Box>
				</Modal>
		);
	}
)
function tagObjectsToStrings(tags : (Tag | string)[]) {
	let ret : string[] = [];
	for(const tag of tags) {

		if(typeof tag === 'string') {
			ret.push(tag);
		} else {
			ret.push(tag.tag);
		}
	}
	return ret;
}

function renderAccountSelectorsForExpenseOrIncome(currentVirtualAccountsData,
												  currentPhysicalAccountsData,
												  handleOnValueChange,
												  preFilledTransaction) {
	return (
		<>
			<AccountPicker
				options={currentVirtualAccountsData}
				label={"Virtual Account"}
				defaultValue={currentVirtualAccountsData.find(account => account.account_id === preFilledTransaction.virtual_account)}
				onChange={((event, account) => { handleOnValueChange("virtual_account", account.account_id) })}
				inputName="virtual-account-picker"
			/>
			<AccountPicker
				options={currentPhysicalAccountsData}
				label={"Physical Account"}
				defaultValue={currentPhysicalAccountsData.find(account => account.account_id === preFilledTransaction.physical_account)}
				onChange={((event, account) => { handleOnValueChange("physical_account", account.account_id) })}
				inputName="physical-account-picker"
			/>
		</>
	);
}

function renderTransferAccountSelectors(currentVirtualAccountsData,
										  currentPhysicalAccountsData,
										  handleOnValueChange,
										  preFilledTransaction) {
	return (
		<>
			<AccountPicker
				options={currentVirtualAccountsData}
				label={"From Virtual Account"}
				defaultValue={currentVirtualAccountsData.find(account => account.account_id === preFilledTransaction.virtual_account)}
				onChange={((event, account) => { handleOnValueChange("virtual_account", account.account_id) })}
				inputName="virtual-account-picker"
			/>
			<AccountPicker
				options={currentPhysicalAccountsData}
				label={"From Physical Account"}
				defaultValue={currentPhysicalAccountsData.find(account => account.account_id === preFilledTransaction.physical_account)}
				onChange={((event, account) => { handleOnValueChange("physical_account", account.account_id) })}
				inputName="physical-account-picker"
			/>
			<AccountPicker
				options={currentVirtualAccountsData}
				label={"To Virtual Account"}
				defaultValue={currentVirtualAccountsData.find(account => account.account_id === preFilledTransaction.virtual_account)}
				onChange={((event, account) => { handleOnValueChange("to_virtual_account", account.account_id) })}
				inputName="virtual-account-picker"
			/>
			<AccountPicker
				options={currentPhysicalAccountsData}
				label={"To Physical Account"}
				defaultValue={currentPhysicalAccountsData.find(account => account.account_id === preFilledTransaction.physical_account)}
				onChange={((event, account) => { handleOnValueChange("to_physical_account", account.account_id) })}
				inputName="physical-account-picker"
			/>
		</>
	);
}