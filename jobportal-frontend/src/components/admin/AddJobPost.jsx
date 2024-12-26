import React, { useState, useEffect } from "react";
import {
  Snackbar,
  Alert,
  Button,
  TextField,
  MenuItem,
  FormControl,
  Select,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CircularProgress,
} from "@mui/material";
import { CustomLoader } from "../CustomLoader";
import { validateJobPostForm } from "../../validation/jobpostValidation";

export const AddJobPost = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobPostImg: null,
    jobRequirementSkill: "",
    jobRole: "",
    jobVacancy: 1,
    jobType: "",
    jobSalary: "",
    companyId: "",
    lastApplicationDate: "",
  });
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/dashboard/manage-company");
        if (!response.ok) throw new Error("Failed to fetch companies");
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        setAlert({ open: true, message: "Failed to fetch companies", severity: "error" });
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear specific error on change
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (!["image/jpeg", "image/jpg", "image/png"].includes(fileType)) {
        setErrors((prev) => ({ ...prev, jobPostImg: "File must be JPG, JPEG, or PNG" }));
        setFormData((prev) => ({ ...prev, jobPostImg: null }));
      } else {
        setFormData((prev) => ({ ...prev, jobPostImg: file }));
        setErrors((prev) => ({ ...prev, jobPostImg: null }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateJobPostForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const data = createFormData();
      const response = await fetch("http://localhost:8080/admin/dashboard/manage-jobPost", {
        method: "POST",
        body: data,
      });
      if (!response.ok) throw new Error("Failed to add job post");

      setAlert({ open: true, message: "Data submitted successfully", severity: "success" });
      setFormData({
        jobTitle: "",
        jobDescription: "",
        jobPostImg: null,
        jobRequirementSkill: "",
        jobRole: "",
        jobVacancy: 1,
        jobType: "",
        jobSalary: "",
        companyId: "",
        lastApplicationDate: "",
      });
    } catch (error) {
      console.error("Error adding job post:", error);
      setAlert({ open: true, message: "Error submitting data", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const createFormData = () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    return data;
  };

  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {loading ? (
        <CustomLoader />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader
                title={<Typography variant="h5">Add Job Post</Typography>}
                className="bg-secondary text-white"
              />
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {/** Job Title */}
                    <Grid item xs={12}>
                      <TextField
                        name="jobTitle"
                        label="Job Title"
                        fullWidth
                        value={formData.jobTitle}
                        onChange={handleChange}
                        error={!!errors.jobTitle}
                        helperText={errors.jobTitle}
                      />
                    </Grid>

                    {/** Job Description */}
                    <Grid item xs={12}>
                      <TextField
                        name="jobDescription"
                        label="Job Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={formData.jobDescription}
                        onChange={handleChange}
                        error={!!errors.jobDescription}
                        helperText={errors.jobDescription}
                      />
                    </Grid>

                    {/** Job Image */}
                    <Grid item xs={12}>
                      <TextField
                        type="file"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={handleFileChange}
                        error={!!errors.jobPostImg}
                        helperText={errors.jobPostImg}
                      />
                    </Grid>

                    {/** Job Requirement Skills */}
                    <Grid item xs={12}>
                      <TextField
                        name="jobRequirementSkill"
                        label="Job Requirement Skills"
                        fullWidth
                        value={formData.jobRequirementSkill}
                        onChange={handleChange}
                        error={!!errors.jobRequirementSkill}
                        helperText={errors.jobRequirementSkill}
                      />
                    </Grid>

                    {/** Job Role */}
                    <Grid item xs={12}>
                      <TextField
                        name="jobRole"
                        label="Job Role"
                        fullWidth
                        value={formData.jobRole}
                        onChange={handleChange}
                        error={!!errors.jobRole}
                        helperText={errors.jobRole}
                      />
                    </Grid>

                    {/** Job Vacancy */}
                    <Grid item xs={12}>
                      <TextField
                        name="jobVacancy"
                        label="Job Vacancy"
                        type="number"
                        fullWidth
                        value={formData.jobVacancy}
                        onChange={(e) => setFormData((prev) => ({ ...prev, jobVacancy: parseInt(e.target.value) }))}
                        error={!!errors.jobVacancy}
                        helperText={errors.jobVacancy}
                      />
                    </Grid>

                    {/** Job Type */}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Select
                          name="jobType"
                          value={formData.jobType}
                          onChange={handleChange}
                          displayEmpty
                        >
                          <MenuItem value="">Select Job Type</MenuItem>
                          <MenuItem value="full-time">Full Time</MenuItem>
                          <MenuItem value="part-time">Part Time</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    {/** Job Salary */}
                    <Grid item xs={12}>
                      <TextField
                        name="jobSalary"
                        label="Job Salary (LPA)"
                        fullWidth
                        value={formData.jobSalary}
                        onChange={handleChange}
                        error={!!errors.jobSalary}
                        helperText={errors.jobSalary}
                      />
                    </Grid>

                    {/** Company Selection */}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <Select
                          name="companyId"
                          value={formData.companyId}
                          onChange={handleChange}
                          displayEmpty
                        >
                          <MenuItem value="">Select a company</MenuItem>
                          {companies.map((company) => (
                            <MenuItem key={company.id} value={company.id}>
                              {company.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/** Last Application Date */}
                    <Grid item xs={12}>
                      <TextField
                        name="lastApplicationDate"
                        label="Last Application Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={formData.lastApplicationDate}
                        onChange={handleChange}
                        error={!!errors.lastApplicationDate}
                        helperText={errors.lastApplicationDate}
                      />
                    </Grid>

                    {/** Submit Button */}
                    <Grid item xs={12}>
                      <Button variant="contained" type="submit" disabled={loading} fullWidth>
                        {loading ? <CircularProgress size={24} /> : "Submit"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/** Snackbar for alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
