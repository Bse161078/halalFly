import React from 'react';
import { useTheme,useMediaQuery,Box, Typography, Divider, Paper } from '@mui/material';
import FlightDetailsSection from './FlightDetailsSection';
import HotelDetailsSection from './hotelDetailsSection';
import PackageInclusionsExclusions from './PackageInclusionsExclusions';

const DetailsSection = ({ flightDetails, hotelTypes, packages }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box sx={{ mt: 4, p: isMobile?2:4, backgroundColor: '#f9f9f9', borderRadius: '16px' }}>
      {/* Main Heading */}
      <Typography
        variant={isMobile?'body2':'h5'}
        sx={{
          mb: 3,
          color: '#004e8c',
          fontWeight: 'bold',
          textAlign: 'center',
          letterSpacing: isMobile?'0.5px':'1px', // Add letter spacing for a cleaner look
        }}
      >
        What's Included in Your Umrah Package
      </Typography>

      <Divider sx={{ mb: 4, borderColor: '#004e8c' }} />

      {/* Inclusions and Exclusions Section */}
      <PackageInclusionsExclusions packages={packages} />

      <Divider sx={{ my: 4, borderColor: '#004e8c' }} />

      {/* Flight Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow for a premium feel
          transition: 'all 0.3s ease', // Smooth hover transition
          '&:hover': {
            transform: 'translateY(-4px)', // Small hover effect
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{fontSize:isMobile?'1rem':'1.5rem' ,color: '#ff8c42', fontWeight: 'bold', mb: isMobile?0:2, textAlign: 'center' }}
        >
          Flights
        </Typography>
        <FlightDetailsSection flightDetails={flightDetails} />
      </Paper>

      {/* Hotel Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)', // Slightly stronger shadow
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)', // Small hover effect
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontSize:isMobile?'1rem':'1.5rem' , color: '#ff8c42', fontWeight: 'bold', mb: isMobile?0:2, textAlign: 'center' }}
        >
          Hotels
        </Typography>
        <HotelDetailsSection hotelTypes={hotelTypes} />
      </Paper>

      <Divider sx={{ my: 4, borderColor: '#004e8c' }} />

      {/* Footer Text */}
      <Typography
        variant="body1"
        sx={{fontSize:isMobile?'0.5rem':'1rem' , color: '#004e8c', textAlign: 'center', fontStyle: 'italic', maxWidth: '800px', mx: 'auto' }}
      >
        These inclusions are part of your journey, offering you a seamless and memorable Umrah experience.
      </Typography>
    </Box>
  );
};

export default DetailsSection;
