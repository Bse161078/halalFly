import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FailurePaymentTranslation } from '../Translation/translation_german';

const NotSuccessfulPayment = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
          borderRadius: '15px',
          backgroundColor: '#F0F4F8',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 80, color: '#d32f2f', marginBottom: 2 }} />
        <Typography variant="h4" sx={{ color: '#d32f2f', marginBottom: 1 }}>
          {FailurePaymentTranslation.title}
        </Typography>
        <Typography variant="body1" sx={{ color: '#333', marginBottom: 2 }}>
          {FailurePaymentTranslation.message}
        </Typography>
        <Typography variant="body2" sx={{ color: '#555', marginBottom: 3 }}>
          {FailurePaymentTranslation.suggestion}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            color="error"
            href="https://www.paypal.com/us/smarthelp/contact-us"
            target="_blank"
            sx={{
              borderColor: '#d32f2f',
              color: '#d32f2f',
            }}
          >
            {FailurePaymentTranslation.contactButton}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotSuccessfulPayment;
