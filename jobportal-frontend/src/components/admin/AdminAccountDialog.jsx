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
import axios from "axios"; // Import Axios for API requests

export const AdminAccountDialog = ({ open, handleClose, admin }) => {
  const [profileData, setProfileData] = useState({
    profilePicture: admin?.profilePicture || "",
  });
  const [selectedFile, setSelectedFile] = useState(null); // Track file input
  const [isUpdating, setIsUpdating] = useState(false); // Track the update process

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData({ ...profileData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("email", admin.username); // Assuming email is read-only and unchanged
    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/admin/profile/${admin.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile updated successfully:", response.data);
      // Optionally, update parent component state or show a success message
    } catch (error) {
      console.error("Error updating profile:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsUpdating(false);
      handleClose();
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
      maxWidth="sm"
    >
      <DialogTitle color="primary">My Account</DialogTitle>
      <Divider/>
      <DialogContent>
        <div className="d-flex align-items-center mb-3" style={{ textAlign: "center", flexDirection: "column" }}>
          <Avatar 
            alt={admin.username} 
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
              <UploadFileRoundedIcon />
            </IconButton>
          </label>
        </div>
        
        <TextField
          label="Your Email"
          value={admin?.username || ""}
          fullWidth
          margin="dense"
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleClose} 
          color="primary" 
          variant="outlined" 
          style={{ marginRight: "auto" }}
          disabled={isUpdating}
        >
          Close
        </Button>
        <Button 
          onClick={handleUpdateProfile} 
          color="primary" 
          variant="outlined" 
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
