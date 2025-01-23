import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from "@mui/material" ;

function StudentTable({ students, deleteStudent, editStudent }) {
  if (students.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No students added yet.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="student table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>Hobbies</TableCell>
            <TableCell sx={{ whiteSpace: "nowrap", textAlign: "center" }}>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>{student.year}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                {student.hobbies.length > 0 ? student.hobbies.join(", ") : "-"}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>{student.address}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    onClick={() => editStudent(student)}
                    variant="outlined"
                    color="primary"
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteStudent(student.id)}
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentTable;
