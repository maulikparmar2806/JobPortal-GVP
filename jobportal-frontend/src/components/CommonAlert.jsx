import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const CommonAlert = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={6000} 
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position adjustment if needed
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message || "Something went wrong"} {/* Fallback message */}
      </Alert>
    </Snackbar>
  );
};