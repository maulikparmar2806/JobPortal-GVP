import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useOutletContext } from "react-router-dom";
import axios from 'axios';

export const AddAdmin = () => {
  const { showAlert } = useOutletContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      showAlert("Passwords do not match!", "error");
      return;
    }

    // Prepare data for API
    const adminData = { username, password,profilePicture:null };

    try {
      // Call the backend API to create a new admin
      const response = await axios.post('http://localhost:8080/api/admin/create', adminData);

      if (response.status === 200) {
        showAlert("Admin added successfully!", "success");
        setUsername(''); // Clear form fields
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      showAlert("Failed to add admin!", "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 5,
          p: 3,
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Add New Admin
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Add Admin
        </Button>
      </Box>
    </Container>
  );
};
