import React from 'react';
import { Modal, Paper, Typography, Divider, Button, Grid } from '@mui/material';

const VisaDescriptionModal = ({ visaDescriptionOpen, handleClose, visaDescription, tourismVisaCountries }) => {
  console.log("visaDescription", visaDescription, tourismVisaCountries);

  return (
    <Modal open={visaDescriptionOpen} onClose={handleClose}>
  <Paper
    sx={{
      padding: '30px',
      maxWidth: '700px',
      margin: '80px auto',
      borderRadius: '12px',
      maxHeight: '80vh',
      overflowY: 'auto',
      color: '#004e8c', // Blue text color for the title
      backgroundColor: '#ffffff', // White background for contrast
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', // Lighter shadow
    }}
  >
    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#004e8c' }}>
      Visa Information
    </Typography>

    {visaDescription ? (
      visaDescription.split(/\n\n/).map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {section.split('\n').map((line, index) => (
            <Typography key={index} gutterBottom sx={{ color: '#004e8c' }}>
              {line}
            </Typography>
          ))}
          {sectionIndex < visaDescription.split(/\n\n/).length - 1 && (
            <Divider sx={{ my: 3, backgroundColor: '#FF8C42' }} /> // Orange Divider
          )}
        </div>
      ))
    ) : (
      <Typography gutterBottom>No visa information available.</Typography>
    )}

    <Divider sx={{ my: 3, backgroundColor: '#FF8C42' }} /> {/* Orange Divider */}

    {tourismVisaCountries && tourismVisaCountries.length > 0 ? (
      <Grid container spacing={2}>
        {tourismVisaCountries.map((country, index) => (
          <Grid item xs={6} sm={6} md={4} key={index}>
            <Typography variant="body2" sx={{ color: '#004e8c' }}>
              {country}
            </Typography>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography gutterBottom>No tourism visa countries available.</Typography>
    )}

    <Button
      onClick={handleClose}
      sx={{
        mt: 3,
        backgroundColor: '#004e8c', // Blue button background
        color: '#fff',
        fontWeight: 'bold',
        padding: '12px',
        borderRadius: '50px',
        '&:hover': { backgroundColor: '#00336a' }, // Darker blue on hover
        transition: 'background-color 0.3s ease',
      }}
      variant="contained"
      fullWidth
    >
      Schließen
    </Button>
  </Paper>
</Modal>

  );
};

export default VisaDescriptionModal;
