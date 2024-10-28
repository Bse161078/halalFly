import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FloatingButtonWithPrice = ({ finalPrice, packageData, adults, infants, selectedActivity, selectedTransfer }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const displayFinalPrice = typeof finalPrice === 'number' && !isNaN(finalPrice) ? finalPrice.toFixed(2) : '0.00';

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: isMobile ? '10px' : '20px', // Adjust the button's position based on screen size
        right: isMobile ? '10px' : '20px',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1000,
        background: '#fff',
        padding: isMobile ? '8px 12px' : '10px 20px',
        borderRadius: '50px',
        boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.1)', // Slightly deeper shadow for depth
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 8px 18px rgba(0, 0, 0, 0.2)', // Hover effect for depth
        },
      }}
    >
      {/* Total Price */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#004e8c',
          mr: 2,
          fontSize: isMobile ? '0.7rem' : '1.2rem', // Adjust font size for mobile
        }}
      >
        € {displayFinalPrice}
      </Typography>

      {/* Book Button */}
      <Button
        variant="contained"
        sx={{
          background: 'linear-gradient(90deg, #004e8c 0%, #0070ba 100%)',
          color: '#FAF3E0',
          borderRadius: '50px',
          textTransform: 'none',
          fontWeight: 'bold',
          padding: isMobile ? '8px 16px' : '10px 24px', // Adjust padding based on screen size
          fontSize: isMobile ? '0.65rem' : '1rem',
          minWidth: '120px',
          transition: 'transform 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(90deg, #00336a 0%, #00508c 100%)',
            transform: 'scale(1.05)', // Slight scaling for hover effect
          },
        }}
        onClick={() =>
          navigate('/booking-details', {
            state: {
              packageData,
              finalPrice,
              adults,
              infants,
              selectedActivity,
              selectedTransfer,
            },
          })
        }
      >
        Book Now
      </Button>
    </Box>
  );
};

export default FloatingButtonWithPrice;
