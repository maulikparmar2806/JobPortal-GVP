import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
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
  TextField,
  Typography,
} from "@mui/material";
import { CommonAlert } from "../CommonAlert";
export const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    students: 0,
    companies: 0,
    jobPosts: 0,
    applications: 0,
    pendingApplications: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    time: "",
    location: "",
  });
  const [alert, setAlert] = useState({ open: false, severity: "success", message: "" });
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const studentResponse = await axios.get(
          "http://localhost:8080/api/students/count"
        );
        const companyResponse = await axios.get(
          "http://localhost:8080/admin/dashboard/manage-company/count"
        );
        const jobPostResponse = await axios.get(
          "http://localhost:8080/admin/dashboard/manage-company/count"
        );
        const applicationResponse = await axios.get(
          "http://localhost:8080/api/applications"
        );
        const pendingApplications = applicationResponse.data.filter(
          (application) => application.interviewDetails === null
        );

        setMetrics({
          students: studentResponse.data,
          companies: companyResponse.data,
          jobPosts: jobPostResponse.data,
          applications: applicationResponse.data.length,
          pendingApplications,
        });
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchMetrics();
  }, []);

  const handleApproveClick = (application) => {
    setSelectedApplication(application);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedApplication(null);
    setInterviewDetails({ date: "", time: "", location: "" });
  };

  const handleInterviewDetailChange = (e) => {
    const { name, value } = e.target;
    setInterviewDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleApprove = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/applications/${selectedApplication.applicationId}/schedule-interview`,
        interviewDetails // Pass only interviewDetails as the payload
      );
  
      // Update the pending applications in the metrics state
      setMetrics((prevMetrics) => ({
        ...prevMetrics,
        pendingApplications: prevMetrics.pendingApplications.filter(
          (app) => app.applicationId !== selectedApplication.applicationId
        ),
      }));
      setAlert({ open: true, severity: "success", message: "Interview scheduled and application approved successfully" });
      handleDialogClose();
    } catch (err) {
      setAlert({ open: true, severity: "error", message: "Failed to approve application" });  
      console.error(err.message);
    }
  };
  

  return (
    <div className="container">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        {/* Number of Registered Students */}
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div>
                  <i className="fas fa-users fa-3x"></i>
                </div>
                <div className="text-right">
                  <h2>{metrics.students}</h2>
                  <p>Registered Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Number of Companies */}
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-building fa-3x"></i>
                </div>
                <div className="text-right">
                  <h2>{metrics.companies}</h2>
                  <p>Companies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Number of Job Posts */}
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-warning text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-briefcase fa-3x"></i>
                </div>
                <div className="text-right">
                  <h2>{metrics.jobPosts}</h2>
                  <p>Job Posts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Number of Applications */}
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card bg-danger text-white h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-file-alt fa-3x"></i>
                </div>
                <div className="text-right">
                  <h2>{metrics.applications}</h2>
                  <p>Applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Applications */}
        <div className="col-lg-12 mb-4">
          <div
            className="card"
            style={{
              width: "75vw",
              maxHeight:
                metrics.pendingApplications.length > 0 ? "190px" : "auto",
              overflowY:
                metrics.pendingApplications.length > 0 ? "scroll" : "hidden",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Pending Applications</h5>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Application ID</TableCell>
                      <TableCell>Job Post</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell>Resume</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metrics.pendingApplications.map((application) => (
                      <TableRow key={application.applicationId}>
                        <TableCell>{application.applicationId}</TableCell>
                        <TableCell>{application.jobPost.jobTitle}</TableCell>
                        <TableCell>
                          {application.jobPost.company.name}
                        </TableCell>
                        <TableCell>
                          {application.resume && (
                            <Button
                              variant="outlined"
                              href={application.resume}
                              target="_blank"
                            >
                              View
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleApproveClick(application)}
                          >
                            Interview Schedule
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Set Interview Details</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Interview Date"
            type="date"
            fullWidth
            name="date"
            value={interviewDetails.date}
            onChange={handleInterviewDetailChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Interview Time"
            type="time"
            fullWidth
            name="time"
            value={interviewDetails.time}
            onChange={handleInterviewDetailChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Interview Location"
            type="text"
            fullWidth
            name="location"
            value={interviewDetails.location}
            onChange={handleInterviewDetailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApprove} color="primary">
          Interview Schedule
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
};
