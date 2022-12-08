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

export interface ChangeNameModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
	onClose: () => void	
}

export const ChangeNameModal = observer((props : ChangeNameModalProps) => {
	
		const { userStore } = useStores();
		const router = useRouterStore();

		// define variables and methods used to change name
		const [ firstName, setFirstName ] = useState('');
		const [ lastName, setLastName ] = useState('');

		// define variables and methods used to display proper alert
		const [ alert, setAlert ] = useState(false);
		const [ alertContent, setAlertContent ] = useState('');

		// define variable and method to display modal
		const [open, setOpen] = React.useState(false);
		const handleOpen = () => {
			setOpen(true);
		};

		// handle closing the modal
		const handleClose = () => {
			setAlert(false);
			setOpen(false);
		};		

		/**
		 * Handles the value change on the inputs by setting the respective field variable
		 * on the userState with the recently chosen value
		 * @param field the field of the User type to be set
		 * @param value the value 
		 */

		// when form is submitted, update userStore first and last name
		// then, call backend to change display name and display a success message
		const handleOnSubmitForm = (event) => {	
			userStore.updateFirstName(firstName);
			userStore.updateLastName(lastName);
			userStore.changeDisplayName();
			setAlert(true);
            setAlertContent('Display name successfully changed. You may now close the window.')
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
				color="primary"
				style={{ fontWeight: 'bold' }}
				onClick={handleOpen}>Change Display Name</Button>
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
							Change Display Name
						</Typography>
                        <Typography
							id="basic-modal-dialog-title"
							component="h2"
							level="inherit"
							fontSize="1em"
							mb="1em"
							lineHeight="0.5"
							textAlign = 'center'
						>
							Your Current Display Name Is:
						</Typography>
						<Box sx={{ pb: 2 }}>
						<Typography // display the user's current name; will auto update when they change it
							id="basic-modal-dialog-title"
							component="h2"
							level="inherit"
							fontSize="1em"
							mb="1em"
							lineHeight="0.5"
							textAlign = 'center'
						>
							{userStore.firstname} {userStore.lastname}
						</Typography>
						</Box>
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
									label="New First Name" autoFocus
									// handle the user's new desired first name
									onChange={(event) => setFirstName(event.target.value)}
									value = {firstName}
								/>
								<TextField
									required
									label="New Last Name" autoFocus
									// handle the user's new desired last name 
									onChange={(event) => setLastName(event.target.value)}
									value = {lastName}
								/>
								{alert ? <Alert severity='success'>{alertContent}</Alert> : <></>  } 																			
								<Button // submit button
								type="submit"
								id="basic-demo-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								variant="contained"
								color="primary"
								style={{ fontWeight: 'bold' }}>Change Display Name</Button>
							</Stack>
						</LocalizationProvider>
						</form>
					</Box>
				</Modal>
				</React.Fragment>
		);
	}
)
