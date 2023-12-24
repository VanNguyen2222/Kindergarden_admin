import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { ref, update } from "firebase/database";
import { db } from "firebaseConfig";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

function ItemStudent(props) {
  const { id, name, phoneNumber, email, isActive } = props;
  const alert = useAlert();
  const handleToggleLock = (id, isActive) => {
    const updates = {};
    updates[`students/${id}/isActive`] = !isActive;
    update(ref(db), updates);
    updates[`students/${id}/isActive`]
      ? alert.success(`Unlock student ${name} successful!`)
      : alert.success(`Lock student ${name} successful!`);
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{phoneNumber}</TableCell>
      <TableCell align="right">{email}</TableCell>
      <TableCell align="right">
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
      </TableCell>
    </TableRow>
  );
}

export default ItemStudent;
