import * as React from 'react';
import { observer } from "mobx-react-lite";
import {Button, Modal, ModalUnstyledOwnProps, TextField} from '@mui/material';
import {CategoryTypes} from "../../../model/Category";
import Transaction from "../../../model/Transaction";
import Box from "@mui/material/Box";
import {ModalClose} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import {useStores} from "../../../hooks/useStores";
import {CategoriesList} from "./CategoriesList";
import {NewCategoryButton} from "./NewCategoryButton";

export interface CategoriesModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
    onClose: () => void;
    transactionType? : CategoryTypes;
    preFilledTransaction? : Transaction;
    isEditingMode? : boolean;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export const CategoriesModal = observer((props : CategoriesModalProps) => {

    const { transactionsStore } = useStores();

    return (
        <Modal {...props}>
            <Box
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={style}
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
                    onClick={() => {
                        props.onClose()
                    }}
                />
                <Typography
                    id="basic-modal-dialog-title"
                    component="h2"
                    level="inherit"
                    fontSize="1.25em"
                    mb="0em"
                >
                    Categories
                </Typography>
                <NewCategoryButton/>
                <CategoriesList/>

            </Box>
        </Modal>
    );
})

