import React, { useState } from 'react';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TableCell, TableRow, Tooltip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { ref, update, set, remove } from 'firebase/database';
import { db } from 'firebaseConfig';
import { useParams } from 'react-router-dom';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import Confirm from './../../../../components/Confirm'
import { useAlert } from 'react-alert';

function ItemStudentsClass({ id, name, email, isActive, otherClasses }) {
    const { classId } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const [changedClassId, setChangedClassId] = useState("");

    const alert = useAlert()

    const handleCloseDelete = () => {
        setIsOpenDelete(false)
    }
    const handleOkeDelete = () => {
        remove(ref(db, `classes/${classId}/students/${id}`))
            .then(() => alert.success("delete student successful"))
            .catch((error) => alert.error("delete student failed"))
        setIsOpenDelete(false)
    }

    const handleClose = () => {
        setChangedClassId("")
        setIsOpen(false)
    }
    const handleOke = () => {
        set(ref(db, `classes/${changedClassId}/students/${id}`), {
            isActive: isActive
        })
            .then(() => { })
            .catch((error) => {
                alert.error("transferred class failed") 
                setIsOpen(false)
                return
            })

        remove(ref(db, `classes/${classId}/students/${id}`))
            .then(() => alert.success("transferred class successful"))
            .catch((error) => alert.error("transferred class failed"))
        setIsOpen(false)
    }
    const handleToggleLock = (isActive, studentId) => {
        const updates = {};
        updates[`classes/${classId}/students/${studentId}/isActive`] = !isActive;
        update(ref(db), updates)
            .then(() => alert.success(`${isActive ? "Lock" : "Unlock"} student successful`))
            .catch(error => alert.error(`${isActive ? "Lock" : "Unlock"} student failed`))
    }
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {name}
            </TableCell>
            <TableCell align="right">{email}</TableCell>
            <TableCell align="right">
                <Tooltip title={isActive ? "Lock" : "Unlock"} arrow>
                    <IconButton
                        onClick={() => {
                            handleToggleLock(isActive, id);
                        }}
                        color={isActive ? "success" : "default"}
                    >
                        {isActive ? <LockOpenIcon /> : <LockIcon />}
                    </IconButton>
                </Tooltip>
                {otherClasses && otherClasses?.length > 0 &&
                    <>
                        <Tooltip title="Change class" arrow>
                            <IconButton onClick={() => setIsOpen(true)} color="primary">
                                <MoveDownIcon />
                            </IconButton>
                        </Tooltip>
                        {isOpen &&
                            <Confirm
                                title="Change class"
                                open={isOpen}
                                handleOke={handleOke}
                                handleClose={handleClose}
                                content={
                                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                                        <InputLabel id="demo-simple-select-label">Available class</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={changedClassId}
                                            label="Available class"
                                            onChange={(e) => setChangedClassId(e.target.value)}
                                        >
                                            {otherClasses.map(c => (
                                                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                }
                            />}
                    </>}
                {!isActive &&
                    <>
                        <Tooltip title="Delete" arrow>
                            <IconButton onClick={() => setIsOpenDelete(true)} color="warning">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Confirm
                            open={isOpenDelete}
                            handleOke={handleOkeDelete}
                            handleClose={handleCloseDelete}
                        />
                    </>}

            </TableCell>
        </TableRow>
    );
}

export default ItemStudentsClass;