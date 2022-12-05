import * as React from 'react';
import {observer} from "mobx-react-lite";
import {
    Avatar, Divider,
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
import DailyTransactions from "../../../model/DailyTransactions";
import dayjs from "dayjs";
import {TransactionListItem} from "./TransactionListItem";

export interface DayTransactionsListItemProps extends ListItemProps {
    dayTransactions : DailyTransactions;
    onClickTransaction: (transaction) => void;
}

export const DayTransactionsListItem = observer((props: DayTransactionsListItemProps) => {

        const { accountsStore } = useStores();

        return (
            <>
                <Typography variant="subtitle2" sx={{fontWeight: 'bold', paddingLeft: 2, paddingTop: 2}}>
                    {dayjs.unix(props.dayTransactions.date || 0).format("MMMM D, YYYY")}
                </Typography>
                {props.dayTransactions.transactions?.map((transaction) => {
                    return <TransactionListItem
                        transaction={transaction}
                        onClick={() => props.onClickTransaction(transaction)}
                    />
                })}
                <Typography align="right" color="#616161" fontSize="13px" sx={{paddingRight: 4}}>
                    <b>Day balance: </b> {formatCurrencyText(props.dayTransactions.day_ending_balance)}
                </Typography>
                <Divider light sx={{marginTop: 3, marginBottom : 1.5, marginLeft: 1.5, marginRight: 1.5}} />
            </>
        );
    }
)