import {
	browserHistory,
	createRouterState,
	HistoryAdapter,
	RouterStore,
} from 'mobx-state-router';

const notFound = createRouterState('notFound');

export const routes = [
	{
		name: 'mainpage',
		pattern: '/',
	},
	{
		name: 'reports',
		pattern: '/reports'
	},
	{
		name: 'notFound',
		pattern: '/not-found',
	},
];

export function initRouter() {
	const routerStore = new RouterStore(routes, notFound);

	// Observe history changes
	const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
	historyAdapter.observeRouterStateChanges();

	return routerStore;
}