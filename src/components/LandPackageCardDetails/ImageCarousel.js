import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Box,useMediaQuery,useTheme,Grid,Typography,IconButton } from '@mui/material';
import Translation_german from '../Translation/translation_german';

const ImageCarousel = ({ images }) => {
  const [open, setOpen] = useState(false); // For controlling the modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // To track which image is being viewed
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  const handleClickOpen = (index) => {
    setCurrentImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Left: Large Image */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: '10px',
              overflow: 'hidden',
              cursor: 'pointer',
              '& img': {
                transition: 'transform 0.3s ease', // Smooth transition for hover effect
              },
              '&:hover img': {
                transform: 'scale(1.05)', // Scale up image on hover
              },
            }}
            onClick={() => handleClickOpen(0)} // Open modal with the first image
          >
            <img
              src={images[0]?.url}
              alt={images[0]?.name}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'contain', // Cover instead of contain for a more immersive look
                borderRadius: '8px',
              }}
            />
          </Box>
        </Grid>

        {/* Right: Smaller Images in Grid */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={1}>
            {images.slice(1, 5).map((img, index) => (
              <Grid item xs={6} key={index}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '& img': {
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => handleClickOpen(index + 1)} // Open modal with the clicked image
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              </Grid>
            ))}

            {/* View All Photos Overlay */}
            {images.length > 5 && (
              <Grid item xs={6}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '& img': {
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => handleClickOpen(5)} // Open modal with the 6th image
                >
                  <img
                    src={images[5]?.url}
                    alt="View All"
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      filter: 'brightness(50%)', // Darken the image for the "View All" effect
                    }}
                  />
                  <Typography
                    variant={isMobile?'body2':"h6"}
                    sx={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  >
                    {Translation_german.VIEW_ALL_PHOTOS_BUTTON}
                    </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Full-Screen Image Modal */}
      {open && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)', // Black background
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
          }}
          onClick={handleClose} // Close when clicking on the background
        >
          <Box sx={{ position: 'relative', textAlign: 'center' }}>
            {/* Close Button */}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: '#fff',
              }}
            >
              <CloseIcon sx={{ fontSize: '30px' }} />
            </IconButton>

            {/* Previous Image Button */}
            {currentImageIndex > 0 && (
              <IconButton
                aria-label="previous"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from propagating to the background
                  handlePrevImage();
                }}
                sx={{
                  position: 'absolute',
                  left: '-20px', // Position to the far left
                  top: '50%',
                  transform: 'translateY(-50%)', // Center vertically
                  color: '#fff',
                  fontSize: '40px',
                }}
              >
                <ArrowBackIosIcon sx={{ fontSize: '40px' }} />
              </IconButton>
            )}

            {/* Display Full Image */}
            <img
              src={images[currentImageIndex]?.url}
              alt="Full-size preview"
              style={{
                maxWidth: '90%',
                maxHeight: '90vh',
                objectFit: 'cover', // Ensure images look good
                borderRadius: '8px',
              }}
            />

            {/* Next Image Button */}
            {currentImageIndex < images.length - 1 && (
              <IconButton
                aria-label="next"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from propagating to the background
                  handleNextImage();
                }}
                sx={{
                  position: 'absolute',
                  right: '-20px', // Position to the far right
                  top: '50%',
                  transform: 'translateY(-50%)', // Center vertically
                  color: '#fff',
                  fontSize: '40px',
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: '40px' }} />
              </IconButton>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ImageCarousel;
