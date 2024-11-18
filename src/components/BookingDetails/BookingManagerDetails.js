import React from 'react';
import { Grid, TextField,Typography, useMediaQuery, useTheme } from '@mui/material';

const BookingManagerDetails = ({ 
  bookingManagerDetails, 
  setBookingManagerDetails, 

}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
  <Typography 
    variant={isMobile ? 'h5' : 'h4'}
    color="#004e8c" 
    fontWeight="bold" 
    gutterBottom
    sx={{
      fontSize: isMobile ? '1.5rem' : '2rem',
      textAlign: isMobile ? 'center' : 'left',
      mb: 2,
    }}
  >
    Buchungsmanager Details
  </Typography>

  <Grid container spacing={isMobile ? 2 : 3}>
    {/* Manager Name Field */}
    <Grid item xs={12} sm={6}>
      <TextField
      id="bookingManagerName"
        label="Managername" // Translated to "Manager Name"
        value={bookingManagerDetails.name}
        onChange={(e) => setBookingManagerDetails({ ...bookingManagerDetails, name: e.target.value })}
        fullWidth
        required
        sx={{
          '& .MuiInputLabel-root': { color: '#004e8c', fontWeight: 'bold', fontSize: isMobile ? '0.85rem' : '1rem' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#004e8c',
              borderRadius: '12px',
            },
            '&:hover fieldset': {
              borderColor: '#FF8C42',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#C01718',
            },
            color: '#0C0C0C',
            padding: isMobile ? '4px 8px' : '6px 12px',
          },
          backgroundColor: '#ffffff',
          borderRadius: '12px',
        }}
      />
    </Grid>

    {/* Phone Field */}
    <Grid item xs={12} sm={6}>
      <TextField
        id="bookingManagerPhone"
        label="Telefonnummer" // Translated to "Phone"
        value={bookingManagerDetails.phone}
        onChange={(e) => setBookingManagerDetails({ ...bookingManagerDetails, phone: e.target.value })}
        fullWidth
        required
        sx={{
          '& .MuiInputLabel-root': { color: '#004e8c', fontWeight: 'bold', fontSize: isMobile ? '0.85rem' : '1rem' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#004e8c',
              borderRadius: '12px',
            },
            '&:hover fieldset': {
              borderColor: '#FF8C42',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#C01718',
            },
            color: '#0C0C0C',
            padding: isMobile ? '4px 8px' : '6px 12px',
          },
          backgroundColor: '#ffffff',
          borderRadius: '12px',
        }}
      />
    </Grid>

    {/* Email Field */}
    <Grid item xs={12} sm={6}>
      <TextField
      id="bookingManagerEmail"
      label="E-Mail" // Translated to "Email"
        value={bookingManagerDetails.email}
        onChange={(e) => setBookingManagerDetails({ ...bookingManagerDetails, email: e.target.value })}
        fullWidth
        required
        type="email"
        sx={{
          '& .MuiInputLabel-root': { color: '#004e8c', fontWeight: 'bold', fontSize: isMobile ? '0.85rem' : '1rem' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#004e8c',
              borderRadius: '12px',
            },
            '&:hover fieldset': {
              borderColor: '#FF8C42',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#C01718',
            },
            color: '#0C0C0C',
            padding: isMobile ? '4px 8px' : '6px 12px',
          },
          backgroundColor: '#ffffff',
          borderRadius: '12px',
        }}
      />
    </Grid>

    {/* Address Field */}
    <Grid item xs={12} sm={6}>
      <TextField
        id="bookingManagerAddress"
        label="Adresse" // Translated to "Address"
        value={bookingManagerDetails.address}
        onChange={(e) => setBookingManagerDetails({ ...bookingManagerDetails, address: e.target.value })}
        fullWidth
        required
        multiline
        rows={1}
        sx={{
          '& .MuiInputLabel-root': { color: '#004e8c', fontWeight: 'bold', fontSize: isMobile ? '0.85rem' : '1rem' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#004e8c',
              borderRadius: '12px',
            },
            '&:hover fieldset': {
              borderColor: '#FF8C42',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#C01718',
            },
            color: '#0C0C0C',
            padding: isMobile ? '4px 8px' : '6px 12px',
          },
          backgroundColor: '#ffffff',
          borderRadius: '12px',
        }}
      />
    </Grid>

    {/* City Field */}
    <Grid item xs={12} sm={6}>
      <TextField
        id="bookingManagerCity"
        label="Stadt" // Translated to "City"
        value={bookingManagerDetails.city}
        onChange={(e) => setBookingManagerDetails({ ...bookingManagerDetails, city: e.target.value })}
        fullWidth
        required
        sx={{
          '& .MuiInputLabel-root': { color: '#004e8c', fontWeight: 'bold', fontSize: isMobile ? '0.85rem' : '1rem' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#004e8c',
              borderRadius: '12px',
            },
            '&:hover fieldset': {
              borderColor: '#FF8C42',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#C01718',
            },
            color: '#0C0C0C',
            padding: isMobile ? '4px 8px' : '6px 12px',
          },
          backgroundColor: '#ffffff',
          borderRadius: '12px',
        }}
      />
    </Grid>

    {/* ZIP Code Field */}
    <Grid item xs={12} sm={6}>
      <TextField
        id="bookingManagerZipCode"
        label="Postleitzahl" // Translated to "ZIP Code"
        value={bookingManagerDetails.zipCode}
        onChange={(e) => setBookingManagerDetails({ ...bookingManagerDetails, zipCode: e.target.value })}
        fullWidth
        required
        type="number"
        sx={{
          '& .MuiInputLabel-root': { color: '#004e8c', fontWeight: 'bold', fontSize: isMobile ? '0.85rem' : '1rem' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#004e8c',
              borderRadius: '12px',
            },
            '&:hover fieldset': {
              borderColor: '#FF8C42',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#C01718',
            },
            color: '#0C0C0C',
            padding: isMobile ? '4px 8px' : '6px 12px',
          },
          backgroundColor: '#ffffff',
          borderRadius: '12px',
        }}
      />
    </Grid>
  </Grid>
</>

  );
};

export default BookingManagerDetails;
