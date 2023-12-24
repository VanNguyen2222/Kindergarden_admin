import React, { useContext, useEffect, useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AutoComplete from "components/AutoComplete";
import { IconButton } from "@mui/material";
import { ContactsContext } from "../../../../context/ContactsProvider";
import ItemContact from "../ItemContact";
const ListContacts = (props) => {
  const contacts = useContext(ContactsContext);
  const [name, setName] = useState("");
  const [inputName, setInputName] = useState("");
  const [order, setOrder] = useState({ by: "name", isAsc: true });
  const [filteredContacts, setFilteredContacts] = useState([]);

  const nameOptions = useMemo(
    () => contacts?.map((course) => course.name),
    [contacts]
  );

  useEffect(() => {
    if (contacts) {
      let newcontacts = [...contacts];
      if (inputName.length > 0) {
        newcontacts = newcontacts.filter((contact) =>
          contact.name.toUpperCase().includes(inputName.toUpperCase())
        );
      }
      newcontacts.sort((a, b) =>
        a[order.by] >= b[order.by]
          ? order.isAsc
            ? 1
            : -1
          : order.isAsc
          ? -1
          : 1
      );
      setFilteredContacts([...newcontacts]);
    } else setFilteredContacts([]);
  }, [contacts, inputName, order]);

  const handleChangeOrder = (by) => {
    if (order.by === by) setOrder({ by, isAsc: !order.isAsc });
    else {
      setOrder({ by, isAsc: true });
      console.log(name);
    }
  };

  return (
    <>
      {nameOptions && (
        <AutoComplete
          label="Search"
          options={nameOptions}
          getValue={setName}
          getInputValue={setInputName}
        />
      )}
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
              <TableCell align="left">Email</TableCell>

              <TableCell align="right">
                Time
                <IconButton
                  onClick={() => handleChangeOrder("time")}
                  color="primary"
                >
                  <SortByAlphaIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts &&
              filteredContacts.map((contact) => (
                <ItemContact key={contact.id} {...contact} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListContacts;
