import React from 'react'
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import { observer } from "mobx-react-lite";

export const NotFoundPage = observer(() => {
	return (
		<CssVarsProvider>
			<Button>Joy UI</Button>
		</CssVarsProvider>
	)
});