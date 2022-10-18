import React from 'react'
import { observer } from "mobx-react-lite";
import Box from '@mui/material/Box';
import { Typography, Stack, TextField, Button } from '@mui/material';

export const Register = observer(() => {
    return (
        <div>
            <h1>Register</h1>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="*First Name" variant="outlined" />
                <TextField id="outlined-basic" label="*Last Name" variant="outlined" />
                <TextField id="outlined-basic" label="*Email Address" variant="outlined" />
                <TextField id="outlined-basic" label="*Password" variant="outlined" />
                <Button type="submit">Create Account</Button>
            </Box>
        </div>
    )
});
