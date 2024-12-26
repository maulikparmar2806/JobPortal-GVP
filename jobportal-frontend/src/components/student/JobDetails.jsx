import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import defaultLogo from "../../assets/images/gvp_logo.jpg";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
  Button,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export const JobDetails = () => {
  const { jobId } = useParams();
  const { user } = useContext(UserContext); // Using UserContext to get the user data
  const [job, setJob] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    resume: "",
  });
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageToZoom, setImageToZoom] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/dashboard/manage-jobPost/${jobId}`)
      .then((response) => setJob(response.data))
      .catch((error) => console.error("Error fetching job details:", error));
  }, [jobId]);

  const handleApplyClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirmApply = () => {
    setOpenConfirmDialog(false);
    setOpenFormDialog(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const applicationData = new FormData();
    applicationData.append("studentId", user?.studentId || ""); // Include studentId from user context
    applicationData.append("jobPostId", jobId); // Include jobPostId
    applicationData.append("name", formData.name);
    applicationData.append("email", formData.email);
    applicationData.append("contact", formData.contact);
    applicationData.append("resume", formData.resume);
    applicationData.append("status", "P"); // default status
    for (let [key, value] of applicationData.entries()) {
      console.log(`${key}: ${value}`);
    }
    axios
      .post("http://localhost:8080/api/applications", applicationData)
      .then((response) => {
        setOpenFormDialog(false);
        setOpenSuccessSnackbar(true);
      })
      .catch((error) => console.error("Error submitting application:", error));
  };

  const handleImageClick = (image) => {
    setImageToZoom(image);
    setOpenImageDialog(true);
  };

  if (!job) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  const generateGoogleMapsLink = () => {
    const fullAddress = `${job.company.street}, ${job.company.city}, ${job.company.state}, ${job.company.country} - ${job.company.pincode}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      fullAddress
    )}`;
  };

  return (
    <Container>
      <Box my={4}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Job Details
                </Typography>
                <Box mt={2}>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <img
                      src={job.jobPostImg || defaultLogo}
                      alt="Job Post"
                      style={{ maxWidth: "50%", cursor: "pointer" }}
                      onClick={() =>
                        handleImageClick(job.jobPostImg || defaultLogo)
                      }
                    />
                  </Box>
                  <Typography variant="body1">
                    <strong>Job Title:</strong> {job.jobTitle}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Job Description:</strong> {job.jobDescription}
                  </Typography>
                </Box>

                <Box mt={2} display="flex" justifyContent="space-between">
                  <Typography variant="body2">
                    <strong>Role:</strong> {job.jobRole}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Type:</strong> {job.jobType}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Salary:</strong> {job.jobSalary}
                  </Typography>
                </Box>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Typography variant="body2">
                    <strong>Required Skills:</strong> {job.jobRequirementSkill}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Last Application Date:</strong>{" "}
                    {job.lastApplicationDate}
                  </Typography>
                </Box>

                <Box mt={3} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleApplyClick}
                  >
                    Apply for the Job
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Company Details
                </Typography>
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={job.company.logo || defaultLogo}
                    alt={`${job.company.name} logo`}
                    sx={{
                      width: 80,
                      height: 80,
                      marginRight: 2,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleImageClick(job.company.logo || defaultLogo)
                    }
                  />
                  <Box>
                    <Typography variant="h6">{job.company.name}</Typography>
                    <Typography variant="body1">
                      {job.company.description}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Specializing in:</strong>{" "}
                      {job.company.specializing}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Email:</strong>
                      <Link
                        href={`mailto:${job.company.email}`}
                        color="inherit"
                      >
                        {job.company.email}
                      </Link>
                    </Typography>
                  </Box>
                </Box>

                <Box mt={2} display="flex" flexDirection="column">
                  <Typography variant="body2">
                    <strong>Address:</strong>
                    <Link
                      href={generateGoogleMapsLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="inherit"
                    >
                      {`${job.company.street}, ${job.company.city}, ${job.company.state}, ${job.company.country} - ${job.company.pincode}`}
                    </Link>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Website:</strong>
                    <Link
                      href={job.company.websiteLink}
                      target="_blank"
                      rel="noopener"
                      color="inherit"
                    >
                      {job.company.websiteLink}
                    </Link>
                  </Typography>
                  <Typography variant="body2">
                    <strong>LinkedIn:</strong>
                    <Link
                      href={job.company.linkedinLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="inherit"
                    >
                      {job.company.linkedinLink}
                    </Link>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Application</DialogTitle>
        <DialogContent>Are you sure you want to apply?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmApply} color="primary" autoFocus>
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openFormDialog} onClose={() => setOpenFormDialog(false)}>
        <DialogTitle>Job Application</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              name="contact"
              label="Contact"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.contact}
              onChange={handleFormChange}
            />
            <TextField
              margin="dense"
              name="resume"
              label="Resume"
              type="file"
              fullWidth
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formData, resume: e.target.files[0] })
              }
              InputLabelProps={{ shrink: true }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit Application
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <Alert onClose={() => setOpenSuccessSnackbar(false)} severity="success">
          Application submitted successfully!
        </Alert>
      </Snackbar>

      <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)}>
        <img
          src={imageToZoom}
          alt="Zoomed"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Dialog>
    </Container>
  );
};
