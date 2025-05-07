// src/components/MedicineDrawer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Drawer, Typography, Box, IconButton, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MedicineDetails from './MedicineDetails';
import api from '../services/api';

function MedicineDrawer({ selectedMedicine, onClose }) {
  const [medicineDetails, setMedicineDetails] = useState(null);

  useEffect(() => {
    if (selectedMedicine) {
      api.get(`/medicine?name=${selectedMedicine}`)
        .then(response => {
          setMedicineDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching medicine details:', error);
        });
    }
  }, [selectedMedicine]);

  if (!medicineDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: 1000, p: 2 }}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>
      <Typography variant="h5" gutterBottom>
        {medicineDetails.name}
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>
        Download CMI
      </Button>
        <MedicineDetails medicine={medicineDetails}/>
      {/* Add more medicine details here */}
    </Box>
  );
}

export default MedicineDrawer;