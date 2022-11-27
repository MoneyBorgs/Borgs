import * as React from 'react';
import {observer} from "mobx-react-lite";
import Transaction from '../../../model/Transaction';
import {Box, Divider, List, ListProps, Paper, Typography} from "@mui/material";
import {TransactionListItem} from "./TransactionListItem";
import dayjs from "dayjs";
import {Button, DateRangePicker} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {useStores} from "../../../hooks/useStores";
import {RangeType} from "rsuite/DateRangePicker";
import {DateRange} from "rsuite/esm/DateRangePicker/types";
import {TransactionDrawer} from "../TransactionDrawer";
import {useState} from "react";
import {DayTransactionsListItem} from "./DayTransactionsListItem";

interface TransactionDrawerState {
    isOpen: boolean,
    loadedTransaction: Transaction | undefined
}

export const TransactionList = observer(() => {
        const {transactionsStore} = useStores();

        const [transactionDrawerState, setDrawerState] = useState<TransactionDrawerState>({isOpen: false, loadedTransaction: undefined});

        const handleOnCloseDatePicker = (date: DateRange, event: React.SyntheticEvent) => {
            transactionsStore.updateDailyTransactionsForDateRange(dayjs(date[0]), dayjs(date[1]));
        };

        return (
            <>x
                <Paper sx={{padding: 1.5, paddingTop: 3}}>
                    <Box justifyContent="center" sx={{display: 'flex'}}>
                        <DateRangePicker
                            showOneCalendar
                            onOk={handleOnCloseDatePicker}
                            ranges={predefinedRanges}
                            defaultValue={[
                                dayjs().startOf("month").toDate(),
                                dayjs().endOf("month").toDate()
                            ]}/>
                    </Box>
                    <List>
                        {transactionsStore.currentDailyTransactionsData.map((dayTransactions) => {
                            return <DayTransactionsListItem
                                dayTransactions={dayTransactions}
                                onClickTransaction={(transaction) => {setDrawerState({isOpen: true, loadedTransaction: transaction})}}/>
                        })}
                    </List>
                </Paper>
                <TransactionDrawer
                    open={transactionDrawerState.isOpen}
                    transaction={transactionDrawerState.loadedTransaction}
                    onClose={() => {setDrawerState({isOpen: false, loadedTransaction: undefined})}}/>
            </>
        );
    }
)

const predefinedRanges : RangeType[] = [
    {
        label: 'Today',
        value: [dayjs().startOf("day").toDate(), dayjs().endOf("day").toDate()],
        placement: 'left',
        closeOverlay: false
    },
    {
        label: 'Last 7 days',
        value: [dayjs().startOf("day").subtract(7, "day").toDate(), dayjs().endOf("day").toDate()],
        placement: 'left',
        closeOverlay: false
    },
    {
        label: 'Last 30 days',
        value: [dayjs().startOf("day").subtract(30, "month").toDate(), dayjs().endOf("day").toDate()],
        placement: 'left',
        closeOverlay: false
    },
    {
        label: 'This month',
        value: [dayjs().startOf("month").toDate(), dayjs().endOf("month").toDate()],
        placement: 'left',
        closeOverlay: false
    },
    {
        label: 'Last month',
        value: [dayjs().startOf("month").subtract(1, "month").toDate(), dayjs().endOf("month").subtract(1, "month").toDate()],
        placement: 'left',
        closeOverlay: false
    },
    {
        label: 'This year',
        value: [dayjs().startOf("year").toDate(), dayjs().endOf("year").toDate()],
        placement: 'left',
        closeOverlay: false
    },

];