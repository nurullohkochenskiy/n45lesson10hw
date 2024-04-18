import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, TableHead, Typography } from "@mui/material";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import TransitionsModal from "./TeachersModal";
import { deleteTeacher, getTeacher } from "../app/teachers/teachersSlice";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(order, id, firstname, lastname, level, groups) {
  return { order, id, firstname, lastname, level, groups };
}

export default function Teacherlist({ filteringItems }) {
  const [selectedTeacherId, setSelectedTeacherId] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { teachers, filtered } = useSelector((state) => state.teachers);
  const allRows = teachers.map((teacher, index) => {
    const { id, firstname, lastname, level, groups } = teacher;
    return createData(index, id, firstname, lastname, level, groups);
  });
  const filteredRows = filtered.length
    ? filtered.map((teacher, index) => {
        const { id, firstname, lastname, level, groups } = teacher;
        return createData(index, id, firstname, lastname, level, groups);
      })
    : [];
  const { filteredStatus } = useSelector((state) => state.teachers);
  const rows = filteredStatus ? filteredRows : allRows;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const dispatch = useDispatch();
  const handleDeletebtn = (id) => {
    dispatch(deleteTeacher(id));
  };
  const handleEditClick = (e) => {
    setSelectedTeacherId(e.currentTarget.id);
    dispatch(getTeacher(e.currentTarget.id));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Firstname</StyledTableCell>
            <StyledTableCell>Lastname</StyledTableCell>
            <StyledTableCell>Level</StyledTableCell>
            <StyledTableCell>Groups</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell style={{ width: "50px" }}>{row.order + 1}</TableCell>
              <TableCell style={{ width: "160px" }} component="th" scope="row">
                {row.firstname}
              </TableCell>
              <TableCell style={{ width: "200px" }} component="th" scope="row">
                {row.lastname}
              </TableCell>
              <TableCell>{row.level}</TableCell>
              <TableCell>{row.groups.join(",")}</TableCell>
              <TableCell align="right">
                <Box display={"flex"} justifyContent={"flex-end"}>
                  <div onClick={handleEditClick} id={row.id}>
                    {" "}
                    <TransitionsModal
                      id={selectedTeacherId}
                      typeModal={"edit"}
                      namebtn={"Edit"}
                    />
                  </div>

                  <Button
                    sx={{ ml: 1 }}
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeletebtn(row.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
          {rows.length < 1 && (
            <Typography padding={5}>No data found</Typography>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
