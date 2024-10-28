import React, { useState } from 'react';
import { useTheme,useMediaQuery,Box, Typography, Grid, Paper, Dialog, DialogContent, IconButton, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const HotelDetailsSection = ({ hotelTypes }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentHotel, setCurrentHotel] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // Open the modal and set the current image
  const handleOpenDialog = (hotel, index) => {
    setCurrentImage(hotel.image[index].url); // Start with the clicked image
    setCurrentImageIndex(index); // Set image index to clicked image
    setCurrentHotel(hotel); // Set the selected hotel
    setOpenDialog(true);
  };

  // Close the modal
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Navigate to the previous image
  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImage(currentHotel.image[currentImageIndex - 1]?.url);
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Navigate to the next image
  const handleNextImage = () => {
    if (currentImageIndex < currentHotel.image.length - 1) {
      setCurrentImage(currentHotel.image[currentImageIndex + 1]?.url);
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* Iterate through each hotel */}
      {hotelTypes.map((hotel, index) => (
        <Box key={hotel._id} sx={{ mt: 4 }}>
          {/* Hotel Name and Location */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#004e8c', // Dark blue color for the hotel title
              mb: 2,
              fontSize: isMobile ? '0.55rem' : '1rem', // Adjust font size for mobile
            }}
          >
            Hotels in {hotel.city}: {hotel.HotelNames}
          </Typography>

          {/* Hotel Images Grid */}
          <Grid container spacing={2}>
            {/* Large Feature Image */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: isMobile?'0px':'12px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)', // Lift effect on hover
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', // Soft shadow on hover
                  },
                }}
                onClick={() => handleOpenDialog(hotel, 0)}
              >
                <Box
                  component="img"
                  src={hotel?.image[0]?.formats?.large?.url || hotel?.image[0]?.url}
                  alt={hotel?.HotelNames}
                  sx={{
                    width: '100%',
                    height: isMobile?'200px':'400px',
                    objectFit: 'cover',
                  }}
                />
              </Paper>
            </Grid>

            {/* Thumbnail Images */}
            <Grid item xs={12} md={4}>
              <Grid container spacing={1}>
                {hotel.image.slice(1, 5).map((img, imgIndex) => (
                  <Grid item xs={6} key={img._id}>
                    <Paper
                      elevation={3}
                      sx={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.05)', // Zoom effect on hover
                        },
                      }}
                      onClick={() => handleOpenDialog(hotel, imgIndex + 1)}
                    >
                      <Box
                        component="img"
                        src={img.formats?.thumbnail?.url || img.url}
                        alt={img.name}
                        sx={{ width: '100%', height: '100px', objectFit: 'cover' }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {/* "View All Photos" Button */}
              {hotel.image.length > 5 && (
                <Button
                  variant="outlined"
                  sx={{
                    display: 'block',
                    margin: '0 auto',
                    color: '#004e8c',
                    borderColor: '#004e8c',
                    mt: 2,
                    '&:hover': { backgroundColor: '#004e8c', color: '#fff' },
                  }}
                  onClick={() => handleOpenDialog(hotel, 0)}
                >
                  View all photos
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      ))}

      {/* Image Dialog for Viewing Photos */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark background for focus
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent sx={{ position: 'relative', textAlign: 'center', p: 0 }}>
          {/* Previous Image Button */}
          <IconButton
            onClick={handlePrevImage}
            disabled={currentImageIndex === 0}
            sx={{
              position: 'absolute',
              left: isMobile?'0px':'10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* Current Image */}
          <Box
            component="img"
            src={currentImage}
            alt="Hotel Image"
            sx={{
              maxWidth: isMobile?'100%':'90%',
              maxHeight: '80vh',
              objectFit: 'contain',
              display: 'block',
              margin: '0 auto',
            }}
          />

          {/* Next Image Button */}
          <IconButton
            onClick={handleNextImage}
            disabled={currentImageIndex === currentHotel?.image.length - 1}
            sx={{
              position: 'absolute',
              right: isMobile?'0px':'10px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Close Button */}
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              top: isMobile?'0px':'10px',
              right: '10px',
              color: '#fff',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default HotelDetailsSection;
