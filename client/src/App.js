// src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import InteractionSearch from './components/InteractionSearch';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <InteractionSearch />
      </div>
    </ThemeProvider>
  );
}

export default App;