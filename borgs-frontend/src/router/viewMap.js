import React from 'react';
import { MainPage } from '../pages/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { Reports } from '../pages/Reports';
import { Accounts } from '../pages/Accounts';
import { Allocations } from '../pages/Allocations';
import { Transactions } from '../pages/Transactions';

export const viewMap = {
	mainpage: <MainPage/>,
	notFound: <NotFoundPage/>,
	reports: <Reports/>,
	accounts: <Accounts/>,
	transactions: <Transactions/>,
	allocations: <Allocations/>
};