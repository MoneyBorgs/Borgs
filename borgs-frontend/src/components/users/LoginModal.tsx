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
import User from '../../model/User';
import {useRouterStore} from "mobx-state-router";
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

export interface LoginCreateModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
	onClose: () => void	
}

export const LoginCreateModal = observer((props : LoginCreateModalProps) => {
	
		const { userStore } = useStores();
		const router = useRouterStore();

		// import hash encryption package
		const bcrypt = require("bcryptjs");

		// define variables and methods to handle the user's attempted login information
		const [ emailAddress, setEmailAddress ] = useState('');
		const [ passWord, setPassWord ] = useState('');

		// define variables and methods to display the proper alert content (error or success)
		const [ alert1, setAlert1 ] = useState(false);
		const [ alert2, setAlert2 ] = useState(false);
		const [ alertContent, setAlertContent ] = useState('');

		// compare the string literal password to a hash sequence 
		function compareHash() {
			// userStore.currentUserWithEmail.map( user => [user.email, user.password, user.uid, user.firstname, user.lastname])[0] is the info of the user in the database with the attempted login email  
			bcrypt.compare(userStore.password, userStore.currentUserWithEmail.map( user => [user.email, user.password, user.uid])[0][1], function(err, result) {
				// proceed if password matches
				if (result) {
				  console.log("It matches!");
				  console.log('Printing' + userStore.currentUserWithEmail.map( user => [user.email, user.password, user.uid])[0][1]);
				  console.log('Printing' + passWord);
				  // update userStore info with the logged in account's information
				  userStore.updateUser(userStore.currentUserWithEmail.map( user => [user.email, user.password, user.uid])[0][2]);
				  userStore.updateFirstName(userStore.currentUserWithEmail.map( user => [user.email, user.password, user.uid, user.firstname, user.lastname])[0][3]);
				  userStore.updateLastName(userStore.currentUserWithEmail.map( user => [user.email, user.password, user.uid, user.firstname, user.lastname])[0][4]);
				  userStore.updatePassWord(userStore.currentUserWithEmail.map( user => [user.email, user.password, user.uid, user.firstname, user.lastname])[0][1]);
				  userStore.updateLoginStatus(true);

				  // display success message
				  setAlert1(false);
				  setAlert2(true);
				  setAlertContent('Successfully logged in. You will now be directed to your dashboard...')
  
				  // wait some time for user to read success message, then direct to dashboard
				  setTimeout(() => {  router.goTo("mainpage"); }, 3000);
				  setTimeout(() => {  props.onClose(); }, 3000);
				}
				// proceed with this code if password does not match
				else {
				  	console.log("Invalid password!");
					// display error message
				  	setAlert2(false);
					setAlert1(true);
					setAlertContent('Invalid password');
				}
			  });
		}

		function loginActions() {
			// proceed with this code if the user typed in an email in the database
			if (userStore.currentUserWithEmail.map( user => [user.email, user.password, user.uid])[0] !== undefined) {
				compareHash();
			}
			// proceed with this code if the user typed in an email that is not in the database
			else {
				// display error message
				setAlert2(false);
				setAlert1(true);
				setAlertContent('There is no MoneyBorgs account associated with this email address');
			}
		}


		/**
		 * Handles the value change on the inputs by setting the respective field variable
		 * on the userState with the recently chosen value
		 * @param field the field of the User type to be set
		 * @param value the value 
		 */

		// when the form is submitted, update the userStore info with the attempted login credentials
		// then, proceed with email and password validation
		const handleOnSubmitForm = (event) => {			
			userStore.updateEmail(emailAddress);
			userStore.updatePassWord(passWord);
			userStore.userWithEmail();
			setTimeout(() => { loginActions() }, 1000);
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
							Login to your account
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
									onChange={(event) => setEmailAddress(event.target.value)}
									value = {emailAddress}
								/>
								<TextField
									required
									type='password'
									label="Password" autoFocus
									onChange={(event) => setPassWord(event.target.value)}
									value = {passWord}
								/>
								{alert1 ? <Alert severity='error'>{alertContent}</Alert> : <></> }	
								{alert2 ? <Alert severity='success'>{alertContent}</Alert> : <></> }																			
								<Button type="submit">Login!</Button>
							</Stack>
						</LocalizationProvider>
						</form>
					</Box>
				</Modal>
		);
	}
)