import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Divider from "@mui/material/Divider";
import axios from "axios";

export const ResetPasswordDialog = ({ open, handleClose, email, sender }) => {
  // console.log(email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!oldPassword) {
      setAlert({
        show: true,
        type: "error",
        message: "Please enter your old password.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlert({
        show: true,
        type: "error",
        message: "Passwords do not match!",
      });
      return;
    }

    // Determine the API endpoint based on the sender
    const apiUrl =
      sender === "admin"
        ? "http://localhost:8080/api/admin/reset-password"
        : "http://localhost:8080/api/students/reset-password/";

    try {
      // API call to reset password
      const response = await axios.post(apiUrl+email+"/"+newPassword);
      if (response.status === 200) {
        setAlert({
          show: true,
          type: "success",
          message: "Password reset successful!",
        });
        handleClose();
      }
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(e, reason) => {
        if (reason === "backdropClick") return;
        handleClose();
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle color="primary">Reset Password</DialogTitle>
      <Divider />
      <DialogContent>
        {alert.show && (
          <Alert severity={alert.type} sx={{ width: "100%", mb: 2 }}>
            <AlertTitle>
              {alert.type === "error" ? "Error" : "Success"}
            </AlertTitle>
            {alert.message}
          </Alert>
        )}
        <TextField
          label="Old Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          variant="outlined"
          style={{ marginRight: "auto" }}
        >
          Close
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="outlined">
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
};
