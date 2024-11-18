import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Alert, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Coupons = ({ couponsApi, discount, setDiscount, setCouponCode, couponCode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle applying the coupon via API
  const handleApplyCoupon = async () => {
    try {
      const response = await couponsApi(couponCode); // Call the API and retrieve the response

      if (response.isValid === true) {
        const discountPrice = discount;
        setSuccessMessage(`Coupon applied! You saved ${discount} € Per Person.`);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid coupon code. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      setErrorMessage('An error occurred while applying the coupon. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <Paper 
      sx={{ 
        padding: isMobile ? '12px' : '16px', 
        borderRadius: '8px', 
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        width: isMobile ? '90%' : '100%',
        mx: 'auto',
      }}
    >
      <Typography 
        variant={isMobile ? "subtitle1" : "h6"} 
        sx={{ fontWeight: 'bold', color: '#004e8c', mb: 2 }}
      >
        Apply Coupon
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mb: 2 }}>
        <TextField
          label="Enter coupon code"
          variant="outlined"
          fullWidth
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: isMobile ? '0.875rem' : '1rem',
            },
            '& .MuiInputLabel-root': {
              fontSize: isMobile ? '0.8rem' : '1rem',
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            width: isMobile ? '100%' : 'auto',
            background: 'linear-gradient(90deg, #004e8c 0%, #0070ba 100%)',
            color: '#FAF3E0',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: isMobile ? '0.875rem' : '1rem',
            '&:hover': {
              background: 'linear-gradient(90deg, #00336a 0%, #00508c 100%)',
            },
          }}
          onClick={handleApplyCoupon}
        >
          Apply
        </Button>
      </Box>

      {/* Show success or error message */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2, fontSize: isMobile ? '0.75rem' : '1rem' }}>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2, fontSize: isMobile ? '0.75rem' : '1rem' }}>
          {successMessage}
        </Alert>
      )}

      {/* Show discount */}
      {discount > 0 && (
        <Typography 
          variant="body2" 
          sx={{ fontWeight: 'bold', color: '#004e8c', fontSize: isMobile ? '0.875rem' : '1rem' }}
        >
          Discount Applied: {discount}€ Per Person
        </Typography>
      )}
    </Paper>
  );
};

export default Coupons;
