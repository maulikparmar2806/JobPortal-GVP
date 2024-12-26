import React, { useState, useContext,useEffect } from "react";
import logo from "../../assets/images/gvp_logo.jpg";
import { AdminLoginForm } from "../../Services/Admin";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CustomLoader } from "../CustomLoader";
import "../../css/AdminLogin.css";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { validateLoginForm } from "../../validation/authValidations";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const message = localStorage.getItem("logoutMessage");
    if (message) {
      setAlertMessage(message);
      setAlertSeverity("success");
      setOpen(true);
      localStorage.removeItem("logoutMessage"); // Clear the message after displaying
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const validationError = validateLoginForm(username, password);
    if (validationError) {
      setDialogMessage(validationError);
      setDialogOpen(true);
      return;
    }
    setLoading(true);
    try {
      const data = {
        username,
        password,
      };
  
      const response = await AdminLoginForm(data);
      setLoading(false);
  
      if (response.status === 200 && response.data) {
        setAlertMessage("Login successful");
        setAlertSeverity("success");
        setOpen(true);
        login();
        setUser(response.data); // Set the user data in context
        navigate("/admin/dashboard/dashboard");
      } else {
        // This handles unexpected scenarios, though in most cases, 401 is the expected error.
        setAlertMessage("Login failed due to an unexpected issue");
        setAlertSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized error
        setAlertMessage("Unauthorized: Invalid username or password");
      } else {
        // This handles unexpected scenarios, though in most cases, 401 is the expected error.
        setAlertMessage("Login failed due to a server error or unexpected issue");
      }
      setAlertSeverity("error");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {loading ? (
        <CustomLoader />
      ) : (
        <div className="d-flex justify-content-center align-items-center ">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="card border border-success">
                  <div className="card-header text-center" style={{ backgroundColor: '#388e3c' }}>
                    <h3 className="text-white">Job Portal Gujarat Vidyapith</h3>
                  </div>
                  <div className="card-body">
                    <div className="text-center mt-1 mb-4">
                      <h5>Welcome to Job Portal</h5>
                    </div>
                    <div className="text-center">
                      <img src={logo} alt="logo" width="150" />
                    </div>
                    <h4 className="text-center text-muted mb-4">Admin Login</h4>
                    <form action="/admin/dashboard/" onSubmit={handleLogin}>
                      <div className="mb-3 d-flex justify-content-center">
                        <TextField
                          variant="outlined"
                          label="Enter Username"
                          id="username"
                          name="username"
                          // placeholder="Enter Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          fullWidth
                          style={{ maxWidth: "300px" }}
                        />
                      </div>
                      <div className="mb-3 d-flex justify-content-center">
                        <TextField
                          variant="outlined"
                          label="Enter Password"
                          type={passwordVisible ? "text" : "password"}
                          id="password"
                          name="password"
                          // placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          fullWidth
                          style={{ maxWidth: "300px" }}
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
                        <Link
                          to="/auth/forgot-password/"
                          className="text-secondary"
                          style={{ textDecoration: "none" }}
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="mb-3 text-center">
                      <div className="mb-2 text-center">
                        <Button type="submit" variant="contained" color="success" fullWidth  style={{ maxWidth: "210px" }} >
                          Login
                        </Button>
                      </div>
                      </div>
                      <div className="text-left">
                        <Link
                          to="auth/student/login"
                          className="text-secondary"
                          style={{ textDecoration: "none" }}
                        >
                          Student Login
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
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            varient="contained"
            onClick={handleDialogClose}
            color="error"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
