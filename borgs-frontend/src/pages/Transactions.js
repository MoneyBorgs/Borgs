import React from 'react'
import { useRouterStore } from 'mobx-state-router';
import NavBar from '../components/NavBar';
import Dashboard from '../containers/Dashboard';

export const Transactions = () => {
	return (
		<div>
			<NavBar />
			<h1>Transactions</h1>
		</div>
	)
};