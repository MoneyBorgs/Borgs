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
import { ChangeNameModal } from "./ChangeNameModal"
import { ResetPassModal } from "./ResetPassModal"

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

export interface SettingsModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
	onClose: () => void	
}

export const SettingsModal = observer((props : SettingsModalProps) => {
	
		const { userStore } = useStores();
		const router = useRouterStore();

        const [isModal1Open, setIsModen1Open] = React.useState(false);
		const [isModal2Open, setIsModen2Open] = React.useState(false);
		const [anchorEl, setAnchorEl] = React.useState(null);
		const open = Boolean(anchorEl);

		const handleClose = () => {
			setAnchorEl(null);
		};

        const handleNameChange = (event) => {
			handleClose();
			setIsModen1Open(true);
		}

		const handleResetPass = (event) => {
			handleClose();
			setIsModen2Open(true);
		}

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
							textAlign = 'center'
						>
							Settings for {userStore.firstname} {userStore.lastname}
						</Typography>
						<ChangeNameModal open={isModal1Open} onClose={() => {setIsModen1Open(false)}}/>
						<ResetPassModal open={isModal2Open} onClose={() => {setIsModen2Open(false)}}/>
					</Box>
				</Modal>
		);
	}
)

function userFromFormData(data: FormData) : User {
	let t = new User();

	throw new Error('Function not implemented.');
}