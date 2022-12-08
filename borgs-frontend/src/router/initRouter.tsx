import {
	browserHistory,
	createRouterState,
	HistoryAdapter,
	RouterStore,
	Route
} from 'mobx-state-router';

import { MainPage } from '../pages/MainPage';
import { Reports } from '../pages/Reports';
import { Accounts } from '../pages/Accounts';
import { Investments } from '../pages/Investments';
import { Transactions } from '../pages/Transactions';
import { Register } from '../pages/Register';
import React from 'react';

export const notFound = createRouterState('notFound');

export interface SuperRoute extends Route {
	showNavBar: boolean,
	container: React.ReactElement
}

export const routes : SuperRoute[] = [
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
		name: 'register',
		pattern: '/register',
		showNavBar: false,
		container: <Register/>
	},
	{
		name: 'investments',
		pattern: '/investments',
		showNavBar: true,
		container: <Investments/>
	},
];

export const routes1 : SuperRoute[] = [
	{
		name: 'register',
		pattern: '/register',
		showNavBar: true,
		container: <Register/>
	}
];

export function initRouter() {

	const routerStore = new RouterStore(routes, notFound);

	// Observe history changes
	const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
	historyAdapter.observeRouterStateChanges();

	return routerStore;
}