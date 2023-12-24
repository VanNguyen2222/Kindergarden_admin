import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ClassesContex } from 'context/ClassesProvider';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemClassesCourse from '../ItemClassesCourse';

function ListClssesCourse(props) {
    const classes = useContext(ClassesContex)
    const { courseId } = useParams();
    const [courseClasses, setCourseClasses] = useState([])

    console.log(courseClasses)

    useEffect(() => {
        if (classes) {
            if (courseId)
                setCourseClasses(classes.filter(cClass => cClass.courseId === courseId))
        } else setCourseClasses([])
    }, [classes, courseId])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Start</TableCell>
                        <TableCell align="right">End</TableCell>
                        <TableCell align="right">Teacher</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courseClasses &&
                        courseClasses?.map(cClass => (
                            <ItemClassesCourse key={cClass.id} {...cClass} />
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ListClssesCourse;