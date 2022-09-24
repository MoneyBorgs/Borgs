import {
	browserHistory,
	createRouterState,
	HistoryAdapter,
	RouterStore,
} from 'mobx-state-router';

import { MainPage } from '../pages/MainPage';
import { Reports } from '../pages/Reports';
import { Accounts } from '../pages/Accounts';
import { Allocations } from '../pages/Allocations';
import { Transactions } from '../pages/Transactions';

export const notFound = createRouterState('notFound');

export const routes = [
	{
		name: 'mainpage',
		pattern: '/',
		showNavBar: true,
		container: <MainPage/>
	},
	{
		name: 'reports',
		pattern: '/reports',
		showNavBar: true,
		container: <Reports/>
	},
	{
		name: 'accounts',
		pattern: '/accounts',
		showNavBar: true,
		container: <Accounts/>
	},
	{
		name: 'transactions',
		pattern: '/transactions',
		showNavBar: true,
		container: <Transactions/>
	},
	{
		name: 'allocations',
		pattern: '/allocations',
		showNavBar: true,
		container: <Allocations/>
	},
];

export function initRouter() {
	const routerStore = new RouterStore(routes, notFound);

	// Observe history changes
	const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
	historyAdapter.observeRouterStateChanges();

	return routerStore;
}