import LockIcon from '@mui/icons-material/Lock';
import EditIcon from "@mui/icons-material/Edit";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { ref, update } from 'firebase/database';
import { db } from 'firebaseConfig';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAlert } from "react-alert"
function ItemTeacher(props) {
    const { id, name, email, phoneNumber, address, isActive } = props
    const alert = useAlert()
    const handleToggleLock = (id, isActive) => {
        const updates = {};
        updates[`teachers/${id}/isActive`] = !isActive;
        update(ref(db), updates)
        updates[`teachers/${id}/isActive`] ? alert.success("Unlock teacher successul!") : alert.success("Lock teacher successul!")
    }

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {name}
            </TableCell>
            <TableCell align="right">{email}</TableCell>
            <TableCell align="right">{phoneNumber}</TableCell>
            <TableCell align="right">{address}</TableCell>
            <TableCell align="right">
                <Tooltip title="Edit" arrow>
                    <IconButton color="primary">
                        <Link
                            to={`${id}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            <EditIcon />
                        </Link>
                    </IconButton>
                </Tooltip>
                <Tooltip title={isActive ? "Lock" : "Unlock"} arrow>
                    <IconButton
                        onClick={() => {
                            handleToggleLock(id, isActive);
                        }}
                        color={isActive ? "success" : "default"}
                    >
                        {isActive ? <LockOpenIcon /> : <LockIcon />}
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
}

export default ItemTeacher;