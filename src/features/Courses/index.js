import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import EditPage from './pages/EditPage';
import { Button } from '@mui/material';
import HomePage from './pages/HomePage';
import AddIcon from '@mui/icons-material/Add';


function Courses(props) {
    return (
        <div>
            <div style={{marginBottom: '15px', fontSize: '50px'}}>COURSES</div>
            <Link style={{ color: 'inherit', textDecoration: 'inherit', fontSize: '20px'}} to="" ><Button style={{fontSize: '25px', textTransform: 'capitalize'}}>Home</Button></Link>
            <Link style={{ color: 'inherit', textDecoration: 'inherit', fontSize: '20px', marginLeft:'10px'}} to="add" ><Button style={{fontSize: '25px', textTransform: 'capitalize'}}> AddNew {<AddIcon style={{fontSize: '30px'}}/>}</Button></Link>
            <Routes>
                <Route path="add" element={<EditPage />} />
                <Route path=":courseId" element={<EditPage />} />
                <Route path="" element={<HomePage />} />
            </Routes>
        </div>
    );
}

export default Courses;