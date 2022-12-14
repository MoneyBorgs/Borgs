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
import UserStore from '../../stores/UserStore';
import AccountsStore from '../../stores/AccountsStore';
import User from '../../model/User';
import Account from '../../model/Account';
import { AccountPicker } from '../fields/AccountPicker';

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

export interface AccountDeleteModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
	onClose: () => void	
}

export const AccountDeleteModal = observer((props : AccountDeleteModalProps) => {
	
		const { userStore, accountsStore } = useStores();
    	const rootStore = useStores();
		// TODO get default user and make values consistent across usages
		const [ accountState, setAccountState ] = useState<Account>(new Account());

		/**
		 * Handles the value change on the inputs by setting the respective field variable
		 * on the userState with the recently chosen value
		 * @param field the field of the User type to be set
		 * @param value the value 
		 */
		const handleOnValueChange = (account : Account) => {
			// sets account that is supposed to be deleted to the user selected account
			setAccountState(account)
		}

		const handleOnSubmitForm = (event) => {
			// handles when form is submitted to delete the correct account
			if (accountsStore.adding_account=="virtual"){
				accountsStore.deleteVirtualAccount(accountState);
			} 			
			else{
				accountsStore.deletePhysicalAccount(accountState);
			}
			props.onClose();
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
							Delete an account
						</Typography>
						<form
							onSubmit={(event) => {
								event.preventDefault();
								handleOnSubmitForm(event);
							}}
						>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Stack spacing={2}>
								{/* <TextField
									required
									label="Account Name" autoFocus
									onChange={(accountName) => {
										handleOnValueChange("name", accountName.target.value);
									}}
								/> */}
								<AccountPicker
									options={accountsStore.adding_account === "virtual" ? accountsStore.currentVirtualAccountsData : accountsStore.currentPhysicalAccountsData}
									label="Pick account to delete"
									inputName="account"
									onChange={(event, account) => handleOnValueChange(account)}
									/>														
								<Button type="submit">Delete!</Button>
							</Stack>
						</LocalizationProvider>
						</form>
					</Box>
				</Modal>
		);
	}
)

function userFromFormData(data: FormData) : User {
	let t = new User();

	throw new Error('Function not implemented.');
}
