// src/components/MedicineCard.js
import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

function MedicineCard({ medicine, onClick }) {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="h6">{medicine}</Typography>
          {/* Add more medicine details here if needed */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MedicineCard;