import React from 'react'
import { observer } from "mobx-react-lite";
import { NewInvestmentMenu } from '../components/investments/NewInvestmentMenu';

export const Investments = observer(() => {
	return (
		<div
			style={{
				padding: "1em 2.5em",
			}}>
			<h1>Investments</h1>
			<NewInvestmentMenu/>
		</div>
	)
});