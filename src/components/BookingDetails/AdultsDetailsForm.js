import React from 'react';
import { Grid, MenuItem, Button, Divider, Typography, Box,TextField,FormControl,InputLabel } from '@mui/material';

const AdultsDetailsForm = ({ adultsDetails, handleAdultChange, visaCountries, handleVisaInfoClick, CustomSelect }) => {
  return (
    <>
    <Typography
      variant="h5"
      sx={{
        color: '#004e8c', // Gold title text
        fontWeight: 'bold',
        marginBottom: '16px',
        textAlign: 'center',
        fontSize: '1.8rem', // Slightly larger title for emphasis
      }}
    >
      Adults Details
    </Typography>
    {adultsDetails.map((adult, index) => (
      <Box
        key={index}
        sx={{
          marginBottom: '24px',
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: '#f5f5f5', // Light background for card contrast
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)', // Softer shadow for a subtle 3D effect
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#004e8c', // Blue text color for section title
            fontWeight: 'bold',
            marginBottom: '16px',
            fontSize: '1.4rem', // Slightly larger title font
          }}
        >
          Adult {index + 1}
        </Typography>
        <Grid container spacing={3}>
          {/* Full Name Input */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Full Name"
              value={adult.name}
              onChange={(e) => handleAdultChange(index, 'name', e.target.value)}
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: '#004e8c' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#004e8c',
                    borderRadius: '12px', // Rounded corners for input field
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF8C42',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF8C42',
                  },
                },
                '& .MuiInputBase-root': {
                  color: '#004e8c',
                },
              }}
            />
          </Grid>
  
          {/* Passport Input */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Passport Number"
              value={adult.passport}
              onChange={(e) => handleAdultChange(index, 'passport', e.target.value)}
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: '#004e8c' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#004e8c',
                    borderRadius: '12px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF8C42',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF8C42',
                  },
                },
                '& .MuiInputBase-root': {
                  color: '#004e8c',
                },
              }}
            />
          </Grid>
  
          {/* Nationality Selection */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: '#004e8c' }}>Nationality</InputLabel>
              <CustomSelect
                value={adult.nationality}
                onChange={(e) => handleAdultChange(index, 'nationality', e.target.value)}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: '#fff', // White background for select input
                }}
              >
                {visaCountries.map((country, idx) => (
                  <MenuItem key={idx} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </CustomSelect>
              <Button
                onClick={() => handleVisaInfoClick()}
                sx={{
                  marginTop: '12px',
                  backgroundColor: '#FF8C42',
                  color: '#fff',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#004e8c',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                More Info about Visa Types
              </Button>
            </FormControl>
          </Grid>
  
          {/* Visa Type Selection */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" disabled={!adult.nationality}>
              <InputLabel sx={{ color: adult.nationality ? '#004e8c' : '#666' }}>
                Visa Type
              </InputLabel>
              <CustomSelect
                value={adult.visa || ''}
                onChange={(e) => handleAdultChange(index, 'visa', e.target.value)}
                sx={{
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                }}
              >
                {adult.visaOptions.map((option, idx) => (
                  <MenuItem key={idx} value={option.label}>
                    {option.label} - €{option.price}
                  </MenuItem>
                ))}
              </CustomSelect>
            </FormControl>
          </Grid>
        </Grid>
  
        {/* Divider Between Adults */}
        {index < adultsDetails.length - 1 && (
          <Divider
            sx={{
              my: 3,
              borderColor: '#D5B782',
              marginTop: '20px',
            }}
          />
        )}
      </Box>
    ))}
  </>
  
  );
};

export default AdultsDetailsForm;
