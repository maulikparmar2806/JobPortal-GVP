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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Visibility, CheckCircle, Info } from "@mui/icons-material";

export const ApplicationView = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("A");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/applications"
        );
        setApplications(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleResumeClick = (resumeUrl) => {
    setSelectedResume(resumeUrl);
    setOpenDialog(true);
  };

  const handleDetailsClick = (application) => {
    setSelectedApplication(application);
    setDetailsDialogOpen(true);
  };

  const handleApproveRejectClick = (application) => {
    setSelectedApplication(application);
    setApprovalDialogOpen(true);
  };

  const handleApprovalStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleApproveRejectSubmit = async () => {
    if (!selectedApplication) return;
    console.log(selectedStatus);
    try {
      await axios.put(
        `http://localhost:8080/api/applications/status/${selectedApplication.applicationId}/${selectedStatus}`
      );
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.id === selectedApplication.id ? { ...app, status: selectedStatus } : app
        )
      );
      setApprovalDialogOpen(false);
      setSelectedApplication(null);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedResume(null);
  };

  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
    setSelectedApplication(null);
  };

  const handleApprovalDialogClose = () => {
    setApprovalDialogOpen(false);
    setSelectedApplication(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Application List
      </Typography>
      <TableContainer style={{ width: "75vw" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Application ID</TableCell>
              <TableCell>Job Post</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Resume</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.applicationId}>
                <TableCell>{application.applicationId}</TableCell>
                <TableCell>{application.jobPost.jobTitle}</TableCell>
                <TableCell>{application.jobPost.company.name}</TableCell>
                <TableCell>
                  {application.status === "P"
                    ? "Pending"
                    : application.status === "A"
                    ? "Approved"
                    : application.status === "R"
                    ? "Rejected"
                    : "Unknown"}
                </TableCell>
                <TableCell>
                  {application.resume && (
                    <Button
                      variant="outlined"
                      startIcon={<Visibility />}
                      onClick={() => handleResumeClick(application.resume)}
                    >
                      View
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<Info />}
                    onClick={() => handleDetailsClick(application)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CheckCircle />}
                    onClick={() => handleApproveRejectClick(application)}
                  >
                    Select
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Resume Preview</DialogTitle>
        <DialogContent>
          {selectedResume && (
            <img src={selectedResume} alt="Resume" style={{ width: "80vw" }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={detailsDialogOpen} onClose={handleDetailsDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Application Details</DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <>
              <Typography variant="h6">Name: {selectedApplication.name}</Typography>
              <Typography variant="body1">Email: {selectedApplication.email}</Typography>
              <Typography variant="body1">Contact: {selectedApplication.contact}</Typography>
              <Typography variant="body1">Job Post: {selectedApplication.jobPost.jobTitle}</Typography>
              <Typography variant="body1">Company: {selectedApplication.jobPost.company.name}</Typography>
              <Typography variant="body1">Application Date: {selectedApplication.applicationDate}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailsDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={approvalDialogOpen} onClose={handleApprovalDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Approve or Reject Application</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Action</FormLabel>
            <RadioGroup value={selectedStatus} onChange={handleApprovalStatusChange}>
              <FormControlLabel value="A" control={<Radio />} label="Approve" />
              <FormControlLabel value="R" control={<Radio />} label="Reject" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApproveRejectSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={handleApprovalDialogClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
