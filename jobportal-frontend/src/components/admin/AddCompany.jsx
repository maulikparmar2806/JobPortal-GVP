import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { CustomLoader } from "../CustomLoader";
import { validateCompanyForm } from "../../validation/companyValidation";

export const AddCompany = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    linkedinLink: "",
    websiteLink: "",
    email: "",
    specializing: "",
    street: "",
    landmark: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    logoFile: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleBlur = (field) => {
    const fieldError = validateCompanyForm({ ...formData })[field];
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: fieldError,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateCompanyForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        "http://localhost:8080/admin/dashboard/manage-company",
        {
          method: "POST",
          body: submissionData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setAlertMessage(errorData.message || "Error submitting data");
        setAlertSeverity("error");
        setOpen(true);
        setLoading(false);
        return;
      }

      setAlertMessage("Data submitted successfully");
      setAlertSeverity("success");
      setOpen(true);
      setLoading(false);

      // Reset form
      setFormData({
        companyName: "",
        companyDescription: "",
        linkedinLink: "",
        websiteLink: "",
        email: "",
        specializing: "",
        street: "",
        landmark: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
        logoFile: null,
      });
    } catch (error) {
      setAlertMessage("Error submitting data");
      setAlertSeverity("error");
      setOpen(true);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, logoFile: file });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center">
          <CustomLoader />
        </div>
      ) : (
        <Container>
          <Grid container justifyContent="center" style={{ width: "130%" }} spacing={3} mt={3}>
            <Grid item xs={12} md={10}>
              <Card
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: 2,
                }}
              >
                <CardHeader title="Add Company Details" />
                <CardContent>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid container spacing={3}>
                      {/* Company Name */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Company Name"
                          variant="outlined"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          onBlur={() => handleBlur("companyName")}
                          error={!!errors.companyName}
                          helperText={errors.companyName}
                        />
                      </Grid>

                      {/* Company Description */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Company Description"
                          variant="outlined"
                          name="companyDescription"
                          multiline
                          rows={3}
                          value={formData.companyDescription}
                          onChange={handleChange}
                          onBlur={() => handleBlur("companyDescription")}
                          error={!!errors.companyDescription}
                          helperText={errors.companyDescription}
                        />
                      </Grid>

                      {/* LinkedIn Link */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="LinkedIn Link"
                          variant="outlined"
                          name="linkedinLink"
                          value={formData.linkedinLink}
                          onChange={handleChange}
                        />
                      </Grid>

                      {/* Website Link */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Website Link"
                          variant="outlined"
                          name="websiteLink"
                          value={formData.websiteLink}
                          onChange={handleChange}
                        />
                      </Grid>

                      {/* Email */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email"
                          variant="outlined"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur("email")}
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                      </Grid>

                      {/* Specializing In */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Specializing In"
                          variant="outlined"
                          name="specializing"
                          value={formData.specializing}
                          onChange={handleChange}
                        />
                      </Grid>

                      {/* Address Fields */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Street"
                          variant="outlined"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          onBlur={() => handleBlur("street")}
                          error={!!errors.street}
                          helperText={errors.street}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Landmark"
                          variant="outlined"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleChange}
                          onBlur={() => handleBlur("landmark")}
                          error={!!errors.landmark}
                          helperText={errors.landmark}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Area"
                          variant="outlined"
                          name="area"
                          value={formData.area}
                          onChange={handleChange}
                          onBlur={() => handleBlur("area")}
                          error={!!errors.area}
                          helperText={errors.area}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="City"
                          variant="outlined"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          onBlur={() => handleBlur("city")}
                          error={!!errors.city}
                          helperText={errors.city}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="State"
                          variant="outlined"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          onBlur={() => handleBlur("state")}
                          error={!!errors.state}
                          helperText={errors.state}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Pincode"
                          variant="outlined"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          onBlur={() => handleBlur("pincode")}
                          error={!!errors.pincode}
                          helperText={errors.pincode}
                        />
                      </Grid>

                      {/* Logo Upload */}
                      <Grid item xs={12}>
                        <label htmlFor="logo-upload">
                          <Button
                            variant="contained"
                            component="span"
                            sx={{
                              marginBottom: 2,
                              backgroundColor: "#4caf50",
                              color: "#fff",
                            }}
                          >
                            Upload Logo
                          </Button>
                          <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                        </label>
                        {formData.logoFile && <div>File selected: {formData.logoFile.name}</div>}
                      </Grid>

                      
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={24} /> : "Add"}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: "100%" }}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </Container>
      )}
    </>
  );
};
