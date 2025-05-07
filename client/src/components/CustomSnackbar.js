import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const CustomSnackbar = ({ snackbarOpen, handleSnackbarClose, medicine }) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          fontSize: '1.2rem', // Increase font size
          backgroundColor: '#1976d2', // Change background color
          padding: '16px', // Increase padding
          borderRadius: '8px', // Add border radius
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add box shadow
        },
      }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity="info"
        icon={<InfoIcon style={{ color: '#fff' }} />}
        sx={{
          width: '100%',
          fontSize: '1.2rem', // Increase font size
          backgroundColor: '#1976d2', // Change background color
          color: '#fff', // Change text color
          padding: '16px', // Increase padding
          borderRadius: '8px', // Add border radius
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add box shadow
        }}
      >
        {medicine?.alert}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;