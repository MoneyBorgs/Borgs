import * as React from 'react';
import { observer } from "mobx-react-lite";
import {Button, Modal, ModalUnstyledOwnProps, TextField} from '@mui/material';
import Category, {CategoryTypes} from "../../../model/Category";
import Transaction from "../../../model/Transaction";
import Box from "@mui/material/Box";
import {ModalClose} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import {useStores} from "../../../hooks/useStores";
import Stack from "@mui/joy/Stack";
import {useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {Input} from "rsuite";

export interface NewCategoryModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
    onClose: () => void;
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

export const NewCategoryModal = observer((props : NewCategoryModalProps) => {

    const { transactionsStore } = useStores();
    const [ transactionState, setTransactionState ] = useState<Category>(new Category());

    const handleOnValueChange = (field, value) => {
        setTransactionState({...transactionState, [field] : value})
    }

    const handleOnSubmitForm = (event) => {
        transactionsStore.createCategory(transactionState);
        props.onClose();
    }

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
                    Create new category
                </Typography>

                <Stack spacing={2}>
                    <TextField
                        required
                        label="Display name" autoFocus
                        onChange={(event) => {
                            handleOnValueChange("displayname", event.target.value)
                        }}
                    />
                    <Autocomplete
                        options={[CategoryTypes.EXPENSE, CategoryTypes.INCOME, CategoryTypes.TRANSFER]}
                        onChange={((event, category) => {
                            handleOnValueChange("category_type", category)
                        })}
                        disablePortal
                        id="ca"
                        sx={{ width: 300 }}
                        getOptionLabel={(categoryType) => categoryType}
                        renderOption={(props, categoryType) => renderCategoryOption(props, categoryType)}
                        renderInput={(params) => renderCategoryInput(params)}
                    />
                    <Button onClick={handleOnSubmitForm}>{"Create"}</Button>
                </Stack>

            </Box>
        </Modal>
    );
})

function renderCategoryInput(params) {
    return <TextField {...params} label={"Category type"} name={"Teste"}/>
}

function renderCategoryOption(props, categoryType) : React.ReactElement {
    return (
        <Box {...props} key={categoryType}>
            <Typography>{categoryType}</Typography>
        </Box>
    );
}
