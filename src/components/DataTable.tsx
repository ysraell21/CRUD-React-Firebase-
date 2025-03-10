import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Alert,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { SentimentDissatisfied, Edit, Delete } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmployeeModal from "./EmployeeModal";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../config/firestore";
import { Employee, columns } from "./types";
import ViewEmployeeModal from "./ViewEmployeeModal";

const DataTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const fetchEmployees = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "employees"));
      const data = querySnapshot.docs
        .map((doc) => {
          const employeeData = doc.data() as Employee;
          return { id: doc.id, ...employeeData };
        })
        .sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0)); 
  
      setRows(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = React.useMemo(() => {
    return rows.filter((row) => {
      const normalizeText = (text: string) =>
        text.toLowerCase().replace(/\s+/g, " ").trim();

      const searchQueryLower = normalizeText(searchQuery);
      return (
        row.first_name.toLowerCase().includes(searchQueryLower) ||
        row.last_name.toLowerCase().includes(searchQueryLower) ||
        row.email.toLowerCase().includes(searchQueryLower) ||
        row.phone_number.toLowerCase().includes(searchQueryLower) ||
        row.department.toLowerCase().includes(searchQueryLower) ||
        row.address.toLowerCase().includes(searchQueryLower)
      );
    });
  }, [rows, searchQuery]);

  const handleRemoveEmployee = async (id: string) => {
    try {
      if (!id) return;
      await deleteDoc(doc(db, "employees", id));
      fetchEmployees();
    } catch (error) {
      <Alert severity="error">Error in Removing Employee</Alert>;
    }
  };

  const handleViewEmployee = async (id: string) => {
    try {
      const employeeRef = doc(db, "employees", id);
      const employeeSnap = await getDoc(employeeRef);

      if (employeeSnap.exists()) {
        const employeeData = {
          id: employeeSnap.id,
          ...employeeSnap.data(),
        } as Employee;
        setSelectedEmployee(employeeData);
        setIsViewModalOpen(true);
      } else {
        <Alert severity="error">No Employee Found</Alert>;
      }
    } catch (error) {
      <Alert severity="error">Error in Fetching Employee Details</Alert>;
    }
  };

  return (
    <>
      <Paper
        sx={{
          width: "90%",
          margin: "50px auto",
          padding: "10px",
          overflow: "hidden",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <TextField
            label="Search Employee"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "300px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSelectedEmployee(null);
              setIsModalOpen(true);
            }}
          >
            Add Employee
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#333",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  align="center"
                  style={{
                    backgroundColor: "#333",
                    color: "#fff",
                    fontWeight: "bold",
                    minWidth: 120,
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setSelectedEmployee(row);
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="success"
                          onClick={() => row.id && handleViewEmployee(row.id)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => row.id && handleRemoveEmployee(row.id)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    <SentimentDissatisfied
                      sx={{ fontSize: 60, color: "gray" }}
                    />
                    <Typography variant="h6" color="textSecondary">
                      No Data Available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <EmployeeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshData={fetchEmployees}
        employee={selectedEmployee}
      />
      <ViewEmployeeModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        employee={selectedEmployee}
      />
    </>
  );
};

export default DataTable;
