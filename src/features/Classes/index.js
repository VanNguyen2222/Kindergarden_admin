import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import EditClassesPage from './page/EditClassPage';
import HomeClassesPage from './page/HomeClassesPage';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


function Classes(props) {
    return (
        <div>
            <div style={{marginBottom: '15px', fontSize: '50px'}}>CLASSES</div>
            <Link style={{ color: 'inherit', textDecoration: 'inherit', fontSize: '20px'}} to="" ><Button style={{fontSize: '25px', textTransform: 'capitalize'}}>Home</Button></Link>
            <Link style={{ color: 'inherit', textDecoration: 'inherit', fontSize: '20px', marginLeft:'10px'}} to="add" ><Button style={{fontSize: '25px', textTransform: 'capitalize'}}> AddNew {<AddIcon style={{fontSize: '30px'}}/>}</Button></Link>
            <Routes>
                <Route path="add" element={<EditClassesPage />} />
                <Route path=":classId" element={<EditClassesPage />} />
                <Route path="" element={<HomeClassesPage />} />
            </Routes>
        </div>
    );
}

export default Classes;