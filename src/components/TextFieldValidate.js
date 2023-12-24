import { TextField } from '@mui/material';
import React, { useState } from 'react';


function TextFieldValidate({ value, setValue, name }) {
    const [isError, setIsError] = useState("")
    const handleChange = e => {
        const value = e.target.value.replace(/  +/g, ' ');
        setValue(value===' '?'':value)
        if (value.length === 0) setIsError(`${name} do not empty`)
        else if((name ==="Time learning" && isNaN(value)) || (name ==="Price" && isNaN(value))){
            setIsError("You must enter a number")
        }
        else setIsError("")
    }
    return (
        <TextField fullWidth id="outlined-basic" label={name} variant="outlined" margin="normal"
            error={isError.length>0}
            helperText={isError}
            required
            value={value}
            onChange={e => handleChange(e)}
        />
    );
}

export default TextFieldValidate;