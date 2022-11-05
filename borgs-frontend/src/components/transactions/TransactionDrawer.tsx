import * as React from 'react';
import {observer} from "mobx-react-lite";
import {Col, Drawer, DrawerProps, Grid, IconButton, Row, Stack, Tag, TagGroup} from "rsuite";
import EditIcon from '@rsuite/icons/Edit';
import Transaction from "../../model/Transaction";
import {useStores} from "../../hooks/useStores";
import {useState} from "react";
import {ExpenseCreateOrEditModal} from "./NewExpenseModal";
import TrashIcon from '@rsuite/icons/Trash';
import currency from "currency.js";
import {Typography} from "@mui/material";
import dayjs from "dayjs";

export interface TransactionDrawer extends DrawerProps {
    transaction?: Transaction;
}

export const TransactionDrawer = observer((props: TransactionDrawer) => {

        const { accountsStore } = useStores();

        const [ isModalOpen, setIsModalOpen ] = useState(false);

        return (
            <>
                <Drawer {...props } enforceFocus = {false}>
                    <Drawer.Header>
                        <Drawer.Title>
                            Transaction
                        </Drawer.Title>
                        <Drawer.Actions>
                            <IconButton
                                icon={<EditIcon />}
                                onClick={() => setIsModalOpen(true)}
                                appearance="subtle">
                                Edit
                            </IconButton>
                            <IconButton
                                icon={<TrashIcon />}
                                onClick={() => {}} // TODO delete
                                appearance="subtle">
                            </IconButton>
                        </Drawer.Actions>
                    </Drawer.Header>
                    <Drawer.Body>
                        <div style={{marginBottom: "2em"}}>
                            <Stack alignItems={"baseline"}>
                                <>
                                    <Typography variant={"h5"}>{props.transaction?.description}</Typography>
                                    {renderValue(props.transaction?.value)}
                                </>
                                <Stack.Item grow={1}>
                                    <Typography variant={"subtitle2"} align={"right"}>
                                        {dayjs.unix(props.transaction?.timestampepochseconds as number).format("MMMM D, YYYY")}
                                    </Typography>
                                </Stack.Item>
                            </Stack>
                        </div>

                        <Grid>
                            <Row>
                                <Col xs={4}>
                                    <div>
                                        <Typography variant={"subtitle2"}>
                                            <b>
                                                Physical Account
                                            </b>
                                        </Typography>
                                        <Typography variant={"subtitle2"}>
                                            {
                                                (
                                                    accountsStore.availablePhysicalAccounts.
                                                    find((account) => account.account_id === props.transaction?.physical_account)
                                                )?.name
                                            }
                                        </Typography>
                                    </div>
                                </Col>
                                <Col xs={4}>
                                    <>
                                        <Typography variant={"subtitle2"}>
                                            <b>
                                                Virtual Account
                                            </b>
                                        </Typography>
                                        <Typography variant={"subtitle2"}>
                                            {
                                                (
                                                    accountsStore.currentVirtualAccountsData.
                                                    find((account) => account.account_id === props.transaction?.virtual_account)
                                                )?.name
                                            }
                                        </Typography>
                                    </>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "10px"}}>
                                <Col xs={4}>
                                    <>
                                        <Typography variant={"subtitle2"}>
                                            <b>
                                                Category
                                            </b>
                                        </Typography>
                                        <Typography variant={"subtitle2"}>
                                            {
                                                props.transaction?.category.displayname
                                            }
                                        </Typography>
                                    </>
                                </Col>
                                <Col xs={8}>
                                    <>
                                        <Typography variant={"subtitle2"}>
                                            <b>
                                                Notes
                                            </b>
                                        </Typography>
                                        <Typography variant={"subtitle2"}>
                                            {
                                                props.transaction?.notes ? props.transaction?.notes : "--"
                                            }
                                        </Typography>
                                    </>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "10px"}}>
                                <Col>
                                    <>
                                        <Typography variant={"subtitle2"}>
                                            <b>
                                                Tags
                                            </b>
                                        </Typography>
                                        <TagGroup style={{marginTop: "-5px"}}>
                                            {props.transaction?.tags.map((tag) => <Tag>{tag.toString()}</Tag>)}
                                        </TagGroup>
                                    </>
                                </Col>
                            </Row>
                        </Grid>

                    </Drawer.Body>
                    <ExpenseCreateOrEditModal
                        onClose={() => setIsModalOpen(false)}
                        open={isModalOpen}
                        transactionType={props.transaction?.category.category_type}
                        preFilledTransaction={props.transaction}
                    />
                </Drawer>
            </>
        );
    }
)

function renderValue(value) {
    return <Typography variant={"subtitle2"} color={value < 0 ? "#c62828" : "#4caf50"}><b>
        {currency(value,
            { separator: ".", decimal: ",", symbol: "$" }
        ).format()}</b></Typography>;
}