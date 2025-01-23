import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    h3: {
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
    },
  },
});

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now().toString() };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)));
    setEditingStudent(null);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const editStudent = (student) => {
    setEditingStudent(student);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Student Management System
          </Typography>
          <StudentForm addStudent={addStudent} updateStudent={updateStudent} editingStudent={editingStudent} />
          <StudentTable students={students} deleteStudent={deleteStudent} editStudent={editStudent} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
