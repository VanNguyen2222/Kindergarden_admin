import EditIcon from "@mui/icons-material/Edit";
import { useAlert } from "react-alert";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { ref, update } from "firebase/database";
import { db } from "firebaseConfig";
import React from "react";
import { Link } from "react-router-dom";
const ItemContact = (props) => {
  const { id, name, email, time, isResponse } = props;
  const alert = useAlert();
  const handleToggleLock = (contactId, isResponse) => {
    const updates = {};
    updates[`contacts/${contactId}/isResponse`] = !isResponse;
    update(ref(db), updates)
      .then(() => {
        alert.success(`${isResponse ? "UnLock" : "Lock"} contact success`);
      })
      .catch((error) => {
        alert.error(`${isResponse ? "UnLock" : "Lock"} contact fail!`);
      });
  };
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell style={{ width: 300 }} align="left">
        {email}
      </TableCell>
      <TableCell align="right">{time}</TableCell>
      <TableCell align="right">
        {!isResponse && (
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
        )}
        <Tooltip title={isResponse ? "UnLock" : "Lock"} arrow>
          <IconButton
            onClick={() => {
              handleToggleLock(id, isResponse);
            }}
            color={isResponse ? "success" : "default"}
          >
            {isResponse ? (
              <MarkEmailReadOutlinedIcon />
            ) : (
              <MailOutlineOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default ItemContact;
