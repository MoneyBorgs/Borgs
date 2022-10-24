import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react-lite';
import { ExpenseEditCreateModal } from './NewExpenseModal';
import Transaction from '../../model/Transaction';

export const NewTransactionMenu = observer(() => {
		const { transactionsStore } = useStores();

		const [anchorEl, setAnchorEl] = React.useState(null);
		const [isModalOpen, setIsModenOpen] = React.useState(false);
		const open = Boolean(anchorEl);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		const handleNewExpense = (event) => {
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
					New Transaction
				</Button>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					aria-labelledby="basic-demo-button"
					placement="bottom-start"
				>
					<MenuItem onClick={handleNewExpense}>Expense</MenuItem>
					<MenuItem onClick={handleClose}>My account</MenuItem>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
				<ExpenseEditCreateModal open={isModalOpen} onClose={() => {setIsModenOpen(false)}}/>
			</div>
		);
	}
)