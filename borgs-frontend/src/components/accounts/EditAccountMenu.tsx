import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { AccountEditModal } from './EditAccount';
import User from '../../model/User';
import Account from '../../model/Account';

export const EditAccountMenu = observer(() => {
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

		const handleEditVirtualAccount = (event) => {
			// Handling when virtual account is selected
			accountsStore.adding_account = "virtual"
			handleClose();
			setIsModenOpen(true);
			//transactionsStore.openExpenseModal(Transaction.getDefaultTransaction());
		}

		const handleEditPhysicalAccount = (event) => {
			// handling when physical account is selected
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
					Edit Account
				</Button>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					aria-labelledby="basic-demo-button"
					placement="bottom-start"
				>
					<MenuItem onClick={handleEditVirtualAccount}>Edit Virtual Account</MenuItem>
					<MenuItem onClick={handleEditPhysicalAccount}>Edit Physical Account</MenuItem>
				</Menu>
				<AccountEditModal open={isModalOpen} onClose={() => {setIsModenOpen(false)}}/>
			</div>
		);
	}
)