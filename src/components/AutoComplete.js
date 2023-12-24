import { Autocomplete, TextField } from '@mui/material';
import React, { useState } from 'react';

function AutoComplete(props) {
    const { options, getValue = () => {}, getInputValue, label } = props
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e, newValue) => {
        setValue(newValue);
        getValue(newValue);
    }

    const handleInputChange = (e, newInputValue) => {
        setInputValue(newInputValue);
        getInputValue(newInputValue);
    }

    return (
        <Autocomplete
            value={value}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            freeSolo
            disableClearable
            id="controllable-states-demo"
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                    }} />}
        />
    );
}

export default AutoComplete;