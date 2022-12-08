import * as React from 'react';
import {observer} from "mobx-react-lite";
import {useStores} from "../../../hooks/useStores";
import {List, ListItem, ListItemButton, Typography} from "@mui/material";
import Category, {CategoryTypes} from "../../../model/Category";
import TrashIcon from "@rsuite/icons/Trash";
import {IconButton, Input} from "rsuite";
import EditIcon from "@rsuite/icons/Edit";
import {CategoryListItem} from "./CategoryListItem";

export const CategoriesList = observer(() => {
    const { transactionsStore } = useStores();

    return (
        <>
            <Typography>Expense</Typography>
            <List>
            {transactionsStore.availableCategories
                .filter((category) => category.category_type === CategoryTypes.EXPENSE)
                .map((category) => <CategoryListItem category={category}/>)}
            </List>
            <Typography>Income</Typography>
            <List>
                {transactionsStore.availableCategories
                    .filter((category) => category.category_type === CategoryTypes.INCOME)
                    .map((category) => <CategoryListItem category={category}/>)}
            </List>
            <Typography>Transfer</Typography>
            <List>
                {transactionsStore.availableCategories
                    .filter((category) => category.category_type === CategoryTypes.TRANSFER)
                    .map((category) => <CategoryListItem category={category}/>)}
            </List>
        </>
    );
})

function renderCategory(category : Category) {
    return (
        <ListItem>
            <ListItemButton>
                <Input plaintext value={category.displayname} />
            </ListItemButton>
            <IconButton
                icon={<EditIcon />}
                onClick={() => {}}
                appearance="subtle">
            </IconButton>
            <IconButton
                icon={<TrashIcon />}
                onClick={(event) => {}}
                appearance="subtle">
            </IconButton>
        </ListItem>
    );
}