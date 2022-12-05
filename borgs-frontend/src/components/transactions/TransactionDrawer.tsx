import * as React from 'react';
import {observer} from "mobx-react-lite";
import {Col, Drawer, DrawerProps, Grid, IconButton, Row, Stack, Tag, TagGroup} from "rsuite";
import EditIcon from '@rsuite/icons/Edit';
import Transaction from "../../model/Transaction";
import {useStores} from "../../hooks/useStores";
import {useState} from "react";
import {ExpenseCreateOrEditModal} from "./ExpenseCreateOrEditModal";
import TrashIcon from '@rsuite/icons/Trash';
import {Typography} from "@mui/material";
import dayjs from "dayjs";
import {computeCurrencyTextColor, formatCurrencyText} from "../../utils/TextUtils";
import {CategoryTypes} from "../../model/Category";

export interface TransactionDrawer extends DrawerProps {
    transaction?: Transaction;
}

interface IModalState  {
    isModalOpen : boolean;
    transactionType?: CategoryTypes | undefined;
}

export const TransactionDrawer = observer((props: TransactionDrawer) => {

        const { accountsStore } = useStores();

        const [modalState, setModalState] = React.useState<IModalState>({isModalOpen: false});

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
                                onClick={() => setModalState({isModalOpen: true})}
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
                                                    accountsStore.currentPhysicalAccountsData.
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
                        onClose={() => setModalState({isModalOpen: false})}
                        open={modalState.isModalOpen}
                        transactionType={props.transaction?.category.category_type}
                        preFilledTransaction={props.transaction}
                        isEditingMode={true}
                    />
                </Drawer>
            </>
        );
    }
)

function renderValue(value) {
    return <Typography variant={"subtitle2"} color={computeCurrencyTextColor(value)}><b>
        {formatCurrencyText(value)}</b></Typography>;
}