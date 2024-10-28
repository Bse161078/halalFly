import React from 'react';
import { Box, Grid, MenuItem, Button, Divider, Typography, TextField, FormControl, InputLabel, useTheme, useMediaQuery } from '@mui/material';

const AdultsDetailsForm = ({ 
  adultsDetails, 
  handleAdultChange, 
  visaCountries, 
  handleVisaInfoClick, 
  CustomSelect 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        sx={{
          color: '#004e8c',
          fontWeight: 'bold',
          marginBottom: isMobile ? '12px' : '16px',
          textAlign: 'center',
          fontSize: isMobile ? '1.5rem' : '1.8rem',
        }}
      >
        Adults Details
      </Typography>

      {adultsDetails.map((adult, index) => (
        <Box
          key={index}
          sx={{
            marginBottom: '24px',
            padding: isMobile ? '16px' : '24px',
            borderRadius: '12px',
            backgroundColor: '#f5f5f5',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: isMobile ? 'none' : 'scale(1.02)',
              boxShadow: isMobile ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 8px 24px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: '#004e8c',
              fontWeight: 'bold',
              marginBottom: isMobile ? '12px' : '16px',
              fontSize: isMobile ? '1.2rem' : '1.4rem',
            }}
          >
            Adult {index + 1}
          </Typography>

          <Grid container spacing={isMobile ? 2 : 3} direction="column">
            {/* Full Name Input */}
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                value={adult.name}
                onChange={(e) => handleAdultChange(index, 'name', e.target.value)}
                fullWidth
                required
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
                  height: isMobile ? '40px' : '56px',
                }}
              />
            </Grid>

            {/* Date of Birth Input */}
            <Grid item xs={12}>
              <TextField
                label="Date of Birth"
                type="date"
                value={adult.dateOfBirth}
                onChange={(e) => handleAdultChange(index, 'dateOfBirth', e.target.value)}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                  style: { color: '#004e8c' },
                }}
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
                  height: isMobile ? '40px' : '56px',
                }}
              />
            </Grid>

            {/* Nationality Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel sx={{ color: '#004e8c', fontWeight: 'bold' }}>Nationality</InputLabel>
                <CustomSelect
                  value={adult.nationality}
                  onChange={(e) => handleAdultChange(index, 'nationality', e.target.value)}
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    height: isMobile ? '40px' : '56px',
                  }}
                >
                  {visaCountries.map((country, idx) => (
                    <MenuItem key={idx} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </FormControl>
              <Button
                onClick={() => handleVisaInfoClick()}
                sx={{
                  marginTop: '8px',
                  backgroundColor: '#FF8C42',
                  color: '#fff',
                  padding: isMobile ? '8px' : '10px 16px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '0.75rem' : '1rem',
                  '&:hover': {
                    backgroundColor: '#004e8c',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                More Info about Visa Types
              </Button>
            </Grid>

            {/* Visa Type Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" disabled={!adult.nationality}>
                <InputLabel sx={{ color: adult.nationality ? '#004e8c' : '#666' }}>Visa Type</InputLabel>
                <CustomSelect
                  value={adult.visa || ''}
                  onChange={(e) => handleAdultChange(index, 'visa', e.target.value)}
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    height: isMobile ? '40px' : '56px',
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
                my: 2,
                borderColor: '#D5B782',
              }}
            />
          )}
        </Box>
      ))}
    </>
  );
};

export default AdultsDetailsForm;
