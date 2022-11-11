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
            <NewAccountMenu/>
            <TextField id="outlined-basic" 
            label="Account ID" variant="outlined" 
            onChange={(event) => setUserID(event.target.value)}
            value = {userID}/>
			<Button variant="text" onClick={handleOnSubmitForm}>Submit</Button>
            
            <div>
                Virtual Accounts
            {
            accountsStore.currentVirtualAccountsData.map( account => {return <li> {account.name} </li>}
            )}
            </div>
            <div>
                Physical Accounts
            {
            accountsStore.currentPhysicalAccountsData.map( account => {return <li> {account.name} </li>}
            )}
            </div>
            
            <div>
			<br></br>
			<br></br>
			
			<AccountPicker
				options={accountsStore.currentPhysicalAccountsData}
				label={"Physical Account"}
				inputName="physical-account-picker"
				onChange={((event, account) => { accountsStore.getMonthlyPhysicalAccountData(account.account_id, +year) })} 
			/>

			<br></br>
			<br></br>

			<FormControl fullWidth>
			<InputLabel id="select-year-label">Year</InputLabel>
			<Select
				labelId="select-year-label"
				id="select-year"
				value={year}
				label="Year"
				onChange={(event) => setYear(event.target.value)}
			>
				<MenuItem value={2016}>2016</MenuItem>
				<MenuItem value={2017}>2017</MenuItem>
				<MenuItem value={2018}>2018</MenuItem>
				<MenuItem value={2019}>2019</MenuItem>
				<MenuItem value={2020}>2020</MenuItem>
				<MenuItem value={2021}>2021</MenuItem>
				<MenuItem value={2022}>2022</MenuItem>
			</Select>
			</FormControl>

			<br></br>
			<br></br>

			<BarChart width={600} height={300} data={accountsStore.monthlyBalance} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis dataKey="month" />
				<YAxis/>
				<Bar dataKey="net_result" fill="#8884d8" />
			</BarChart>

			<br></br> 

			Current balance of account is {accountsStore.totalAccountBalance}

		</div>

        </div>
        
    )
});
