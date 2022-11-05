import * as React from 'react';
import {observer} from "mobx-react-lite";
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemProps,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import Transaction from "../../../model/Transaction";
import {useStores} from "../../../hooks/useStores";
import currency from 'currency.js';

export interface TransactionListItemProps extends ListItemProps {
    transaction : Transaction;
}

export const TransactionListItem = observer((props: TransactionListItemProps) => {

        const { accountsStore } = useStores();

        // TODO optimize; use set? I think this can be a computed
        const findPhysicalAccountName = (account_id) => {
            return (
                accountsStore.availablePhysicalAccounts.find((account) => account.account_id === account_id)
            )?.name;
        }

        const findVirtualAccountName = (account_id) => {
            return (
                accountsStore.currentVirtualAccountsData.find((account) => account.account_id === account_id)
            )?.name;
        }

        return (
            <ListItem {...props} >
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar>
                            // TODO Have pictures
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.transaction.description}
                        secondary={
                            <Typography variant="subtitle2">
                                {findPhysicalAccountName(props.transaction.physical_account)
                                + ", "
                                + findVirtualAccountName(props.transaction.virtual_account)}
                            </Typography>
                        }
                    />

                    <Typography color={props.transaction.value < 0 ? "#c62828" : "#4caf50"}>
                        {
                            currency(props.transaction.value,
                                { separator: ".", decimal: ",", symbol: "$" }
                            ).format()
                        }
                    </Typography>
                </ListItemButton>
            </ListItem>
        );
    }
)