import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";

export const StudentView = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/students");
        setStudents(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDetailsClick = (student) => {
    setSelectedStudent(student);
    setDetailsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${id}`);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.studentId !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
    setSelectedStudent(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container >
      <Typography variant="h4" gutterBottom>
        Student List
      </Typography>
      <TableContainer style={{ width: "75vw", overflow:"hidden" }}>
        <Table >
          <TableHead>
            <TableRow >
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.city}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => handleDetailsClick(student)}
                  >
                    View Profile
                  </Button>
                  </TableCell>
                  <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(student.studentId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={detailsDialogOpen}
        onClose={handleDetailsDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Student Details</DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <>
              <Typography variant="h6">
                Name:{" "}
                {`${selectedStudent.firstName} ${selectedStudent.lastName}`}
              </Typography>
              <Typography variant="body1">
                Email: {selectedStudent.email}
              </Typography>
              <Typography variant="body1">
                Gender: {selectedStudent.gender}
              </Typography>
              <Typography variant="body1">
                Mobile: {selectedStudent.mobileNumber}
              </Typography>
              <Typography variant="body1">
                Temporary Address: {selectedStudent.addressTemporary}
              </Typography>
              <Typography variant="body1">
                Permanent Address: {selectedStudent.addressPermanent}
              </Typography>
              <Typography variant="body1">
                City: {selectedStudent.city}
              </Typography>
              <Typography variant="body1">
                Course: {selectedStudent.course}
              </Typography>
              <Typography variant="body1">
                Profile Picture: {selectedStudent.profilePicture}
              </Typography>
              <Typography variant="body1">
                Created At: {selectedStudent.onCreate}
              </Typography>
              <Typography variant="body1">
                Updated At: {selectedStudent.onUpdate}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

//  default StudentView;
