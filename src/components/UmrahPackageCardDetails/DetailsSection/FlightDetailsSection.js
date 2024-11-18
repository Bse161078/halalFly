import React, { useState } from 'react';
import { useTheme,useMediaQuery,Box, Typography, Grid, Paper, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import Translation_german from 'src/components/Translation/translation_german';
const FlightDetailsSection = ({ flightDetails }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // Open the modal and set the current image
  const handleOpenDialog = (flight, index) => {
    setCurrentImage(flight.image[0].url);
    setCurrentImageIndex(index);
    setOpenDialog(true);
  };

  // Close the modal
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Navigate to the previous image
  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImage(flightDetails[currentImageIndex - 1]?.image[0]?.url);
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Navigate to the next image
  const handleNextImage = () => {
    if (currentImageIndex < flightDetails.length - 1) {
      setCurrentImage(flightDetails[currentImageIndex + 1]?.image[0]?.url);
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
    {/* Header Section */}
    <Typography variant="h5" sx={{ fontSize: isMobile ? '0.65rem' : '1rem', fontWeight: 'bold', color: '#004e8c', textAlign: 'center', mb: isMobile ? 1 : 3 }}>
      {Translation_german.FLIGHT_INCLUDED_TITLE}
    </Typography>
    <Typography variant="body2" sx={{ fontSize: isMobile ? '0.55rem' : '1rem', color: '#8d8d8d', textAlign: 'center', mb: isMobile ? 1 : 4 }}>
      {Translation_german.FLIGHT_SELECTION_MESSAGE.replace('{flightDetails.length}', flightDetails.length)}
    </Typography>

    {/* Flight Details */}
    <Grid container spacing={3} justifyContent="center">
      {flightDetails.map((flight, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              },
            }}
            onClick={() => handleOpenDialog(flight, index)}
          >
            <Box
              component="img"
              src={flight?.image[0]?.url || 'https://via.placeholder.com/300'}
              alt={flight?.flights}
              sx={{ width: '100%', height: isMobile ? '150px' : '250px', objectFit: isMobile ? 'cover' : 'contain', borderRadius: '8px' }}
            />
            <Typography variant="h6" sx={{ fontSize: isMobile ? '0.65rem' : '1rem', fontWeight: 'bold', color: '#004e8c', mt: 2, textAlign: 'center' }}>
              {flight.flights}
            </Typography>
            {/* <Typography variant="body2" sx={{ fontSize: isMobile ? '0.65rem' : '1rem', color: '#8d8d8d', textAlign: 'center' }}>
              {Translation_german.DEPARTURE_LABEL}: {flight.departure} | {Translation_german.ARRIVAL_LABEL}: {flight.arrival}
            </Typography> */}
          </Paper>
        </Grid>
      ))}
    </Grid>

    {/* Dialog for Image Viewing */}
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{ bgcolor: '#004e8c', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="h6">{Translation_german.FLIGHT_IMAGE_TITLE}</Typography>
        <IconButton onClick={handleCloseDialog} sx={{ color: '#fff' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ position: 'relative', textAlign: 'center', p: 0 }}>
        {/* Image Navigation Buttons */}
        <IconButton
          onClick={handlePrevImage}
          disabled={currentImageIndex === 0}
          sx={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Image */}
        <Box
          component="img"
          src={currentImage}
          alt="Flight Image"
          sx={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', display: 'block', margin: '0 auto' }}
        />

        <IconButton
          onClick={handleNextImage}
          disabled={currentImageIndex === flightDetails.length - 1}
          sx={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </DialogContent>
    </Dialog>
  </Box>
  );
};

export default FlightDetailsSection;
