import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import { TeachersContext } from 'context/TeachersProvider';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

function ItemClassesCourse(props) {
    const { id, name, start, end, teacherId } = props
    const teachers = useContext(TeachersContext);

    const getTeacher = () => {
        if (teachers) {
            const teacher = teachers.find(teacher => teacher.id === teacherId)
            if (teacher) return teacher.name
            return "non"
        }
        return "non"
    }

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">{name}</TableCell>
            <TableCell align="right">{start}</TableCell>
            <TableCell align="right">{end}</TableCell>
            <TableCell align="right">{getTeacher()}</TableCell>
            <TableCell align="right">
                <Tooltip title="Edit" arrow>
                    <IconButton color="primary">
                        <Link
                            to={`/classes/${id}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            <EditIcon />
                        </Link>
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}

export default ItemClassesCourse;