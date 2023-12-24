import React from 'react';
import { Button } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import HomeStudentsPage from './pages/HomeStudentsPage';
import EditStudentPage from './pages/EditStudentPage';

function Students(props) {
    return (
        <div>
            <div style={{ marginBottom: '15px', fontSize: '50px' }}>STUDENTS</div>
            <Link style={{ color: 'inherit', textDecoration: 'inherit', fontSize: '20px' }} to="" >
                <Button style={{ fontSize: '25px' }}>Home</Button>
            </Link>
            <Routes>
                <Route path="" element={<HomeStudentsPage />} />
                <Route path=":studentId" element={<EditStudentPage />} />
                {/* <Route path="" element={<ReportStudent />} /> */}
            </Routes>
        </div>
    );
}

export default Students;