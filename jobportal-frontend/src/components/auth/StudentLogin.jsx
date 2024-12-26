import React, { useContext, useState } from "react";
import logo from "../../assets/images/gvp_logo.jpg";
import { useNavigate } from "react-router-dom";
import { studentLoginForm } from "../../Services/Student";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { CustomLoader } from "../CustomLoader";
import { AuthContext } from "./AuthContext";
import { validateStudentLoginForm } from "../../validation/authValidations";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const StudentLogin = () => {
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [open, setOpen] = useState(false); // State for alert
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const validationError = validateStudentLoginForm(course, email, password);
    if (validationError) {
      setDialogMessage(validationError);
      setDialogOpen(true);
      return;
    }
    try {
      setLoading(true);
      const data = {
        email,
        password,
        course,
      };
  
      const response = await studentLoginForm(data);
  
      if (response.status === 200) {
        setLoading(false);
        setAlertMessage("Login successful");
        setAlertSeverity("success");
        setOpen(true);
        login();
        setUser(response.data);
        navigate("/student/dashboard/MyProfile");
      } else {
        setLoading(false);
        setAlertMessage("Invalid Credentials");
        setAlertSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized error
        setAlertMessage("Unauthorized: Invalid email or password");
      } else {
        // This handles unexpected scenarios, though in most cases, 401 is the expected error.
        setAlertMessage("Login failed due to a server error or unexpected issue");
      }
      setAlertSeverity("error");
      setOpen(true);
      console.error("Login failed:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="card border border-success">
                  <div className="card-header text-center " style={{ backgroundColor: '#388e3c' }}>
                    <h3 className="text-white">Job Portal Gujarat Vidyapith</h3>
                  </div>
                  <div className="card-body">
                    <div className="text-center mt-1 mb-4">
                      <h5>Welcome to Job Portal</h5>
                    </div>
                    <div className="text-center">
                      <img src={logo} alt="logo" width="150" />
                    </div>
                    <h4 className="text-center text-muted mb-3">Student Login</h4>
                    <form onSubmit={handleLogin}>
                      <div className="mb-2 d-flex justify-content-center">
                        <TextField
                          select
                          fullWidth
                          style={{ maxWidth: "300px" }}
                          variant="outlined"
                          label="Choose Course"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          SelectProps={{
                            native: true,
                          }}
                        >
                          <option value="">Choose Course</option>
                          <option value="MCA">MCA</option>
                          <option value="MBA">MBA</option>
                          <option value="PGDCA">PGDCA</option>
                        </TextField>
                      </div>
                      <div className="mb-2 d-flex justify-content-center">
                        <TextField
                          fullWidth
                          style={{ maxWidth: "300px" }}
                          variant="outlined"
                          label="Enter Username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="mb-2 d-flex justify-content-center">
                        <TextField
                          fullWidth
                          style={{ maxWidth: "300px" }}
                          variant="outlined"
                          label="Enter Password"
                          type={passwordVisible ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility}>
                                  {passwordVisible ? (
                                    <VisibilityOff style={{ color: "green" }} />
                                  ) : (
                                    <Visibility style={{ color: "green" }} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      <div className="mb-3 text-end">
                        <Link to="/auth/forgot-password/" className="text-secondary" style={{ textDecoration: "none" }}>
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="mb-2 text-center">
                        <Button type="submit" variant="contained" color="success" fullWidth  style={{ maxWidth: "210px" }} >
                          Login
                        </Button>
                      </div>
                      <div className="text-center">
                        <p>
                          Don't have an account?{" "}
                          <Link to="/auth/student/registration">Register</Link>
                        </p>
                      </div>
                      <div className="text-left">
                        <Link to="/" className="text-secondary" style={{ textDecoration: "none" }}>
                          Admin Login
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
