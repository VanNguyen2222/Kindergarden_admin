import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from '@mui/material';
import TablePaginationCustom from 'components/TablePaginationCustom';
import { TeachersContext } from 'context/TeachersProvider';
import React, { useContext, useEffect, useState } from 'react';
import ItemTeacher from '../ItemTeacher';

function ListTeachers(props) {
    const teachers = useContext(TeachersContext)

    const [name, setName] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filteredTeachers, setFilteredTeachers] = useState(teachers || [])


    const handleChange = (event) => {
        setName(event.target.value.trim().toUpperCase());
    };

    useEffect(() => {
        if (teachers) {
            if (name.length >= 0) {
                setFilteredTeachers(teachers.filter(s =>
                    s.name.toUpperCase().includes(name) ||
                    s.email.toUpperCase().includes(name) ||
                    s.phoneNumber.toUpperCase().includes(name)))
            } else setFilteredTeachers(teachers)
        }
    }, [name, teachers])

    return (
        <>
            <TextField
                id="outlined-name"
                label="Search value"
                value={name}
                onChange={handleChange}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">State</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTeachers && (rowsPerPage > 0
                            ? filteredTeachers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredTeachers).map((teacher) => (
                                <ItemTeacher key={teacher.id} {...teacher} />
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePaginationCustom
                                count={filteredTeachers.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                setPage={setPage}
                                setRowsPerPage={setRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}

export default ListTeachers;