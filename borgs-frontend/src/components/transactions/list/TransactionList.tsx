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

export const TransactionList = observer(() => {
    const { transactionsStore } = useStores();

    let sortedTransactions = transactionsStore.currentTransactionsData.slice().sort((t1, t2) => {
        return t2.timestampepochseconds - t1.timestampepochseconds
    });

    const handleOnCloseDatePicker = (date: DateRange, event: React.SyntheticEvent) => {
        transactionsStore.updateTransactionsForDateRange(dayjs(date[0]), dayjs(date[1]));
    };
    return (
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
                    {renderListItems(sortedTransactions)}
                </List>
            </Paper>
        );
    }
)

function renderListItems(sortedTransactions : Transaction[]) : JSX.Element[] {
    const elements : JSX.Element[] = [];

    if(sortedTransactions?.length === 0) return elements;

    let currentDay: dayjs.Dayjs = dayjs();

    for (let i = 0; i < sortedTransactions.length; i++){
        const transaction = sortedTransactions[i];
        const transactionDate = dayjs.unix(transaction.timestampepochseconds);

        if(i === 0 || !transactionDate.isSame(currentDay, "day")) {
            currentDay = transactionDate;
            elements.push(
                <>
                {i !== 0 ? <Divider light sx={{marginLeft: 1.5, marginRight: 1.5}} /> : null}
                <Typography variant="subtitle2" sx={{fontWeight: 'bold', paddingLeft: 2, paddingTop: 2}}>
                    {dayjs.unix(transaction.timestampepochseconds).format("MMMM D, YYYY")}
                </Typography>
                </>
            )
        }

        elements.push(<TransactionListItem transaction={transaction}/>);
    }

    return elements
}

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