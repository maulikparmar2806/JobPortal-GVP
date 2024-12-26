import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { CustomLoader } from "../CustomLoader";

export const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    mobileNumber: "",
    addressTemporary: "",
    addressPermanent: "",
    city: "",
    course: "",
    profilePicture: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); // State for server-side errors
  const [sameAddress, setSameAddress] = useState(false); // State for checkbox
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [open, setOpen] = useState(false); // State for alert
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    const emailPattern = /^[0-9]{6,10}\.gvp@gujaratvidyapith\.org$/;
    const mobilePattern = /^[0-9]{10}$/;

    if (!formData.firstName || formData.firstName.length > 15) {
      newErrors.firstName =
        "First Name is required and must be less than 15 characters";
    }
    if (!formData.lastName || formData.lastName.length > 15) {
      newErrors.lastName =
        "Last Name is required and must be less than 15 characters";
    }
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email =
        "Email ID must match the pattern 212308020.gvp@gujaratvidyapith.org";
    }
    if (!formData.password || formData.password.length > 10) {
      newErrors.password =
        "Password is required and must be less than 8 characters";
    }
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.mobileNumber || !mobilePattern.test(formData.mobileNumber)) {
      newErrors.mobileNumber =
        "Mobile Number is required and must be 10 digits";
    }
    if (!formData.addressTemporary || formData.addressTemporary.length > 150) {
      newErrors.addressTemporary =
        "Temporary Address is required and must be less than 150 characters";
    }
    if (formData.addressPermanent && formData.addressPermanent.length > 150) {
      newErrors.addressPermanent =
        "Permanent Address must be less than 150 characters";
    }
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.course) newErrors.course = "Course is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setSameAddress(e.target.checked);
    if (e.target.checked) {
      setFormData((prevData) => ({
        ...prevData,
        addressPermanent: prevData.addressTemporary,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        addressPermanent: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      ...formData,
      onCreate: new Date().toISOString(),
      onUpdate: new Date().toISOString(),
    };

    try {
      console.log(data);
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        setServerError(errorData.message);
        setAlertMessage(errorData.message);
        setAlertSeverity("error");
        setOpen(true);
        return;
      }

      const result = await response.json();

      setAlertMessage("Data submitted successfully");
      setAlertSeverity("success");
      setOpen(true);
      navigate("/auth/student/" + result.url);
    } catch (error) {
      setLoading(false); // Set loading to false when an error occurs
      console.error("Error:", error);
      setServerError("Error submitting data");
      setAlertMessage("Error submitting data");
      setAlertSeverity("error");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container mt-2">
      <h1 className="text-center mb-4">Job Portal Registration Form</h1>
      {/* {serverError && (
        <div class="alert alert-danger " role="alert">
          <strong> {serverError}</strong>
        </div>
      )} */}
      {loading ? (
        <CustomLoader />
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row d-flex gap-2 m-2">
            <div className="form-group col-md-6">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && (
                <small className="text-danger">{errors.firstName}</small>
              )}
            </div>
            <div className="form-group col-md-6 ">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && (
                <small className="text-danger">{errors.lastName}</small>
              )}
            </div>
          </div>
          <div className="form-row d-flex gap-2 m-2">
            <div className="form-group col-md-6">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>

            <div className="form-group d-flex gap-2 mt-1">
              <label>Gender</label>
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="radio"
                  id="male"
                  name="gender"
                  value="M"
                  checked={formData.gender === "M"}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="radio"
                  id="female"
                  name="gender"
                  value="F"
                  checked={formData.gender === "F"}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              <div className="form-check mt-4">
                <input
                  className="form-check-input"
                  type="radio"
                  id="other"
                  name="gender"
                  value="O"
                  checked={formData.gender === "O"}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
          </div>
          {errors.gender && (
            <small
              className="text-danger "
              style={{ position: "relative", left: "51%", bottom: "30px" }}
            >
              {errors.gender}
            </small>
          )}
          <div className="form-row d-flex gap-2 m-2">
            <div className="form-group col-md-6">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
              {errors.mobileNumber && (
                <small className="text-danger">{errors.mobileNumber}</small>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="addressTemporary">Temporary Address</label>
            <textarea
              className="form-control"
              id="addressTemporary"
              name="addressTemporary"
              value={formData.addressTemporary}
              onChange={handleChange}
              required
            />
            {errors.addressTemporary && (
              <small className="text-danger">{errors.addressTemporary}</small>
            )}
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="sameAddress"
              checked={sameAddress}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="sameAddress">
              Permanent address is the same as temporary address
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="addressPermanent">Permanent Address</label>
            <textarea
              className="form-control"
              id="addressPermanent"
              name="addressPermanent"
              value={formData.addressPermanent}
              onChange={handleChange}
              disabled={sameAddress}
              required={!sameAddress}
            />
            {errors.addressPermanent && (
              <small className="text-danger">{errors.addressPermanent}</small>
            )}
          </div>

          <div className="form-row d-flex gap-2 m-2">
            <div className="form-group col-md-6">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && (
                <small className="text-danger">{errors.city}</small>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="course">Course</label>
              <select
                className="form-control"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>
                <option value="MCA">MCA</option>
                <option value="PGDCA">PGDCA</option>
                <option value="BCA">BCA</option>
              </select>
              {errors.course && (
                <small className="text-danger">{errors.course}</small>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success btn-block mt-3 w-50 mb-4"
            style={{ marginLeft: "25%" }}
          >
            Register
          </button>
        </form>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
