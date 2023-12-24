import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AutoComplete from "components/AutoComplete";
import { CoursesContext } from "context/CoursesProvider";
import { useContext, useEffect, useMemo, useState } from "react";
import ItemCourse from "../ItemCourse";
import { IconButton, TableFooter } from "@mui/material";
import TablePaginationCustom from "components/TablePaginationCustom";

export default function ListCourses(props) {
  const courses = useContext(CoursesContext);

  const [name, setName] = useState("");
  const [inputName, setInputName] = useState("");
  const [order, setOrder] = useState({ by: "name", isAsc: true });
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const nameOptions = useMemo(
    () => courses?.map((course) => course.name),
    [courses]
  );

  useEffect(() => {
    if (courses) {
      let newCourses = [...courses];
      if (inputName.length > 0) {
        newCourses = newCourses.filter((course) =>
          course.name.toUpperCase().includes(inputName.toUpperCase())
        );
      }
      newCourses.sort((a, b) =>
        a[order.by] >= b[order.by]
          ? order.isAsc
            ? 1
            : -1
          : order.isAsc
          ? -1
          : 1
      );
      setFilteredCourses([...newCourses]);
    } else setFilteredCourses([]);
  }, [courses, inputName, order]);

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
          label="Course name"
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
              <TableCell align="left">Description</TableCell>
              <TableCell align="right">
                Price
                <IconButton
                  onClick={() => handleChangeOrder("price")}
                  color="primary"
                >
                  <SortByAlphaIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                Time learning (month)
                <IconButton
                  onClick={() => handleChangeOrder("time")}
                  color="primary"
                >
                  <SortByAlphaIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">Total classes</TableCell>
              <TableCell align="right">State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses &&
              (rowsPerPage > 0
                ? filteredCourses.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredCourses
              ).map((course) => <ItemCourse key={course.id} {...course} />)}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePaginationCustom
                count={filteredCourses.length}
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
