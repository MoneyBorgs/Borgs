import React from 'react'
import { observer } from "mobx-react-lite";

export const Reports = observer(() => {
	return (
		<div>
			<h1>Reports</h1>
			<img src={require('../resources/reports.png')} alt='enzo is cool'/>
		</div>
	)
});