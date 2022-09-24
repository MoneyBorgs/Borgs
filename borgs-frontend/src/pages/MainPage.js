import React from 'react'
import { useRouterStore } from 'mobx-state-router';
import NavBar from '../components/NavBar';

export const MainPage = () => {
	const routerStore = useRouterStore();

	const handleClick = () => {
		routerStore.goTo('department', {
			params: { id: 'electronics' },
		});
	};

	return (
		<div>
			<NavBar/>
			<h1>Home</h1>
			<button onClick={handleClick}>Go to Electronics</button>
		</div>
	)
};