import React from 'react';
import { Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PriceDetails = ({ finalPrice }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{ 
        mt: 3, 
        p: isMobile ? 2 : 3, 
        backgroundColor: '#f9f9f9', 
        borderRadius: '12px', 
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
        textAlign: 'center',
        maxWidth: isMobile ? '90%' : '100%', // Limit width on mobile for better alignment
        mx: 'auto',  // Center box horizontally
      }}
    >
      {/* Total Price Heading */}
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        sx={{ 
          fontWeight: 'bold', 
          color: '#004e8c', 
          mb: isMobile ? 1 : 2,
          textTransform: 'uppercase',
        }}
      >
        Total Price
      </Typography>

      {/* Price */}
      <Typography 
        variant={isMobile ? "h4" : "h2"} 
        sx={{ 
          fontWeight: 'bold', 
          color: '#ff8c42', 
          fontSize: isMobile ? '2rem' : '2.5rem', 
          mb: 1, 
          '&:hover': {  // Subtle hover effect on the price
            color: '#e07b39',
            transition: 'color 0.3s ease',
          } 
        }}
      >
        €{finalPrice}
      </Typography>

      {/* Disclaimer */}
      <Typography 
        variant="body2" 
        sx={{ 
          mt: isMobile ? 1 : 2, 
          fontStyle: 'italic', 
          color: '#666', 
          fontSize: isMobile ? '0.8rem' : '0.9rem',
          maxWidth: isMobile ? '100%' : '80%', 
          mx: 'auto'  // Center the text and limit its width for readability
        }}
      >
        *Price may vary based on availability.
      </Typography>
    </Box>
  );
};

export default PriceDetails;
