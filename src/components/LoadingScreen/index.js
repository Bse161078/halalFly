import React from 'react';
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';

const LoadingScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100%"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark transparent background
        zIndex: 9999, // Ensures loader stays on top
        padding: isMobile ? '0 20px' : 0, // Padding for small screens to avoid cutting text
      }}
    >
      <CircularProgress
        size={isMobile ? 60 : 100} // Smaller size on mobile
        thickness={4} // Thinner loader for a sleek look
        sx={{
          color: '#FF8C42', // Theme color
          marginBottom: isMobile ? 2 : 3, // Adjust spacing for mobile
        }}
      />
      <Typography
        variant={isMobile ? 'h6' : 'h5'} // Smaller font for mobile
        sx={{
          color: '#FAF3E0',
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: isMobile ? 1 : 3,
        }}
      >
        Preparing your Umrah & Hajj experience...
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#FAF3E0',
          textAlign: 'center',
          marginTop: isMobile ? 0.5 : 1,
          fontSize: isMobile ? '0.85rem' : '1rem', // Smaller font size for better fit on mobile
        }}
      >
        Please wait while we connect you to our services.
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
