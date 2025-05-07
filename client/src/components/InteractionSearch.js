// src/components/InteractionSearch.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import InteractionResult from './InteractionResult';
import api from '../services/api';

function InteractionSearch() {
  const [medicine1, setMedicine1] = useState('');
  const [medicine2, setMedicine2] = useState('');
  const [interactions, setInteractions] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/interactions?medicine1=${medicine1}&medicine2=${medicine2}`); // Replace with your API endpoint
      setInteractions(response.data);
      setError(null);
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 200 range
        setError(`Error: ${err.response.data.error || 'Server error'}`);
      } else if (err.request) {
        // Request was made but no response received
        setError('Error: No response from server.');
      } else {
        // Something else happened while setting up the request
        setError(`Error: ${err.message}`);
      }
      setInteractions(null);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Medicine Interactions
      </Typography>
      <TextField
        label="Medicine 1"
        value={medicine1}
        onChange={(e) => setMedicine1(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Medicine 2"
        value={medicine2}
        onChange={(e) => setMedicine2(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {interactions && <InteractionResult interactions={interactions} />}
    </Container>
  );
}

export default InteractionSearch;