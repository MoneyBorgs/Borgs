import React, { useState } from 'react'
import { observer } from "mobx-react-lite";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { ButtonGroup, List } from '@mui/material';
import AccountsStore from '../stores/AccountsStore';
import Account from '../model/Account';
import MenuItem from '@mui/material/MenuItem';
import { useStores } from '../hooks/useStores';
import { NewAccountMenu } from '../components/accounts/NewAccountMenu';
import { DeleteAccountMenu } from '../components/accounts/DeleteAccountMenu';
import { EditAccountMenu } from '../components/accounts/EditAccountMenu';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AccountPicker } from '../components/fields/AccountPicker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export const Accounts = observer(() => {

    const { userStore, accountsStore } = useStores();
    const [year, setYear] = useState('');
    const rootStore = useStores();
    const [userID, setUserID] = useState('');
    const handleOnSubmitForm = (event) => {
        console.log(userID)
        userStore.updateUser(userID);
        accountsStore.updateVirtualAccounts();
        accountsStore.updatePhysicalAccounts();

        rootStore.updateCache();
    }
	

    return (
        <div>
			{/* Different modal buttons to create, edit, and delete accounts */}
			<div><NewAccountMenu/></div>
			<br></br>
            <div><EditAccountMenu/></div>
			<br></br>
			<div><DeleteAccountMenu/></div>
			<hr></hr>
            {/* Displaying virtual and physical accounts */}
            <div>
				<h3> Virtual Accounts </h3>
				<h4> {
				accountsStore.currentVirtualAccountsData.map( account => {return <li> {account.name} </li>}
				)} </h4>
            </div>
            <div>
				<h3> Physical Accounts </h3>
				<h4>{
				accountsStore.currentPhysicalAccountsData.map( account => {return <li> {account.name} </li>}
				)}</h4>
            </div>
		</div>
        
    )
});
