import React from 'react'
import { useRouterStore } from 'mobx-state-router';
import NavBar from '../components/NavBar';

export const Reports = () => {
	const routerStore = useRouterStore();

	return (
		<div>
			<NavBar/>
			<h1>Reports</h1>
		</div>
	)
};