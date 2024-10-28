import React, { useState } from 'react';
import { Container, useTheme, useMediaQuery, Grid, Typography, Box } from '@mui/material';
import ContactUsForm from './index'; // Import your ContactUsForm component
import BusinessCollaborationForm from '../BuisnessCollaborationForm'; // Import your BusinessCollaborationForm component

const ContactUs = () => {
  // State to manage which form is selected
  const [selectedForm, setSelectedForm] = useState('contactUs');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle form selection from the dropdown menu
  const handleFormChange = (event) => {
    setSelectedForm(event.target.value);
  };

  return (
    <Container maxWidth="md"  sx={{
      width: '100%',
      mt: isMobile ? 3 : 5,
      padding: isMobile ? 0 : { xs: 2, md: 6 },
      borderRadius: isMobile ? 0 : 3,
      backgroundColor: '#fff',
    }}>
    {/* Main Heading */}
  {/* Main Heading */}
  <Typography
  variant={isMobile?'h6':"h4"}
  align="center"
  sx={{
    color: '#FF8C42', // Vibrant orange to stand out
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: { xs: 0, md: 10 }, // Responsive margin
    letterSpacing: isMobile?'0px':'0.5px',
    textTransform: 'uppercase',
    fontSize: { xs: '1.5rem', md: '3rem' }, // Responsive font size
  }}
>
  Get In Touch With Us
</Typography>


  



      {/* Dropdown Menu for Selecting Form */}
      {/* <Grid container justifyContent="center" sx={{ marginBottom: 4 }}>
        <Box sx={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Select
            value={selectedForm}
            onChange={handleFormChange}
            displayEmpty
            sx={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '5px',
              backgroundColor: '#f5f5f5',
              color: '#004e8c',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#e6e6e6',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
              '& .MuiSelect-icon': {
                color: '#004e8c', // Blue arrow color
              },
            }}
          >
            <MenuItem value="contactUs">Contact Us Form</MenuItem>
            <MenuItem value="businessCollaboration">Business Collaboration Form</MenuItem>
          </Select>
        </Box>
      </Grid> */}

      {/* Animated Form Appearance */}
      <Box
        sx={{
          mt: isMobile?2:4,
          opacity: 1,
          transform:  'translateY(-20px)',
          transition: 'all 0.5s ease',
          position: 'relative',
        }}
      >
        {<ContactUsForm />}
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
