import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Autocomplete,
  Box,
  Typography,
  Paper,
} from "@mui/material";

const courses = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology"];
const years = ["1st", "2nd", "3rd", "4th"];
const hobbies = ["Reading", "Sports", "Music", "Art", "Travel", "Cooking"];

function StudentForm({ addStudent, updateStudent, editingStudent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setCourse(editingStudent.course);
      setYear(editingStudent.year);
      setGender(editingStudent.gender);
      setSelectedHobbies(editingStudent.hobbies);
      setAddress(editingStudent.address);
      setPhoneNumber(editingStudent.phoneNumber);
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gender) {
      alert("Please select a gender.");
      return;
    }
    if (!address) {
      alert("Please enter an address.");
      return;
    }

    const studentData = { name, email, phoneNumber, course, year, gender, hobbies: selectedHobbies, address };
    if (editingStudent) {
      updateStudent({ ...studentData, id: editingStudent.id });
    } else {
      addStudent(studentData);
    }
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCourse("");
    setYear("");
    setGender("");
    setSelectedHobbies([]);
    setAddress("");
    setPhoneNumber("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {editingStudent ? "Edit Student Details" : "Add New Student"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <FormControl fullWidth variant="outlined" required>
          <InputLabel id="course-label">
            Course
          </InputLabel>
          <Select
            labelId="course-label"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            label="Course"
          >
            {courses.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" required>
          <InputLabel id="year-label">
            Year
          </InputLabel>
          <Select labelId="year-label" value={year} onChange={(e) => setYear(e.target.value)} label="Year">
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl component="fieldset" required>
          <Typography variant="body1" gutterBottom>
            Gender <span style={{ color: "gray" }}>*</span>
          </Typography>
          <RadioGroup row value={gender} onChange={(e) => setGender(e.target.value)}>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <Autocomplete
          multiple
          options={hobbies}
          value={selectedHobbies}
          onChange={(_, newValue) => setSelectedHobbies(newValue)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Hobbies" placeholder="Select hobbies" />
          )}
        />
        <TextField
          label="Address"
          multiline
          rows={4}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          {editingStudent ? "Update Student" : "Add Student"}
        </Button>
      </Box>
    </Paper>
  );
}

export default StudentForm;
