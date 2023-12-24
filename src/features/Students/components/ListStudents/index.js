import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableFooter, TableHead,
  TableRow,
  TextField
} from "@mui/material";
import TablePaginationCustom from "components/TablePaginationCustom";
import { StudentsContext } from "context/StudentsProvider";
import React, { useContext, useEffect, useState } from "react";
import ItemStudent from "../ItemStudent";

function ListStudents(props) {
  const students = useContext(StudentsContext);

  const [name, setName] = useState("");
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChange = (event) => {
    setName(event.target.value.trim().toUpperCase());
  };

  const [filteredStudents, setFilteredStudents] = useState(students || [])

  useEffect(() => {
    if (students) {
      if (name.length >= 0) {
        setFilteredStudents(students.filter(s =>
          s.name.toUpperCase().includes(name) ||
          s.email.toUpperCase().includes(name) ||
          s.phoneNumber.toUpperCase().includes(name)))
      } else setFilteredStudents(students)
    }
  }, [name, students])

  return (
    <>
      <TextField
        id="outlined-name"
        label="Search value"
        value={name}
        onChange={handleChange}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents && (rowsPerPage > 0
              ? filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredStudents).map((student) => (
                <ItemStudent key={student.id} {...student} />
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePaginationCustom
                count={filteredStudents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListStudents;
