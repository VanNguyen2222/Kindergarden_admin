import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import AutoComplete from 'components/AutoComplete';
import TablePaginationCustom from 'components/TablePaginationCustom';
import { StudentsContext } from 'context/StudentsProvider';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ItemStudentsClass from '../ItemStudentsClass';

function ListStudentsClass({ members, otherClasses = [] }) {
    const students = useContext(StudentsContext)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");

    const [filteredOnwStudents, setFilteredOnwStudents] = useState([])

    const onwStudentList = useMemo(
        () => {
            const newStudents = []
            students.forEach(student => {
                const member = members.find(nember => nember.id === student.id)
                if (member) {
                    newStudents.push({
                        ...student,
                        isActive: member.isActive
                    })
                }
            });
            return newStudents
        },
        [students, members]
    )

    const nameOptions = useMemo(
        () => inputEmail ?
            filteredOnwStudents?.map(c => c.name) :
            onwStudentList?.map(c => c.name),
        [onwStudentList, filteredOnwStudents, inputEmail]
    );

    const emailOptions = useMemo(
        () => inputName ?
            filteredOnwStudents?.map(c => c.email) :
            onwStudentList?.map(c => c.email),
        [onwStudentList, filteredOnwStudents, inputName]
    );

    useEffect(() => {
        if (onwStudentList) {
            let newOnwStudents = [...onwStudentList]
            if (inputName.length > 0) {
                newOnwStudents = onwStudentList.filter(nC =>
                    nC.name
                        .toUpperCase()
                        .includes(inputName.toUpperCase()))
            }

            if (inputEmail.length > 0) {
                newOnwStudents = onwStudentList.filter(nC =>
                    nC.email
                        .toUpperCase()
                        .includes(inputEmail.toUpperCase()))
            }

            setFilteredOnwStudents(newOnwStudents)
        }
    }, [onwStudentList, inputName, inputEmail])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {nameOptions &&
                        <AutoComplete
                            label="Student name"
                            options={nameOptions}
                            getInputValue={setInputName}
                        />}
                </Grid>
                <Grid item xs={6}>
                    {nameOptions &&
                        <AutoComplete
                            label="Student name"
                            options={emailOptions}
                            getInputValue={setInputEmail}
                        />}
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOnwStudents && (rowsPerPage > 0
                            ? filteredOnwStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredOnwStudents).map((student) => (
                                <ItemStudentsClass key={student.id} {...student} otherClasses={otherClasses} />
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePaginationCustom
                                count={filteredOnwStudents.length}
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

export default ListStudentsClass;