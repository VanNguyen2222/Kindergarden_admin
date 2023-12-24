import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ getValue, list = [], nameSelect, defaultValue }) {
    const handleChange = (event) => {
        getValue(event.target.value);
    };
    
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{nameSelect}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={defaultValue}
                    label={nameSelect}
                    onChange={handleChange}
                >
                    {list && list.map(item => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
