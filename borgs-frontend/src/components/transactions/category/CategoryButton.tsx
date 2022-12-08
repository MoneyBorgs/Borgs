import * as React from 'react';
import {useStores} from '../../../hooks/useStores';
import {observer} from 'mobx-react-lite';
import {CategoryTypes} from "../../../model/Category";
import {Button} from "@mui/material";
import {CategoriesModal} from "./CategoriesModal";

interface IModalState  {
	isModalOpen : boolean;
	transactionType?: CategoryTypes | undefined;
}

export const CategoryButton = observer(() => {
		const { transactionsStore, accountsStore } = useStores();

		const [anchorEl, setAnchorEl] = React.useState(null);
		const [isModalOpen, setIsModalOpen] = React.useState(false);

		const open = Boolean(anchorEl);
		const handleClick = (event) => {
			setAnchorEl(event.currentTarget);
			setIsModalOpen(true);
		};
		const handleClose = () => {
			setAnchorEl(null);
		};

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
					Categories
				</Button>
				<CategoriesModal
					open={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			</div>
		);
	}
)