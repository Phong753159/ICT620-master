import React from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import MedicineCard from './MedicineCard'; // Assuming you have a MedicineCard component

function InteractionCards({ interactions, handleMedicineClick }) {
  return (
    <Grid container spacing={2}>
      {interactions.map((interaction, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card variant="outlined" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <MedicineCard
                medicine={interaction.medicine1}
                onClick={() => handleMedicineClick(interaction.medicine1)}
              />
              <Typography align="center" variant="body2" style={{ margin: '8px 0' }}>
                Interacts with
              </Typography>
              <MedicineCard
                medicine={interaction.medicine2}
                onClick={() => handleMedicineClick(interaction.medicine2)}
              />
              <Typography variant="body2" style={{ marginTop: '16px' }}>
                Interaction Description: {interaction.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default InteractionCards;