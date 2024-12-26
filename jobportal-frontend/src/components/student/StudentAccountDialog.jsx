import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import Divider from '@mui/material/Divider';

export const StudentAccountDialog = ({ open, handleClose, user }) => {
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    gender: user?.gender || "",
    mobileNumber: user?.mobileNumber || "",
    addressTemporary: user?.addressTemporary || "",
    addressPermanent: user?.addressPermanent || "",
    city: user?.city || "",
    profilePicture: user?.profilePicture || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData({ ...profileData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    console.log("Updated profile data:", profileData);
    handleClose();
  };

  return (
    <Dialog open={open} 
    onClose={(e, reason) => {

        if (reason === "backdropClick") return;
        handleClose(); 
      }}
      
    
    
    fullWidth 
    maxWidth="sm">
      <DialogTitle color="primary">My Account</DialogTitle>
      <Divider/>
      <DialogContent>
        <div className="d-flex align-items-center mb-3" style={{ textAlign: "center", flexDirection: "column" }}>
          <Avatar
            alt={profileData.firstName}
            src={profileData.profilePicture}
            sx={{ width: 80, height: 80, marginBottom: "8px" }}
          />
          <input
            accept="image/*"
            id="profile-image-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="profile-image-upload">
            <IconButton color="primary" component="span">
            <UploadFileRoundedIcon/>
            </IconButton>
          </label>
        </div>

        <TextField
          label="First Name"
          name="firstName"
          value={profileData.firstName}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Last Name"
          name="lastName"
          value={profileData.lastName}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Email"
          value={user?.email || ""}
          fullWidth
          margin="dense"
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label="Gender"
          name="gender"
          value={profileData.gender}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Mobile Number"
          name="mobileNumber"
          value={profileData.mobileNumber}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Temporary Address"
          name="addressTemporary"
          value={profileData.addressTemporary}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Permanent Address"
          name="addressPermanent"
          value={profileData.addressPermanent}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="City"
          name="city"
          value={profileData.city}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Course"
          value={user?.course || ""}
          fullWidth
          margin="dense"
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined"  style={{ marginRight: "auto" }}>
          Close
        </Button>
        <Button onClick={handleUpdateProfile} color="primary"  variant="outlined">
          Update Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};
