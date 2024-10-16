import React from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

const BookingManagerDetails = ({ bookingManagerDetails, setBookingManagerDetails, visaCountries }) => {
  return (
    <>
      <Typography variant="h4" color="#004e8c" fontWeight="bold" gutterBottom>
        Booking Manager Details
      </Typography>
      <Grid container spacing={3}>
        {/* Manager Name Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Manager Name"
            value={bookingManagerDetails.name}
            onChange={(e) => setBookingManagerDetails({ ...bookingManagerDetails, name: e.target.value })}
            fullWidth
            sx={{
              '& .MuiInputLabel-root': { color: '#004e8c', fontWeight: 'bold' }, // Blue label with bold font
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#004e8c', // Blue border
                  borderRadius: '12px', // Rounded corners for a softer look
                },
                '&:hover fieldset': {
                  borderColor: '#FF8C42', // Orange border on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#C01718', // Red border when focused
                },
                color: '#0C0C0C', // Dark text color inside the input
              },
              backgroundColor: '#ffffff', // White background for the text field
              borderRadius: '12px', // Softened corners for the entire input field
              padding: '6px 12px', // Extra padding for a more spacious feel
            }}
          />
        </Grid>

        {/* Phone Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            value={bookingManagerDetails.phone}
            onChange={(e) => setBookingManagerDetails({ ...bookingManagerDetails, phone: e.target.value })}
            fullWidth
            sx={{
              '& .MuiInputLabel-root': { color: '#004e8c', fontWeight: 'bold' },
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
              },
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '6px 12px',
            }}
          />
        </Grid>

        {/* Email Field */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            value={bookingManagerDetails.email}
            onChange={(e) => setBookingManagerDetails({ ...bookingManagerDetails, email: e.target.value })}
            fullWidth
            sx={{
              '& .MuiInputLabel-root': { color: '#004e8c', fontWeight: 'bold' },
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
              },
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '6px 12px',
            }}
          />
        </Grid>

        {/* Nationality Select Field */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ '& .MuiInputLabel-root': { color: '#004e8c', fontWeight: 'bold' } }}>
            <InputLabel>Nationality</InputLabel>
            <Select
              value={bookingManagerDetails.nationality}
              onChange={(e) => setBookingManagerDetails({ ...bookingManagerDetails, nationality: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#004e8c',
                  borderRadius: '12px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FF8C42',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#C01718',
                },
                color: '#0C0C0C',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '6px 12px',
              }}
            >
              {visaCountries.map((country, index) => (
                <MenuItem key={index} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default BookingManagerDetails;
