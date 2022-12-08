import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { RegisterCreateModal } from './NewRegisteredUser';
import { LoginCreateModal } from './LoginModal';
import User from '../../model/User';
import Box from '@mui/material/Box';
import { spacing } from '@mui/system';
import {useRouterStore} from "mobx-state-router";

export const NewRegistrationMenu = observer(() => {
		const { userStore } = useStores();
		const router = useRouterStore();

		// define values and methods to handle when the modals are open or closed
		const [anchorEl, setAnchorEl] = React.useState(null);
		const [isModal1Open, setIsModen1Open] = React.useState(false);
		const [isModal2Open, setIsModen2Open] = React.useState(false);
		const open = Boolean(anchorEl);

		// close the menu
		const handleClose = () => {
			setAnchorEl(null);
		};

		// open the registration modal
		const handleNewUser = (event) => {
			handleClose();
			setIsModen1Open(true);
		}

		// open the login modal
		const handleNewLogin = (event) => {
			handleClose();
			setIsModen2Open(true);
		}

		// bypass login and go straight to dashboard of account with uid = 1
		const bypassLogin = () => {
			handleClose();
			userStore.updateLoginStatus(true);

			router.goTo("mainpage");

		}

		return (
			<div>
				<Box textAlign='center' sx={{ p: 1 }}>
				<Button
					id="basic-demo-button"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					variant="outlined"
					color="neutral"
					onClick={handleNewLogin}
				>
					Already have an account? Login here!
				</Button> </Box>

				<Box textAlign='center' sx={{ marginBottom: 1 }}>
				<Button
					id="basic-demo-button"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					variant="outlined"
					color="neutral"
					onClick={handleNewUser}
				>
					Register for MoneyBorgs! 
				</Button> </Box>

				<Box textAlign='center'>
					<Button
						id="basic-demo-button"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						variant="outlined"
						color="neutral"
						onClick={bypassLogin}
					>
						Bypass login
					</Button> </Box>
				<RegisterCreateModal open={isModal1Open} onClose={() => {setIsModen1Open(false)}}/>
				<LoginCreateModal open={isModal2Open} onClose={() => {setIsModen2Open(false)}}/>
			</div>
		);
	}
)