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
import AlertTitle from '@mui/material/AlertTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

export interface ResetPassModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
	onClose: () => void	
}

export const ResetPassModal = observer((props : ResetPassModalProps) => {
	
		const { userStore } = useStores();

		// define variables and methods to handle the user's old and updated passwords
		const [ oldPass, setOldPass ] = useState('');
		const [ newPass, setNewPass ] = useState('');

		// define variables and methods to display the proper alert message
		const [ alert1, setAlert1 ] = useState(false);
		const [ alert2, setAlert2 ] = useState(false);
		const [ alertContent, setAlertContent ] = useState('');

		// import the hash encyrption package
		const bcrypt = require("bcryptjs");

		// define variable and method to handle if the modal is open
		const [open, setOpen] = React.useState(false);

		// open the modal
		const handleOpen = () => {
			setOpen(true);
		};

		// close the modal
		const handleClose = () => {
			setAlert1(false);
			setAlert2(false);
			setOpen(false);
		};		

		/**
		 * Handles the value change on the inputs by setting the respective field variable
		 * on the userState with the recently chosen value
		 * @param field the field of the User type to be set
		 * @param value the value 
		 */

		const handleOnSubmitForm = (event) => {		

			// compare to see if the user's "Old Password" matches their password in the database
			bcrypt.compare(oldPass, userStore.password, function(err, result) {
				// proceed with this code if the passwords match
				if (result) {
				  console.log("It matches!");
				  // convert the user's desired new password to hash
				  bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newPass, salt, function(err, hash) {
						// call the backend to update the user's password
						userStore.updatePassWord(hash);
						userStore.changePassWord();
					});
					})
					// display a sucess message
					setAlert2(false);
					setAlert1(true);
					setAlertContent('Password successfully changed. You may close the window.')				  
				}
				// proceed with this code if the passwords do not match
				else {
				  	console.log("Invalid password!");
					// display error message
					setAlert1(false);
					setAlert2(true);
					setAlertContent('Incorrect password. Please try again.');					
				}
			  });
			}

		return (
			<React.Fragment>
                <Box textAlign='center' sx={{ p: 1 }}>
				<Button 
				id="basic-demo-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				variant="outlined"
				color="warning"
                style={{ fontWeight: 'bold' }}
				onClick={handleOpen}>Reset Password</Button>
                </Box>

				<Modal
        			hideBackdrop
        			open={open}
        			onClose={handleClose}
        			aria-labelledby="child-modal-title"
        			aria-describedby="child-modal-description"
     			>
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
						onClick={handleClose}
					/>
						<Typography
							id="basic-modal-dialog-title"
							component="h2"
							level="inherit"
							fontSize="2em"
							mb="1em"
							lineHeight="2"
							textAlign = 'center'
						>
							Reset Password
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
									type='password'
									label="Old Password" autoFocus
									onChange={(event) => setOldPass(event.target.value)}
									value = {oldPass}
								/>
								{alert2 ? <Alert severity='error'>{alertContent}</Alert> : <></> }
								<TextField
									required
									type='password'
									label="New Password" autoFocus
									onChange={(event) => setNewPass(event.target.value)}
									value = {newPass}
								/>
								{alert1 ? <Alert severity='success'>{alertContent}</Alert> : <></> }																				
								<Button
								type="submit"
								id="basic-demo-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								variant="contained"
								color="warning"
								style={{ fontWeight: 'bold' }}>Reset Password</Button>
							</Stack>
						</LocalizationProvider>
						</form>
					</Box>
				</Modal>
				</React.Fragment>
		);
	}
)

function userFromFormData(data: FormData) : User {
	let t = new User();

	throw new Error('Function not implemented.');
}
