import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {useTheme,useMediaQuery,ListSubheader, Container, TextField, Button, Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from '@mui/material';

const BusinessCollaborationForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const { umrahPackages, landPackages } = location.state || {};
  console.log("umrahPackages",umrahPackages,"landPackages",landPackages)
  const [consent, setConsent] = useState(false);

  const handleConsentChange = (event) => {
    setConsent(event.target.checked);
  };
  const [selectedPackage, setSelectedPackage] = useState('');
  const [totalDays, setTotalDays] = useState(0); // Add state for total days

  const handlePackageChange = (event) => {
    const selectedPackageValue = event.target.value;
    let selectedPackageDetails;
  
    // Determine if the selected package is Umrah or Land and find the corresponding data
    if (selectedPackageValue.startsWith('Umrah')) {
      selectedPackageDetails = umrahPackages.find(umrah => `Umrah-${umrah.packageType}` === selectedPackageValue);
    } else if (selectedPackageValue.startsWith('Land')) {
      selectedPackageDetails = landPackages.find(land => `Land-${land.packageType}` === selectedPackageValue);
    }
  
    // Calculate the total days from the hotelInfo array
    const totalDays = selectedPackageDetails?.hotelInfo?.reduce((acc, hotel) => acc + (hotel.totalDays || 0), 0) || 0;
    // Set the selected package and total days
    setSelectedPackage(selectedPackageValue);
    setTotalDays(totalDays); // Assuming you have a state for total days
  };
  

  return (
    <Container maxWidth="md" sx={{ mt: 5, padding: { xs: 3, md: 6 }, borderRadius: 0, backgroundColor: '#fff' }}>
      <Typography
  variant="h4"
  align="center"
  sx={{
    color: '#FF8C42', // Vibrant orange to stand out
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: { xs: 0, md: 10 }, // Responsive margin
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    fontSize: { xs: isMobile&&'1.3rem', sm:isMobile&&'1.7rem', md: '3rem' }, // Responsive font size
  }}
>
  Get In Touch With Us
</Typography>

    <Paper
  elevation={3}
  sx={{
    maxWidth: '800px',
    margin: '40px auto',
    padding: '50px',
    backgroundColor: '#F0F0F0', // Light background matching your scheme
    borderRadius: '20px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)', // Soft shadow for a polished feel
    color: '#333', // Dark text for readability
  }}
>
  {/* Title */}
  <Typography
    variant={isMobile?'h6':"h4"}
    gutterBottom
    sx={{
      textAlign: 'center',
      color: '#004e8c', // Blue theme color for the title
      fontWeight: 'bold',
      marginBottom: '40px',
      textTransform: 'uppercase',
      letterSpacing: '1.2px',
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)', // Subtle text shadow
    }}
  >
    B2B Partnership Request
  </Typography>

  {/* Organization Information */}
  <Typography
    variant={isMobile?"body2":"h6"}
    sx={{
      marginTop: '30px',
      color: '#FF8C42', // Gold color to visually break up sections
      fontWeight: 'bold',
      marginBottom: '20px',
      textTransform: 'uppercase',
    }}
  >
    Organization Information
  </Typography>

  <Grid container spacing={3} sx={{ marginBottom: '30px' }}>
    {/* Organization Name */}
    <Grid item xs={12}>
      <TextField
        label="Organization Name"
        fullWidth
        InputLabelProps={{ style: { color: '#004e8c',fontSize:isMobile&&'0.7rem' } }} // Blue label
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': { borderColor: '#D5B782', }, // Gold border
            '&:hover fieldset': { borderColor: '#FF8C42' }, // Orange border on hover
            '&.Mui-focused fieldset': { borderColor: '#C01718' }, // Red on focus
          },
          '& .MuiInputBase-root': { color: '#333',fontSize:isMobile&&'0.7rem' }, // Dark text
        }}
      />
    </Grid>

    {/* Type of Organization */}
    <Grid item xs={12}>
      <FormControl fullWidth variant="outlined">
        {/* Label with conditional font size */}
        <InputLabel 
          sx={{ color: '#004e8c', fontSize: isMobile && '0.7rem' }}
        >
          Type of Organization
        </InputLabel>
        
        <Select
          label="Type of Organization"
          sx={{
            borderRadius: '12px',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#D5B782' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FF8C42' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#C01718' },
            '& .MuiSelect-select': { color: '#333' }, // Dark text for select options
          }}
        >
          {/* MenuItems with conditional font size */}
          <MenuItem sx={{ color: '#004e8c', fontSize: isMobile && '0.7rem' }} value="TravelAgency">
            Travel Agency
          </MenuItem>
          <MenuItem sx={{ fontSize: isMobile && '0.7rem' }} value="Corporate">
            Corporate
          </MenuItem>
          <MenuItem sx={{ fontSize: isMobile && '0.7rem' }} value="NGO">
            NGO
          </MenuItem>
        </Select>
      </FormControl>
    </Grid>

    {/* Organization Address */}
    <Grid item xs={12}>
      <TextField
        label="Organization Address"
        fullWidth
        InputLabelProps={{ style: { color: '#004e8c', fontSize: isMobile && '0.7rem'  } }} // Blue label
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': { borderColor: '#D5B782' }, // Gold border
            '&:hover fieldset': { borderColor: '#FF8C42' }, // Orange hover border
            '&.Mui-focused fieldset': { borderColor: '#C01718' }, // Red border on focus
          },
          '& .MuiInputBase-root': { color: '#333',fontSize: isMobile && '0.7rem' },
        }}
      />
    </Grid>

    {/* Contact Name */}
    <Grid item xs={12}>
      <TextField
        label="Contact Name"
        fullWidth
        InputLabelProps={{ style: { color: '#004e8c',fontSize: isMobile && '0.7rem' } }} // Blue label
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': { borderColor: '#D5B782' }, // Gold border
            '&:hover fieldset': { borderColor: '#FF8C42' }, // Orange hover
            '&.Mui-focused fieldset': { borderColor: '#C01718' }, // Red border on focus
          },
          '& .MuiInputBase-root': { color: '#333',fontSize: isMobile && '0.7rem' },
        }}
      />
    </Grid>

    {/* Email */}
    <Grid item xs={12}>
      <TextField
        label="Email"
        type="email"
        fullWidth
        InputLabelProps={{ style: { color: '#004e8c',fontSize: isMobile && '0.7rem' } }} // Blue label
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': { borderColor: '#D5B782' }, // Gold border
            '&:hover fieldset': { borderColor: '#FF8C42' }, // Orange hover
            '&.Mui-focused fieldset': { borderColor: '#C01718' }, // Red border on focus
          },
          '& .MuiInputBase-root': { color: '#333',fontSize: isMobile && '0.7rem' },
        }}
      />
    </Grid>

    {/* Mobile Number */}
    <Grid item xs={12}>
      <TextField
        label="Mobile Number"
        type="tel"
        fullWidth
        InputLabelProps={{ style: { color: '#004e8c',fontSize: isMobile && '0.7rem' } }} // Blue label
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': { borderColor: '#D5B782' }, // Gold border
            '&:hover fieldset': { borderColor: '#FF8C42' }, // Orange hover
            '&.Mui-focused fieldset': { borderColor: '#C01718' }, // Red border on focus
          },
          '& .MuiInputBase-root': { color: '#333',fontSize: isMobile && '0.7rem' },
        }}
      />
    </Grid>
  </Grid>

  {/* Reservation Details */}
  <Typography
    variant="h6"
    sx={{
      marginTop: '20px',
      color: '#FF8C42', // Gold color
      fontWeight: 'bold',
      marginBottom: '20px',
      textTransform: 'uppercase',
    }}
  >
    Reservation Details
  </Typography>

  <Grid container spacing={3} sx={{ marginBottom: '30px' }}>
    <Grid item xs={12}>
      <TextField
        label="Departure City"
        fullWidth
        InputLabelProps={{ style: { color: '#004e8c',fontSize: isMobile && '0.7rem' } }} // Blue label
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': { borderColor: '#D5B782' }, // Gold border
            '&:hover fieldset': { borderColor: '#FF8C42' }, // Orange hover
            '&.Mui-focused fieldset': { borderColor: '#C01718' }, // Red border on focus
          },
          '& .MuiInputBase-root': { color: '#333',fontSize: isMobile && '0.7rem' },
        }}
      />
    </Grid>

    <Grid item xs={12}>
    <FormControl fullWidth variant="outlined" sx={{ marginBottom: 3 }}>
  <InputLabel sx={{fontSize: isMobile && '0.7rem'}}>Select Package</InputLabel>
  <Select
    value={selectedPackage}
    onChange={handlePackageChange}
    label="Select Package"
  >
    {/* Umrah Packages Header */}
    <ListSubheader sx={{fontSize: isMobile && '0.7rem'}}>Umrah Packages</ListSubheader>
    {umrahPackages?.map((umrah, index) => (
      <MenuItem key={index} value={`Umrah-${umrah.packageType}`}>
        {`${umrah.packageType} - ${umrah.hotelInfo?.map((hotel) => hotel.hotel).join(', ')}`}
      </MenuItem>
    ))}

    {/* Land Packages Header */}
    <ListSubheader sx={{fontSize: isMobile && '0.7rem'}}>Land Packages</ListSubheader>
    {landPackages?.map((land, index) => (
      <MenuItem key={index} value={`Land-${land.packageType }`}>
        {`${land.packageType} - ${land.hotelInfo?.map((hotel) => hotel.hotel).join(', ')}`}
      </MenuItem>
    ))}
  </Select>
  
</FormControl>
{/* Display total days */}
{selectedPackage && (
  <Typography variant="body1" sx={{ fontSize: isMobile && '0.7rem',marginTop: 2, fontWeight: 'bold', color: '#C01718' }}>
    Total Days: {totalDays}
  </Typography>
)}
    </Grid>

    <Grid item xs={12}>
      <TextField
        label="Number of Pilgrims"
        type="number"
        fullWidth
        InputLabelProps={{ style: { color: '#004e8c',fontSize: isMobile && '0.7rem' } }} // Blue label
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': { borderColor: '#D5B782' }, // Gold border
            '&:hover fieldset': { borderColor: '#FF8C42' }, // Orange hover
            '&.Mui-focused fieldset': { borderColor: '#C01718' }, // Red border on focus
          },
          '& .MuiInputBase-root': { color: '#333',fontSize: isMobile && '0.7rem' },
        }}
      />
    </Grid>

    {/* Visa Required */}
    <Grid item xs={12}>
      <FormControl fullWidth variant="outlined">
        <InputLabel sx={{ color: '#004e8c',fontSize: isMobile && '0.7rem' }}>Visa Required</InputLabel>
        <Select
          label="Visa Required"
          sx={{
            borderRadius: '12px',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#D5B782' }, // Gold border
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FF8C42' }, // Orange hover
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#C01718' }, // Red border on focus
            '& .MuiSelect-select': { color: '#333',fontSize: isMobile && '0.7rem' },
          }}
        >
          <MenuItem sx={{fontSize: isMobile && '0.7rem'}} value="Yes">Yes</MenuItem>
          <MenuItem sx={{fontSize: isMobile && '0.7rem'}} value="No">No</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>

  {/* Consent and Submit Button */}
  <Button
    variant="contained"
    fullWidth
    sx={{
      fontSize: isMobile && '0.7rem',
      marginTop: '30px',
      backgroundColor: '#FF8C42', // Blue button
      color: '#FAF3E0', // Light text
      fontWeight: 'bold',
      padding: '15px 0',
      borderRadius: '12px',
      '&:hover': { backgroundColor: '#00336a' }, // Darker blue on hover
    }}
  >
    Submit
  </Button>
</Paper>


    </Container>
  );
};

export default BusinessCollaborationForm;
