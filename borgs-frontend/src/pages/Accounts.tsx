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
import {accountCardPhysical, accountCardVirtual} from '../components/accounts/accountPageCard';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AccountPicker } from '../components/fields/AccountPicker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RouterStore } from 'mobx-state-router';
import { useRouterStore } from 'mobx-state-router';

export const Accounts = observer(() => {

    const { userStore, accountsStore } = useStores();
    const [year, setYear] = useState('');
    const rootStore = useStores();
	const routerStore = useRouterStore();
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
			<h1> Accounts </h1>
			<br></br>
			{/* Different modal buttons to create, edit, and delete accounts */}
			<div style={{ 
				paddingLeft: '1%'}}><NewAccountMenu/></div>
			<br></br>
            <div style={{ 
				paddingLeft: '1%'}}><EditAccountMenu/></div>
			<br></br>
			<div style={{ 
				paddingLeft: '1%'}}><DeleteAccountMenu/></div>
			<hr></hr>
            {/* <TextField id="outlined-basic" 
            label="Account ID" variant="outlined" 
            onChange={(event) => setUserID(event.target.value)}
            value = {userID}/>
			<Button variant="text" onClick={handleOnSubmitForm}>Submit</Button> */}
            {/* Displaying virtual and physical accounts */}
            {/* <div>
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
            </div> */}
            
        	<div>
			
			<div style={{ 
				width: '100%', 
				display: 'flex', 
				justifyContent: 'space-between', 
				alignItems: 'center',
				paddingLeft: '5%',
				paddingTop: '5%'}}>

			{accountCardVirtual(accountsStore, routerStore)}
			</div>

			<br></br>
			<div style={{ 
				width: '100%', 
				display: 'flex', 
				justifyContent: 'space-between', 
				alignItems: 'center',
				paddingLeft: '5%',
				paddingTop: '5%',
				paddingBottom: '5%'}}>

			{accountCardPhysical(accountsStore, routerStore)}
			</div>
				

			

        </div>
		</div>
        
    )
});
