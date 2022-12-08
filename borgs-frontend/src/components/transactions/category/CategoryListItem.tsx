import * as React from 'react';
import {Button, ListItem, ListItemButton, ListItemText, Modal, ModalUnstyledOwnProps, TextField} from "@mui/material";
import {IconButton, Input} from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import {observer} from "mobx-react-lite";
import Category, {CategoryTypes} from "../../../model/Category";
import {useState} from "react";
import CheckIcon from '@rsuite/icons/Check';
import {useStores} from "../../../hooks/useStores";
import Box from "@mui/material/Box";
import {ModalClose} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import {CategoryPicker} from "../../fields/CategoryPicker";
import {reaction} from "mobx";

interface CategoryListItemProps {
    category : Category;
}

export const CategoryListItem = observer((props : CategoryListItemProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState<Category>(props.category);

    const {transactionsStore} = useStores();

    function handleSubmit() {
        console.log("Submitting with value" + categoryValue.displayname);
        transactionsStore.updateCategory(categoryValue);
        setIsEditing(false);
    }

    return (
            <ListItem key={props.category.category_id}>
                <ListItemText disableTypography>
                    {isEditing?
                        <Input
                            value={categoryValue.displayname}
                            onChange={(value) => setCategoryValue({...categoryValue, displayname : value})} />
                        :
                        <Input
                            plaintext={true}
                            value={props.category.displayname}/>
                    }
                </ListItemText>
                {isEditing ?
                    <IconButton
                        icon={<CheckIcon/>}
                        onClick={handleSubmit}
                        appearance="subtle">
                    </IconButton> :
                    <IconButton
                        icon={<EditIcon />}
                        onClick={() => {setIsEditing(true)}}
                        appearance="subtle">
                    </IconButton>
                }
                <IconButton
                    icon={<TrashIcon />}
                    onClick={(event) => {setIsModalOpen(true)}}
                    appearance="subtle">
                </IconButton>
                <PickCategoryModal
                    open={isModalOpen}
                    options={transactionsStore.availableCategories
                        .filter((category) => category.category_id !== props.category.category_id
                            && category.category_type === props.category.category_type)}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={(category) => transactionsStore.deleteCategory(props.category, category)}
                />
            </ListItem>
    );
})

export interface PickCategoryModalProps extends Omit<ModalUnstyledOwnProps, "children" | "onClose"> {
    onClose: () => void;
    onSubmit: (category) => void;
    options : Category[];
}

const PickCategoryModal = observer((props : PickCategoryModalProps) => {

    const {transactionsStore} = useStores();

    const [selectedCategory, setSelectedCategory] = useState<Category>(new Category());

    function handleSubmit() {
        props.onSubmit(selectedCategory);
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
                    Choose a replacing category
                </Typography>
                <CategoryPicker
                    inputName={"Replace with"}
                    options={props.options}
                    onChange={((event, category) => {
                        setSelectedCategory(category)
                    })}
                />
                <Button
                    onClick={handleSubmit}
                >{"Delete"}</Button>
            </Box>
        </Modal>
    );
})

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