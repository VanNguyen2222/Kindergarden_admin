import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from './hook';

function ItemOwnClass(props) {
    const { id, courseId, name, start, end, isFinished } = props
    const { courseName } = useData(courseId)
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">{name}</TableCell>
            <TableCell align="right">{courseName}</TableCell>
            <TableCell align="right">{start}</TableCell>
            <TableCell align="right">{end}</TableCell>
            <TableCell align="right">
                <Tooltip title={isFinished ? "Unfinish" : "Finish"} arrow>
                    <IconButton
                        style={{cursor: "default"}}
                        color={isFinished ? "success" : "warning"}
                    >
                        {isFinished ? <CheckCircleOutlineIcon /> : <HourglassBottomIcon />}
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell align="right">
                <Link to={`/classes/${id}`}>
                    <Tooltip title={"Show class"} arrow>
                        <IconButton color="success">
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
            </TableCell>
        </TableRow>
    );
}

export default ItemOwnClass;