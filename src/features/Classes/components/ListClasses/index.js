import {
    Grid, IconButton, Paper,
    Table, TableBody, TableCell,
    TableContainer, TableFooter, TableHead,
    TableRow
} from '@mui/material';
import AutoComplete from 'components/AutoComplete';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { ClassesContex } from 'context/ClassesProvider';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import ItemClass from '../ItemClasses';
import { CoursesContext } from 'context/CoursesProvider';
import TablePaginationCustom from 'components/TablePaginationCustom';

function ListClass(props) {
    const classes = useContext(ClassesContex)
    const courses = useContext(CoursesContext);

    const [inputName, setInputName] = useState("");
    const [inputCourse, setInputCourse] = useState("");
    const [order, setOrder] = useState({ by: "name", isAsc: true });
    const [filteredClasses, setFilteredClasses] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const nameOptions = useMemo(
        () => inputCourse ?
            filteredClasses?.map(c => c.name) :
            classes?.map(c => c.name),
        [classes, inputCourse, filteredClasses]
    );

    const courseOptions = useMemo(
        () => inputName ?
            courses?.filter(course =>
                filteredClasses.some(c => c.courseId === course.id))
                .map(course => course.name) :
            courses?.filter(course =>
                classes.some(c => c.courseId === course.id))
                .map(course => course.name),
        [courses, classes, inputName, filteredClasses]
    );

    const handleChangeOrder = (by) => {
        if (order.by === by) setOrder({ by, isAsc: !order.isAsc })
        else setOrder({ by, isAsc: true })
    }

    useEffect(() => {
        if (classes) {
            let newClasses = [...classes]
            if (inputName.length > 0) {
                newClasses = newClasses.filter(nC =>
                    nC.name
                        .toUpperCase()
                        .includes(inputName.toUpperCase()))
            }

            if (courses && inputCourse.length > 0) {
                const courseIdOptions = courses
                    .filter(c =>
                        c.name
                            .toUpperCase()
                            .includes(inputCourse.toUpperCase()))
                    .map(c => c.id)

                newClasses = newClasses.filter(nC =>
                    courseIdOptions.includes(nC.courseId))
            }
            newClasses.sort(
                (a, b) => (a[order.by] >= b[order.by]) ?
                    (order.isAsc ? 1 : -1) :
                    (order.isAsc ? -1 : 1))
            setFilteredClasses([...newClasses])
        } else setFilteredClasses([]);
    }, [classes, inputName, order, courses, inputCourse])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {nameOptions &&
                        <AutoComplete
                            label="Class name"
                            options={nameOptions}
                            getInputValue={setInputName}
                        />}
                </Grid>
                <Grid item xs={6}>
                    {courseOptions &&
                        <AutoComplete
                            label="Course name"
                            options={courseOptions}
                            getInputValue={setInputCourse}
                        />}
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Name
                                <IconButton
                                    onClick={() => handleChangeOrder("name")}
                                    color="primary"
                                >
                                    <SortByAlphaIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">Course</TableCell>
                            <TableCell align="right">Start</TableCell>
                            <TableCell align="right">End</TableCell>
                            <TableCell align="right">Students</TableCell>
                            <TableCell align="right">Teacher</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredClasses && (rowsPerPage > 0
                            ? filteredClasses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : filteredClasses)
                            .map((itemClass) => (
                                <ItemClass key={itemClass.id} {...itemClass} />
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePaginationCustom
                                count={filteredClasses.length}
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

export default ListClass;