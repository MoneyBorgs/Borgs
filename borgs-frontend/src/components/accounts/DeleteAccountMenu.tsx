import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { AccountDeleteModal } from './DeleteAccount';
import User from '../../model/User';
import Account from '../../model/Account';

export const DeleteAccountMenu = observer(() => {
		const { userStore } = useStores();
        const { accountsStore } = useStores();
		const [anchorEl, setAnchorEl] = React.useState(null);
		const [isModalOpen, setIsModenOpen] = React.useState(false);
		const open = Boolean(anchorEl);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		const handleDeleteVirtualAccount = (event) => {
			accountsStore.adding_account = "virtual"
			handleClose();
			setIsModenOpen(true);
			//transactionsStore.openExpenseModal(Transaction.getDefaultTransaction());
		}

		const handleDeletePhysicalAccount = (event) => {
			accountsStore.adding_account = "physical"
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
					Delete Account
				</Button>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					aria-labelledby="basic-demo-button"
					placement="bottom-start"
				>
					<MenuItem onClick={handleDeleteVirtualAccount}>Delete Virtual Account</MenuItem>
					<MenuItem onClick={handleDeletePhysicalAccount}>Delete Physical Account</MenuItem>
				</Menu>
				<AccountDeleteModal open={isModalOpen} onClose={() => {setIsModenOpen(false)}}/>
			</div>
		);
	}
)