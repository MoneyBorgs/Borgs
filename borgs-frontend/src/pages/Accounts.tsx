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
import { useStores } from '../hooks/useStores';

export const Accounts = observer(() => {

    const { userStore, accountsStore } = useStores();
    const [userID, setUserID] = useState('');
    const handleOnSubmitForm = (event) => {
        console.log(userID)
        userStore.updateUser(userID);
        accountsStore.updateVirtualAccounts();
    }
	

    return (
        <div>
            <TextField id="outlined-basic" 
            label="Outlined" variant="outlined" 
            onChange={(event) => setUserID(event.target.value)}
            value = {userID}/>
			<Button variant="text" onClick={handleOnSubmitForm}>Text</Button>
            
            <div>
            {
            accountsStore.currentVirtualAccountsData.map( account => {return <li> {account.name} </li>}
            )}
            </div>
            
        </div>
        
    )
});
