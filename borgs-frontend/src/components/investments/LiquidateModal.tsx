import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import { useStores } from '../../hooks/useStores';
import { ModalClose } from '@mui/joy';
import { observer } from 'mobx-react-lite';
import { Button, Modal, ModalUnstyledOwnProps, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TransactionsStore from '../../stores/TransactionsStore';
import Investment from '../../model/Investment';
import Transaction from '../../model/Transaction';
import Category, {CategoryTypes} from "../../model/Category";
import { useRouterStore } from "mobx-state-router";
import Alert from '@mui/material/Alert';
import { DatePickerField } from '../fields/DatePickerField';
import {AccountPicker} from '../fields/AccountPicker';
import RootStore from '../../stores/RootStore';
import dayjs from "dayjs";

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

export interface LiquidateModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
	onClose: () => void	
}

export const LiquidateModal = observer((props : LiquidateModalProps) => {

	const { accountsStore, userStore, investmentsStore, transactionsStore } = useStores();
	const router = useRouterStore();

	const [ investmentState, setInvestmentState ] = useState(new Investment());
	const [ transactionState, setTransactionState ] = useState(new Transaction());

	const [ va, setVA ] = useState('');
	const [ pa, setPA ] = useState('');
	// setPA(accountsStore.currentPhysicalAccountsData[0].account_id.toString());
	// setVA(accountsStore.currentVirtualAccountsData[0].account_id.toString());

	const [ alert1, setAlert1 ] = useState(false);
	const [ alert2, setAlert2 ] = useState(false);
	const [ alertContent, setAlertContent ] = useState('');

	/**
	 * Handles the value change on the inputs by setting the respective field variable
	 * on the userState with the recently chosen value
	 * @param field the field of the User type to be set
	 * @param value the value 
	 */

	 const handleOnValueChange = (field, value) => {
		setInvestmentState({...investmentState, [field] : value})
	}


	const handleOnSubmitForm = (event) => {		
		// We will generate a transaction with the values of the stock * quantity invested
		// Transaction will be considered an expense to the virtual and physical accounts
		// When we liquidate the stocks we will consider the transaction an income
		
		// get yahoo finance info

		let stockExists = true;

		const stockdata = require('node-stock-data');
		console.log('printing pa va')
		console.log(pa)
		console.log(va)
		if (typeof va === 'string') {
			transactionState.virtual_account = +accountsStore.currentVirtualAccountsData[0].account_id.toString()
			console.log('this is happening')
		} else {
			transactionState.virtual_account = +va
		}

		if (typeof pa === 'string') {
			transactionState.physical_account = +accountsStore.currentPhysicalAccountsData[0].account_id.toString();
			console.log('this is happening')
		} else {
			transactionState.physical_account = +pa;
		}
		
		transactionState.value = investmentsStore.toBeLiquidated.value;
		transactionState.timestampepochseconds = dayjs().unix();
		transactionState.category = transactionsStore.availableCategories.filter((category) => {
			return category.displayname === "Liquidations"
		})[0];

		console.log(transactionState.virtual_account);
		console.log(transactionState.physical_account);
		// TODO fix investmentState.ticker get actual ticket name
		transactionsStore.createNewTransaction({...transactionState, description: `${investmentState.ticker} sell`});
		investmentsStore.liquidateInvestment(investmentsStore.toBeLiquidated.investment_id);

		setAlert1(false);
		setAlert2(true);
		setAlertContent('Liquidation succesfully made')

		/*
		if (stockExists) {
			
			setAlert1(false);
			setAlert2(true);
			setAlertContent('Investment succesfully made')
		}
		else {
			setAlert2(false);
			setAlert1(true);
			setAlertContent('Stock Ticker does not exist or did not exist at date given');
		}
		*/
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
					Which accounts do you wish to liquidate into?
				</Typography>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						handleOnSubmitForm(event);
					}}
				>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Stack spacing={2}>
						<AccountPicker
							options={accountsStore.currentVirtualAccountsData}
							label={"Virtual Account"}
							defaultValue={accountsStore.currentVirtualAccountsData[0]}
							onChange={((event, account) => { setVA(account.account_id.toString())})}
							inputName="virtual-account-picker"
						/>
						<AccountPicker
							options={accountsStore.currentPhysicalAccountsData}
							label={"Physical Account"}
							defaultValue={accountsStore.currentPhysicalAccountsData[0]}
							onChange={((event, account) => { setPA(account.account_id.toString())})}
							inputName="physical-account-picker"
						/>
						{alert1 ? <Alert severity='error'>{alertContent}</Alert> : <></> }	
						{alert2 ? <Alert severity='success'>{alertContent}</Alert> : <></> }																			
						<Button type="submit">Liquidate</Button>
					</Stack>
				</LocalizationProvider>
				</form>
			</Box>
		</Modal>
	);
})