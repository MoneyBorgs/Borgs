import * as React from 'react';
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import { useStores } from '../../hooks/useStores';
import { ModalClose } from '@mui/joy';
import { observer } from 'mobx-react-lite';

export const NewExpenseModal = observer(() => {
	
		const { transactionsStore } = useStores();

		return (
				<Modal open={transactionsStore.isNewExpenseModalOpen} onClose={() => transactionsStore.setNewExpenseModalState(false)}>
					<ModalDialog
						aria-labelledby="basic-modal-dialog-title"
						aria-describedby="basic-modal-dialog-description"
						sx={{
							maxWidth: 500,
							borderRadius: 'md',
							p: 3,
							boxShadow: 'lg',
						}}
					>
					<ModalClose
						variant="outlined"
						sx={{
							top: 'calc(-1/4 * var(--IconButton-size))',
							right: 'calc(-1/4 * var(--IconButton-size))',
							boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
							borderRadius: '50%',
							bgcolor: 'background.body',
						}}
					/>
						<Typography
							id="basic-modal-dialog-title"
							component="h2"
							level="inherit"
							fontSize="1.25em"
							mb="0.25em"
						>
							Create new expense
						</Typography>
						<form
							onSubmit={(event) => {
								event.preventDefault();
								transactionsStore.setNewExpenseModalState(false);
							}}
						>
							<Stack spacing={2}>
								<TextField label="Description" autoFocus />
								<TextField label="Amount" type="number"/>
								<Button type="submit">Submit</Button>
							</Stack>
						</form>
					</ModalDialog>
				</Modal>
		);
	}
)