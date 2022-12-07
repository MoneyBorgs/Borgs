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

export interface AccountEditModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
	onClose: () => void	
}

export const AccountEditModal = observer((props : AccountEditModalProps) => {

		const { userStore, accountsStore } = useStores();
    	const rootStore = useStores();
		// TODO get default user and make values consistent across usages
		const [ accountState, setAccountState ] = useState<Account>(new Account());
		const [newName, setNewName] = useState("");

		/**
		 * Handles the value change on the inputs by setting the respective field variable
		 * on the userState with the recently chosen value
		 * @param field the field of the User type to be set
		 * @param value the value 
		 */
		
		const handleOnValueChange = (account : Account) => {
			// Handling accounts selected
			setAccountState(account)
		}

		const handleOnValueNameChange = (field, value) => {
			// handling new name that is inputted
			setNewName(value);
		}

		const handleOnSubmitForm = (event) => {
			// handling form submission when submit button is pressed
			if (accountsStore.adding_account=="virtual"){
				accountsStore.editVirtualAccount({...accountState, name: newName});
			} 			
			else{
				accountsStore.editPhysicalAccount({...accountState, name: newName});
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
							Edit an account
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
									options={accountsStore.adding_account === "virtual" ? accountsStore.currentVirtualAccountsData : accountsStore.currentPhysicalAccountsData}
									label="Pick account to edit"
									inputName="account"
									onChange={(event, account) => handleOnValueChange(account)}
									/>		
								<TextField
									required
									label="New Account Name" autoFocus
									onChange={(accountName) => {
										handleOnValueNameChange("name", accountName.target.value);
									}}
								/>										
								<Button type="submit">Edit!</Button>
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
