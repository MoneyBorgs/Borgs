import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { RegisterCreateModal } from './NewRegisteredUser';
import { LoginCreateModal } from './LoginModal';
import User from '../../model/User';

export const NewRegistrationMenu = observer(() => {
		const { userStore } = useStores();
		const [anchorEl, setAnchorEl] = React.useState(null);
		const [isModal1Open, setIsModen1Open] = React.useState(false);
		const [isModal2Open, setIsModen2Open] = React.useState(false);
		const open = Boolean(anchorEl);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		const handleNewUser = (event) => {
			handleClose();
			setIsModen1Open(true);
			//transactionsStore.openExpenseModal(Transaction.getDefaultTransaction());
		}

		const handleNewLogin = (event) => {
			handleClose();
			setIsModen2Open(true);
			//transactionsStore.openExpenseModal(Transaction.getDefaultTransaction());
		}

		return (
			<div>
				<Button
					id="basic-demo-button"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					variant="outlined"
					color="neutral"
					onClick={handleClick}
				>
					Register or Login
				</Button>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					aria-labelledby="basic-demo-button"
					placement="bottom-start"
				>
					<MenuItem onClick={handleNewUser}>Register</MenuItem>
					<MenuItem onClick={handleNewLogin}>Login</MenuItem>
				</Menu>
				<RegisterCreateModal open={isModal1Open} onClose={() => {setIsModen1Open(false)}}/>
				<LoginCreateModal open={isModal2Open} onClose={() => {setIsModen2Open(false)}}/>
			</div>
		);
	}
)