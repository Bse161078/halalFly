import React from 'react';
import { Box, Typography, CircularProgress, useMediaQuery, useTheme } from '@mui/material';

const LoadingScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF8C42', // Orange background
        zIndex: 1300, // Higher than most elements to ensure visibility
        padding: isMobile ? '0 20px' : '0',
        overflow: 'hidden', // Avoid any scrolling during loading
      }}
    >
      {/* Circular Progress Indicator */}
      <CircularProgress 
        sx={{
          color: '#FAF3E0', // Light beige from the theme
          width: isMobile ? 40 : 60, 
          height: isMobile ? 40 : 60, 
          mb: isMobile ? 2 : 3, // Margin below the loader
        }} 
      />
      
      {/* Main Loading Text */}
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        sx={{
          color: '#FAF3E0',
          fontWeight: 'bold',
          textAlign: 'center',
          mt: isMobile ? 1 : 3,
        }}
      >
        {isMobile ? 'Laden...' : 'Bereite Ihr Umrah- und Hajj-Erlebnis vor...'}
      </Typography>
      
      {/* Supporting Text */}
      <Typography
        variant="body2"
        sx={{
          color: '#FAF3E0',
          textAlign: 'center',
          mt: isMobile ? 0.5 : 1,
          fontSize: isMobile ? '0.85rem' : '1rem',
        }}
      >
        {isMobile
          ? 'Bitte warten Sie kurz.'
          : 'Bitte warten Sie, während wir Sie mit unseren Diensten verbinden.'}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
