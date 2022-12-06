import * as React from 'react';
import {observer} from "mobx-react-lite";
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemProps,
    ListItemText,
    Typography
} from "@mui/material";
import Transaction from "../../../model/Transaction";
import {useStores} from "../../../hooks/useStores";
import {computeCurrencyTextColor, formatCurrencyText} from "../../../utils/TextUtils";

export interface TransactionListItemProps extends ListItemProps {
    transaction : Transaction;
}

export const TransactionListItem = observer((props: TransactionListItemProps) => {

        const { accountsStore } = useStores();

        // TODO optimize; use set? I think this can be a computed
        const findPhysicalAccountName = (account_id) => {
            return (
                accountsStore.currentPhysicalAccountsData.find((account) => account.account_id === account_id)
            )?.name;
        }

        const findVirtualAccountName = (account_id) => {
            return (
                accountsStore.currentVirtualAccountsData.find((account) => account.account_id === account_id)
            )?.name;
        }

        return (
            <ListItem {...props} key={props.transaction.transaction_id}>
                <ListItemButton>
                    {/*<ListItemAvatar>*/}
                    {/*    <Avatar>*/}
                    {/*        // TODO Have pictures*/}
                    {/*    </Avatar>*/}
                    {/*</ListItemAvatar>*/}
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

                    <Typography color={computeCurrencyTextColor(props.transaction.value)}>
                        {formatCurrencyText(props.transaction.value)}
                    </Typography>
                </ListItemButton>
            </ListItem>
        );
    }
)