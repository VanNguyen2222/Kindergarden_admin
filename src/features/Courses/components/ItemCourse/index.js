import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import Confirm from "components/Confirm";
import { ClassesContex } from "context/ClassesProvider";
import { ref, update } from "firebase/database";
import { db } from "firebaseConfig";
import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

function ItemCourse(props) {
  const { id, name, description, price, time, isActive } = props;
  const classesContext = useContext(ClassesContex);
  const [classCount, setClassCount] = useState(0);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const alert = useAlert();
  useEffect(() => {
    const newClass = classesContext.filter(
      (classChild) => classChild.courseId === id
    );
    setClassCount(newClass.length);
  }, [classesContext, id]);

  const handleDeleteCourse = (courseId) => {
    console.log(courseId);
    const updates = {};
    updates[`courses/${courseId}/isDeleted`] = true;
    updates[`courses/${courseId}/isActive`] = false;
    const deleteClasses = classesContext.filter(
      (cClass) => cClass.courseId === courseId
    );

    if (deleteClasses)
      deleteClasses.forEach((dClass) => {
        updates[`classes/${dClass.id}/isDeleted`] = true;
        updates[`classes/${dClass.id}/isActive`] = false;
      });
    update(ref(db), updates)
      .then(() => {
        alert.success("Delete course sucsses!");
      })
      .catch((error) => {
        alert.error("Delete course fail!");
      });

    setIsOpenConfirm(false);
  };

  const handleClose = () => {
    setIsOpenConfirm(false);
  };

  const dong = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleToggleLock = (courseId, isActive) => {
    const updates = {};
    updates[`courses/${courseId}/isActive`] = !isActive;
    update(ref(db), updates)
      .then(() => {
        alert.success(`${isActive ? "Lock" : "Unlock"} course success`);
      })
      .catch((error) => {
        alert.error(`${isActive ? "Lock" : "Unlock"} course fail!`);
      });
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell style={{ width: 300 }} align="left">
        {description}
      </TableCell>
      <TableCell align="right">{dong}</TableCell>
      <TableCell align="right">{time}</TableCell>
      <TableCell align="right">{classCount}</TableCell>
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
        <Tooltip title="Delete" arrow>
          <IconButton onClick={() => setIsOpenConfirm(true)} color="warning">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Confirm
          open={isOpenConfirm}
          handleOke={() => handleDeleteCourse(id)}
          handleClose={handleClose}
        />
      </TableCell>
    </TableRow>
  );
}

export default ItemCourse;
