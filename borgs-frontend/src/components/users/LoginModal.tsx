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

		// TODO get default user and make values consistent across usages
		const [ emailAddress, setEmailAddress ] = useState('');
		const [ passWord, setPassWord ] = useState('');


		/**
		 * Handles the value change on the inputs by setting the respective field variable
		 * on the userState with the recently chosen value
		 * @param field the field of the User type to be set
		 * @param value the value 
		 */

		const handleOnSubmitForm = (event) => {			
			userStore.updateEmail(emailAddress);
			userStore.updatePassWord(passWord);
			userStore.userWithPassWord();
			console.log(userStore.currentUserWithPassWord.map( user => [user.email, user.password, user.uid])[0][1]);
			console.log(passWord);
			if (userStore.currentUserWithPassWord.map( user => [user.email, user.password, user.uid])[0][1] == passWord) {
				userStore.updateUser(userStore.currentUserWithPassWord.map( user => [user.email, user.password, user.uid])[0][2]);
				userStore.updateLoginStatus(true);
				props.onClose();
			}
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
								<Button type="submit">Login!</Button>
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
