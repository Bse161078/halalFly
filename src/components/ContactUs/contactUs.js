import React, { useState } from 'react';
import { Container, useTheme, useMediaQuery, Grid, Typography, Box, Select, MenuItem } from '@mui/material';
import ContactUsForm from './index'; // Import your ContactUsForm component
import BusinessCollaborationForm from '../BuisnessCollaborationForm'; // Import your BusinessCollaborationForm component
import Translation_german from '../Translation/translation_german';

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedForm, setSelectedForm] = useState('contactUs'); // State for switching between forms

  const handleFormChange = (event) => {
    setSelectedForm(event.target.value); // Switch between forms based on dropdown selection
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        width: '100%',
        mt: isMobile ? 3 : 5,
        padding: isMobile ? 0 : { xs: 2, md: 6 },
        borderRadius: isMobile ? 0 : 3,
        backgroundColor: '#fff',
      }}
    >
      {/* Main Heading */}
      <Typography
        variant={isMobile ? 'h6' : 'h4'}
        align="center"
        sx={{
          color: '#FF8C42', // Vibrant orange to stand out
          fontWeight: 'bold',
          marginBottom: 4,
          marginLeft: { xs: 0, md: 10 }, // Responsive margin
          letterSpacing: isMobile ? '0px' : '0.5px',
          textTransform: 'uppercase',
          fontSize: { xs: '1.5rem', md: '3rem' }, // Responsive font size
        }}
      >
        {Translation_german.CONTACT_US_HEADING} {/* Using translation for "Get in Touch" */}
      </Typography>

      

      {/* Animated Form Appearance */}
      <Box
        sx={{
          mt: isMobile ? 2 : 4,
          opacity: selectedForm === 'contactUs' ? 1 : 0,
          transform: selectedForm === 'contactUs' ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.5s ease',
          position: 'relative',
        }}
      >
        {<ContactUsForm />} {/* Display Contact Us form */}
      </Box>

      {/* <Box
        sx={{
          mt: 4,
          opacity: selectedForm === 'businessCollaboration' ? 1 : 0,
          transform: selectedForm === 'businessCollaboration' ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.5s ease',
          position: 'relative',
        }}
      >
        {selectedForm === 'businessCollaboration' && <BusinessCollaborationForm />}
      </Box> */}
    </Container>
  );
};

export default ContactUs;
