import * as React from 'react';
import {useStores} from '../../hooks/useStores';
import {observer} from 'mobx-react-lite';
import {CategoryTypes} from "../../model/Category";
import {Button, Menu, MenuItem} from "@mui/material";
import {InvestModal} from './InvestModal';

interface IModalState  {
	isModalOpen : boolean;
	transactionType?: CategoryTypes | undefined;
}


export const NewInvestmentMenu = observer(() => {
		const { transactionsStore, accountsStore } = useStores();

		const [isModalOpen, setIsModenOpen] = React.useState(false);
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
			setIsModenOpen(true);
		}


		return (
			<div>
				<Button
					id="basic-demo-button"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					variant="outlined"
					onClick={handleNewExpense}
				>
					New Investment
				</Button>
				<InvestModal open={isModalOpen} onClose={() => {setIsModenOpen(false)}}/>
			</div>
		);
	}
)