import * as React from 'react';
import { Table, IconButton } from 'rsuite';
import { CurrencyCell, PercentCell } from '../reports/tableCard';
import Button from '@mui/material/Button';

const {Column, HeaderCell, Cell} = Table;

export function AllInvestmentsTable(investmentsStore, routerStore) {
	return (
        <div style={{
        display: 'block', width: 1100
            }}>
            <Table
            virtualized height={300}
            data={investmentsStore.investmentsTable}
            onRowClick={data => {
                console.log(data);
                }}
            >

                <Column width={150}>
                    <HeaderCell>Ticker</HeaderCell>
                    <Cell dataKey="ticker" rowData={undefined} />
                </Column>

                <Column width={250} align="center" fixed>
                    <HeaderCell>Investment Value</HeaderCell>
                    <CurrencyCell dataKey="value" rowData={undefined}/>
                </Column>

                <Column width={100}>
                    <HeaderCell> Quantity of stock</HeaderCell>
                    <Cell dataKey="count"/>
                </Column>

                <Column width={150}>
                    <HeaderCell>Price at purchase</HeaderCell>
                    <CurrencyCell dataKey="purchase_price" rowData={undefined}/>
                </Column>router

                <Column width={150}>
                    <HeaderCell>Current price</HeaderCell>
                    <CurrencyCell dataKey="current_price" rowData={undefined} />
                </Column>

                <Column width={100}>
                    <HeaderCell> Percent change</HeaderCell>
                    <PercentCell dataKey="percent_change" rowData={undefined}/>
                </Column>

                <Column width={100}>
                    <HeaderCell> Liquidate </HeaderCell>
                    <Cell>
                        {rowData => (
                            <Button onClick={() => investmentsStore.liquidateInvestment(rowData)}>
                            Liquidate
                          </Button>
                        )}
                    </Cell>
                </Column>
            </Table>

            <Button size="small" onClick={() => { investmentsStore.getAllInvestments(); }}>Update Stock Data</Button>
        </div>
)}