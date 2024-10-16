import React from 'react';
import { Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button, Divider } from '@mui/material';

const ChildrenDetailsForm = ({ childrenDetails, handleChildChange, visaCountries, handleVisaInfoClick }) => {
  return (
    <>
      <Typography variant="h5" sx={{ color: '#D5B782', fontWeight: 'bold', marginBottom: '16px' }}>
        Children Details
      </Typography>
      {childrenDetails.map((child, index) => (
        <Box
          key={index}
          sx={{
            marginBottom: '24px',
            padding: '24px',
            borderRadius: '12px',
            backgroundColor: '#0C0C0C', // Dark background for better contrast
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)', // Slight scaling effect on hover
            },
          }}
        >
          <Typography variant="h6" sx={{ color: '#D5B782', fontWeight: 'bold', marginBottom: '16px' }}>
            Child {index + 1}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                value={child.name}
                onChange={(e) => handleChildChange(index, 'name', e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: { color: '#D5B782' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#D5B782',
                    },
                    '&:hover fieldset': {
                      borderColor: '#C01718',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#C01718',
                    },
                  },
                  '& .MuiInputBase-root': {
                    color: '#FAF3E0',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Passport Number"
                value={child.passport}
                onChange={(e) => handleChildChange(index, 'passport', e.target.value)}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: { color: '#D5B782' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#D5B782',
                    },
                    '&:hover fieldset': {
                      borderColor: '#C01718',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#C01718',
                    },
                  },
                  '& .MuiInputBase-root': {
                    color: '#FAF3E0',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel sx={{ color: '#D5B782' }}>Nationality</InputLabel>
                <Select
                  value={child.nationality}
                  variant='standard'
                  onChange={(e) => handleChildChange(index, 'nationality', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#D5B782',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#C01718',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#C01718',
                    },
                    '& .MuiSelect-select': {
                      color: '#FAF3E0',
                    },
                  }}
                >
                  {visaCountries.map((country, idx) => (
                    <MenuItem key={idx} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  onClick={() => handleVisaInfoClick()}
                  sx={{
                    marginTop: '8px',
                    color: '#FAF3E0',
                    backgroundColor: '#C01718',
                    '&:hover': {
                      backgroundColor: '#D5B782',
                      color: '#0C0C0C',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  More Info about Visa Types
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" disabled={!child.nationality}>
                <InputLabel sx={{ color: child.nationality ? '#D5B782' : '#666' }}>Visa Type</InputLabel>
                <Select
                  value={child.visa || ''}
                  variant='standard'
                  onChange={(e) => handleChildChange(index, 'visa', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: child.nationality ? '#D5B782' : '#666',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: child.nationality ? '#C01718' : '#666',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: child.nationality ? '#C01718' : '#666',
                    },
                    '& .MuiSelect-select': {
                      color: child.nationality ? '#FAF3E0' : '#666',
                    },
                  }}
                >
                  {child.visaOptions.map((option, idx) => (
                    <MenuItem key={idx} value={option.label}>
                      {option.label} - €{option.price}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          {index < childrenDetails.length - 1 && (
            <Divider
              sx={{
                my: 3,
                borderColor: '#D5B782',
                transition: 'all 0.5s ease',
              }}
            />
          )}
        </Box>
      ))}
    </>
  );
};

export default ChildrenDetailsForm;
