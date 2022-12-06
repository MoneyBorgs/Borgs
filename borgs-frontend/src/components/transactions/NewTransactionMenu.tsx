import * as React from 'react';
import {useStores} from '../../hooks/useStores';
import {observer} from 'mobx-react-lite';
import {ExpenseCreateOrEditModal} from './ExpenseCreateOrEditModal';
import {CategoryTypes} from "../../model/Category";
import {Button, Menu, MenuItem} from "@mui/material";

interface IModalState  {
	isModalOpen : boolean;
	transactionType?: CategoryTypes | undefined;
}

export const NewTransactionMenu = observer(() => {
		const { transactionsStore, accountsStore } = useStores();

		const [anchorEl, setAnchorEl] = React.useState(null);

		const [modalState, setModalState] = React.useState<IModalState>({isModalOpen: false});

		const open = Boolean(anchorEl);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		const handleNewExpense = (event) => {
			handleClose();
			setModalState({
				isModalOpen: true,
				transactionType: CategoryTypes.EXPENSE
			})
		}

		const handleNewIncome = () => {
			handleClose();
			setModalState({
				isModalOpen: true,
				transactionType: CategoryTypes.INCOME
			})
		}

		function handleNewTransfer() {
			handleClose();
			setModalState({
				isModalOpen: true,
				transactionType: CategoryTypes.TRANSFER
			})
		}

		return (
			<div>
				<Button
					id="basic-demo-button"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					variant="outlined"
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
				>
					<MenuItem onClick={handleNewExpense}>Expense</MenuItem>
					<MenuItem onClick={handleNewIncome}>Income</MenuItem>
					<MenuItem onClick={handleNewTransfer}>Transfer</MenuItem>
				</Menu>
				<ExpenseCreateOrEditModal
					open={modalState.isModalOpen}
					onClose={() => {setModalState({isModalOpen: false})}}
					transactionType={modalState.transactionType}
				/>
			</div>
		);
	}
)