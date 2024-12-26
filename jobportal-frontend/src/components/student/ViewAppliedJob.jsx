// src/App.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { UserContext } from "../../context/UserContext"; // Adjust the path if necessary

export const ViewAppliedJob = () => {
  const { user } = useContext(UserContext); // Get the logged-in user
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/applications/student?studentId=${user.studentId}`
          ); // Adjust the endpoint as needed
          console.log("API Response:", response.data);
          if (Array.isArray(response.data)) {
            setApplications(response.data);
          } else {
            console.error("API did not return an array");
          }
        } catch (error) {
          console.error("Error fetching application details:", error);
        }
      }
    };

    fetchApplications();
  }, [user]);

  if (!user) {
    return (
      <Typography variant="h6">
        Please log in to view your applications.
      </Typography>
    );
  }

  return (
    <Container sx={{ width: "75vw", overflowX: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Application Details
      </Typography>
      <TableContainer component={Paper} sx={{ width: "70vw" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Application ID</TableCell>
              <TableCell>Job Post</TableCell>
              <TableCell>Company Name</TableCell>
              {/* <TableCell>Name</TableCell> */}
              <TableCell>Email</TableCell>
              {/* <TableCell>Contact</TableCell>
              <TableCell>Resume</TableCell> */}
              <TableCell>Application Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.length > 0 ? (
              applications.map((application) => (
                <TableRow key={application.applicationId}>
                  <TableCell>{application.applicationId}</TableCell>
                  {/* <TableCell>
                    {application.student.firstName +
                      " " +
                      application.student.lastName}
                  </TableCell>{" "} */}
                  {/* Adjust field as necessary */}
                  <TableCell>{application.jobPost.jobTitle}</TableCell>{" "}
                  <TableCell>{application.jobPost.company.name}</TableCell>{" "}
                  {/* Adjust field as necessary */}
                  {/* <TableCell>{application.name}</TableCell> */}
                  <TableCell>{application.email}</TableCell>
                  {/* <TableCell>{application.contact}</TableCell>
                  <TableCell>
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </TableCell> */}
                  <TableCell>{application.applicationDate}</TableCell>
                  <TableCell>
                    {application.status === "P"
                      ? "Pending"
                      : application.status === "A"
                      ? "Approved"
                      : "Rejected"}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
