import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import EditTeacherPage from './pages/EditTeacherPage';
import HomeTeacherPage from './pages/HomeTeacherPage';


function Teachers(props) {
    return (
        <div>
            <div style={{marginBottom: '15px', fontSize: '50px'}}>TEACHERS</div>
            <Link style={{ color: 'inherit', textDecoration: 'inherit', fontSize: '20px'}} to="" ><Button style={{fontSize: '25px', textTransform: 'capitalize'}}>Home</Button></Link>
            <Link style={{ color: 'inherit', textDecoration: 'inherit', fontSize: '20px', marginLeft:'10px'}} to="add" ><Button style={{fontSize: '25px', textTransform: 'capitalize'}}> AddNew {<AddIcon style={{fontSize: '30px'}}/>}</Button></Link>
            <Routes>
                <Route path="add" element={<EditTeacherPage />} />
                <Route path=":teacherId" element={<EditTeacherPage />} />
                <Route path="" element={<HomeTeacherPage />} />
            </Routes>

        </div>
    );
}

export default Teachers;