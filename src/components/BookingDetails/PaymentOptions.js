import React, { useState } from 'react';
import { Box, Button, Grid, Typography, ToggleButtonGroup, ToggleButton, useTheme, useMediaQuery } from '@mui/material';
import { CreditCard } from '@mui/icons-material';
import paypal from '../../assets/images/paypal.png';

const PaymentOptions = ({paymentType,setPaymentType}) => {
  const [selectedMethod, setSelectedMethod] = useState(''); // State to track selected payment method

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelectMethod = (method) => {
    setSelectedMethod(method); // Set selected payment method
  };

  const handlePaymentTypeChange = (event, newType) => {
    setPaymentType(event.target.value);
  };
console.log("paymentOptions",paymentType)
  return (
    <Box sx={{ textAlign: 'center', mt: 4, px: isMobile ? 2 : 0 }}>
      <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
        Choose Payment Method
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {/* Stripe Payment Option */}
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: selectedMethod === 'Stripe' ? '#004e8c' : '#ccc',
              backgroundColor: selectedMethod === 'Stripe' ? '#e0f7fa' : '#fff',
              color: selectedMethod === 'Stripe' ? '#004e8c' : '#000',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textTransform: 'none',
              padding: isMobile ? '10px' : '16px',
              '&:hover': { borderColor: '#004e8c', backgroundColor: '#e0f7fa' },
            }}
            onClick={() => handleSelectMethod('Stripe')}
          >
            <CreditCard sx={{ color: '#004e8c', fontSize: isMobile ? 20 : 50, mb: 1 }} />
            <Typography variant="button">Pay with Stripe</Typography>
          </Button>
        </Grid>

        {/* PayPal Payment Option */}
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: selectedMethod === 'PayPal' ? '#004e8c' : '#ccc',
              backgroundColor: selectedMethod === 'PayPal' ? '#e0f7fa' : '#fff',
              color: selectedMethod === 'PayPal' ? '#004e8c' : '#000',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textTransform: 'none',
              padding: isMobile ? '10px' : '16px',
              '&:hover': { borderColor: '#004e8c', backgroundColor: '#e0f7fa' },
            }}
            onClick={() => handleSelectMethod('PayPal')}
          >
            <Box
              component="img"
              src={paypal}
              alt="PayPal"
              sx={{ width: isMobile ? '20px' : '54px', mb: 1 }}
            />
            <Typography variant="button">Pay with PayPal</Typography>
          </Button>
        </Grid>
      </Grid>

      {/* Show Full Payment/Deposit Toggle Only if Payment Method is Selected */}
      {selectedMethod && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Choose Payment Type
          </Typography>
          <ToggleButtonGroup
            value={paymentType}
            exclusive
            onChange={handlePaymentTypeChange}
            sx={{
              mt: 1,
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <ToggleButton value="full" sx={{
              flex: 1,
              textTransform: 'none',
              backgroundColor: paymentType === 'full' ? '#004e8c' : '#FFFFFF',
              color: paymentType === 'full' ?'#FFFFFF':'black',
              fontSize: isMobile ? '0.75rem' : '1rem',
              '&:hover': {
                backgroundColor: paymentType === 'full' ? '#00376b' : '#004e8c',
                color:paymentType === 'full' ? 'black' : 'white'

              }
            }}>
              Full Payment
            </ToggleButton>
            <ToggleButton value="deposit" sx={{
              flex: 1,
              textTransform: 'none',
              backgroundColor: paymentType === 'deposit' ? '#004e8c' : '#FFFFFF',
              color: paymentType === 'deposit' ?'#FFFFFF':'black',
              fontSize: isMobile ? '0.75rem' : '1rem',
              '&:hover': {
                backgroundColor: paymentType === 'deposit' ? '#00376b' : '#004e8c',
                color:paymentType === 'deposit' ? 'black' : 'white'
              }
            }}>
              Deposit
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      )}
    </Box>
  );
};

export default PaymentOptions;
