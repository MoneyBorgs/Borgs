import React from 'react'
import { useRouterStore } from 'mobx-state-router';
import NavBar from '../components/NavBar';
import Dashboard from '../containers/Dashboard';

export const MainPage = () => {
	const routerStore = useRouterStore();

	return (
		<div>
			<NavBar/>
			<h1>Home</h1>
		</div>
	)
};