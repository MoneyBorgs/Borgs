import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { RegisterCreateModal } from './NewRegisteredUser';

export const NewRegistrationMenu = observer(() => {
		const { userStore } = useStores();
		const [anchorEl, setAnchorEl] = React.useState(null);
		const [isModalOpen, setIsModenOpen] = React.useState(false);
		const open = Boolean(anchorEl);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		const handleNewUser = (event) => {
			handleClose();
			setIsModenOpen(true);
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
					<MenuItem onClick={handleClose}>Login</MenuItem>
				</Menu>
				<RegisterCreateModal open={isModalOpen} onClose={() => {setIsModenOpen(false)}}/>
			</div>
		);
	}
)