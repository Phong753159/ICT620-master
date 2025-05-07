import React, { useState } from 'react';
import { Grid, Typography, Drawer, Card, CardContent, Snackbar, Alert } from '@mui/material';
import MedicineCard from './MedicineCard';
import MedicineDrawer from './MedicineDrawer';
import CustomSnackbar from './CustomSnackbar';

function InteractionResult({ interactions }) {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleMedicineClick = (medicine) => {
    setSelectedMedicine(medicine);
    setDrawerOpen(true);
    setSnackbarOpen(true); // Show the snackbar when a medicine is clicked
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Interactions:
      </Typography>
      <Grid container spacing={2}>
        {interactions.map((interaction, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card variant="outlined" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <MedicineCard
                  medicine={interaction.medicine1_name}
                  onClick={() => handleMedicineClick(interaction.medicine1_name)}
                />
                <Typography align="center" variant="body2" style={{ margin: '8px 0' }}>
                  Interacts with
                </Typography>
                <MedicineCard
                  medicine={interaction.medicine2_name}
                  onClick={() => handleMedicineClick(interaction.medicine2_name)}
                />
                <Typography variant="body2" style={{ marginTop: '16px' }}>
                  Interaction Description: {interaction.interaction_description}
                </Typography>
              </CardContent>
              {/* optional card actions if needed */}
              {/* <CardActions>
                  <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <MedicineDrawer selectedMedicine={selectedMedicine} onClose={handleDrawerClose} />
      </Drawer>
      <CustomSnackbar snackbarOpen={snackbarOpen} handleSnackbarClose={handleSnackbarClose} medicine={selectedMedicine}/>
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
          Please remind the patient to monitor their vitals, such as blood pressure and blood glucose levels.
        </Alert>
      </Snackbar> */}
    </div>
  );
}

export default InteractionResult;