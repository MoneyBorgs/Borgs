import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import {useStores} from '../../hooks/useStores';
import {observer} from 'mobx-react-lite';
import {ExpenseCreateOrEditModal} from './NewExpenseModal';
import Transaction from '../../model/Transaction';
import dayjs from "dayjs";
import {CategoryType} from "../../model/Category";

export const NewTransactionMenu = observer(() => {
		const { transactionsStore, accountsStore } = useStores();

		const [anchorEl, setAnchorEl] = React.useState(null);

		const [isModalOpen, setIsModalOpen] = React.useState(false);
		const [newTransactionType, setTransactionType] = React.useState<CategoryType | undefined>(undefined);
		const [loadedTransaction, setLoadedTransaction] = React.useState<Transaction | undefined>();

		const open = Boolean(anchorEl);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

		const handleNewExpense = (event) => {
			handleClose();
			// TODO Replace by single state object
			setLoadedTransaction(undefined);
			setTransactionType(CategoryType.EXPENSE);
			setIsModalOpen(true);
		}

		const handleNewIncome = () => {
			handleClose();
			setLoadedTransaction(undefined);
			setTransactionType(CategoryType.INCOME);
			setIsModalOpen(true)
		}

		const handleSimulateEdit = () => {
			handleClose();
			const t = new Transaction();
			t.description = "Teste";
			t.value = 10000;
			t.category = {
				"category_id": 1,
				"category_type": CategoryType.EXPENSE,
				"children": null,
				"displayname": "Olive",
				"user_id": 1
			};
			t.timestampepochseconds = dayjs().unix();
			t.virtual_account = accountsStore.currentVirtualAccountsData[0].account_id;
			console.log(t.category);
			t.physical_account = accountsStore.currentPhysicalAccountsData[0].account_id;
			t.tags = [transactionsStore.availableTags[0]];

			setLoadedTransaction(t);

			setIsModalOpen(true);
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
					<MenuItem onClick={handleNewIncome}>Income</MenuItem>
					<MenuItem onClick={handleSimulateEdit}>SimulateEdit</MenuItem>
				</Menu>
				<ExpenseCreateOrEditModal
					open={isModalOpen}
					onClose={() => {setIsModalOpen(false)}}
					preFilledTransaction={loadedTransaction}
					transactionType={newTransactionType}
				/>
			</div>
		);
	}
)