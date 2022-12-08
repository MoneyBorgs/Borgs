import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useStores } from '../../hooks/useStores';
import { ModalClose } from '@mui/joy';
import { observer } from 'mobx-react-lite';
import { Button, Modal, ModalUnstyledOwnProps, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import { useState } from 'react';
import User from '../../model/User';
import Alert from '@mui/material/Alert';


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

export interface RegisterCreateModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
	onClose: () => void	
}

export const RegisterCreateModal = observer((props : RegisterCreateModalProps) => {
	
		const { userStore } = useStores();

		// import the hash conversion package
		const bcrypt = require("bcryptjs");

		// define variables and methods to handle the user's attempted registration info
		const [ userState, setUserState ] = useState(new User());

		// define variables and methods to display the proper alert message
		const [ alert1, setAlert1 ] = useState(false);
		const [ alert2, setAlert2 ] = useState(false);
		const [ alertContent, setAlertContent ] = useState('')


		/**
		 * Handles the value change on the inputs by setting the respective field variable
		 * on the userState with the recently chosen value
		 * @param field the field of the User type to be set
		 * @param value the value 
		 */

		// as the user types in the text boxes, update the respective user info value
		const handleOnValueChange = (field, value) => {
			setUserState({...userState, [field] : value})
		}

		function setAlerts() {
			// checks if there is already an email in the database with this account
			// proceed with this code if no account with this email already exists
			if (userStore.currentUserWithEmail.map( user => [user.email, user.password, user.uid])[0] === undefined) {
				// display success message
				setAlert1(false);
				setAlert2(true);
				setAlertContent('You have successfully registered to MoneyBorgs! You may now close this window and login.')
				// hash the user's string literl password
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(userState.password, salt, function(err, hash) {
					// store hash in the database along with the rest of the new user info
					userState.password = hash;
					userStore.createNewUser(userState);
					});
					})
			}
			// proceed with this code if an account with this email already exists
			else {
				// display error message
				setAlert2(false);
				setAlert1(true);
				setAlertContent('An account already exists with this email. Please try again.')
			}
		}

		// when the form is submitted, call the backend to see if an account with this email already exists
		const handleOnSubmitForm = (event) => {	
			userStore.updateEmail(userState.email);
			userStore.userWithEmail();
			setTimeout(() => { setAlerts() }, 1000);
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
							Register an account
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
									label="Email Address" autoFocus
									onChange={(email) => { handleOnValueChange("email", email.target.value); }}
								/>
								{alert1 ? <Alert severity='error'>{alertContent}</Alert> : <></> }
								<TextField
									required
									label="Password" autoFocus
									type = "password"
									onChange={(password) => { handleOnValueChange("password", password.target.value) }}
								/>
								<TextField
									required
									label="First Name" autoFocus
									onChange={(firstname) => { handleOnValueChange("firstname", firstname.target.value) }}
								/>
								<TextField
									required
									label="Last Name" autoFocus
									onChange={(lastname) => { handleOnValueChange("lastname", lastname.target.value) }}
								/>		
								{alert2 ? <Alert severity='success'>{alertContent}</Alert> : <></> }																						
								<Button type="submit">Register!</Button>
							</Stack>
						</LocalizationProvider>
						</form>
					</Box>
				</Modal>
		);
	}
)
