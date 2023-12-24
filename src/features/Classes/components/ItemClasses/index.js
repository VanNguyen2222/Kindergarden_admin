import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Confirm from "components/Confirm";
import { CoursesContext } from 'context/CoursesProvider';
import { TeachersContext } from 'context/TeachersProvider';
import { ref, update } from 'firebase/database';
import { db } from 'firebaseConfig';
import React, { useContext, useState } from 'react';
import { useAlert } from "react-alert";
import { Link } from 'react-router-dom';

function ItemClass(props) {
    const {
        id, name, end, start,
        students, isActive, courseId,
        teacherId, isFinished
    } = props

    const teachers = useContext(TeachersContext)
    const courses = useContext(CoursesContext)

    const alert = useAlert()

    const [isOpenConfirm, setIsOpenConfirm] = useState(false);
    const [isOpenConfirmFinish, setIsOpenConfirmFinish] = useState(false);
    const [content, setContent] = useState("");

    const handleOpen = () => {
        setIsOpenConfirm(true);
        if (students.length > 0)
            setContent(`There are ${students.length
                } in class. Are you sure to delete this class`)
    }

    const handleOpenFinish = () => {
        setIsOpenConfirmFinish(true)
        setContent("")
    }

    const handleClose = () => {
        setIsOpenConfirm(false,
            () => setContent("")
        );
    };

    const handleCloseFinish = () => {
        setIsOpenConfirmFinish(false, () => setContent(""));
    };

    const handleToggleFinish = () => {
        const updates = {};
        updates[`classes/${id}/isFinished`] = !isFinished;
        update(ref(db), updates)
        update(ref(db), updates)
            .then(() => alert.success(`${isFinished ? "UnFinish" : "Finish"} class ${name} successful!`))
            .catch(error => alert.error(`${isFinished ? "UnFinish" : "Finish"} class ${name} successful!`))
        setIsOpenConfirmFinish(false)
    }

    const handleDeleteClass = () => {
        const updates = {};
        updates[`classes/${id}/isDeleted`] = true;
        updates[`classes/${id}/isActive`] = false;

        if (students.length >= 1) {
            alert.error("You can't delete this class." +
                "there are 5 or more students in this class.")
            handleClose()
            return
        }

        update(ref(db), updates)
            .then(() => alert.success("Delete class sucsses!"))
            .catch((error) => alert.error("Delete class fail!"));
    }

    const handleToggleLock = (classId, isActive) => {
        const updates = {};
        updates[`classes/${classId}/isActive`] = !isActive;
        update(ref(db), updates)
            .then(() => alert.success(`${isActive ? "Lock" : "Unlock"} class ${name} successful!`))
            .catch(error => alert.error(`${isActive ? "Lock" : "Unlock"} class ${name} successful!`))
    }

    const getTeacherName = (teacherId) => {
        if (teachers) {
            const teaacher = teachers.find(teacher => teacher.id === teacherId)
            return teaacher?.name
        }
    }
    const getCourseName = (courseId) => {
        if (courses) {
            const course = courses.find(course => course.id === courseId)
            return course?.name
        }
    }

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {name}
            </TableCell>
            <TableCell align="right">{getCourseName(courseId)}</TableCell>
            <TableCell align="right">{start}</TableCell>
            <TableCell align="right">{end}</TableCell>
            <TableCell align="right">{Object.keys(students).length}</TableCell>
            <TableCell align="right">{getTeacherName(teacherId)}</TableCell>
            <TableCell align="right">
                {!isFinished &&
                    <>
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
                        <Tooltip title="Delete" arrow>
                            <IconButton onClick={handleOpen} color="warning">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                }

                <Tooltip title={isFinished ? "Unfinish" : "Finish"} arrow>
                    <IconButton
                        onClick={handleOpenFinish}
                        color={isFinished ? "success" : "warning"}
                    >
                        {isFinished ? <CheckCircleOutlineIcon /> : <HourglassBottomIcon />}
                    </IconButton>
                </Tooltip>
                <Confirm
                    open={isOpenConfirm}
                    handleOke={handleDeleteClass}
                    handleClose={handleClose}
                    content={content}
                />
                <Confirm
                    open={isOpenConfirmFinish}
                    handleOke={handleToggleFinish}
                    handleClose={handleCloseFinish}
                    content={content}
                />
            </TableCell>
        </TableRow>
    );
}

export default ItemClass;