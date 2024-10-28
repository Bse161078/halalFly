import React,{useState} from 'react';
import { Box, Typography, Grid, Paper,Tooltip,Dialog,Fade,DialogTitle,IconButton,DialogContent,DialogActions,Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HotelIcon from '@mui/icons-material/Hotel';
import CategoryIcon from '@mui/icons-material/Category';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';

const DetailsSection = ({ cities, hotelTypes, tripTypes, packages, Exclusion, Inclusions }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Handler to open Dialog with selected hotel
  const handleOpenDialog = (hotel) => {
    setSelectedHotel(hotel);
    setCurrentImageIndex(0); // Start with the first image
    setOpenDialog(true);
  };

  // Handler to close Dialog
  const handleCloseDialog = () => {
    setSelectedHotel(null);
    setCurrentImageIndex(0);
    setOpenDialog(false);
  };

  // Handlers to navigate through images
  const handlePrevImage = () => {
    if (selectedHotel && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedHotel && currentImageIndex < selectedHotel.image.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3} sx={{ marginLeft: 1 }}>
        {/* City Section */}
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 3,
              py: 2,
              bgcolor: "#FFE8EE",
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for better contrast
              transition: 'transform 0.3s ease', // Smooth hover transition
              '&:hover': {
                transform: 'translateY(-5px)', // Lift the card slightly on hover
              },
            }}
          >
            <LocationCityIcon sx={{ color: "#FF678C", mr: 2, fontSize: '1.5rem' }} />
            <Typography color="#FF678C" fontWeight="bold" variant="body1">
              Cities: {cities.map((city) => city.cityTypes).join(', ')}
            </Typography>
          </Paper>
        </Grid>

        {/* Hotels Section */}
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 3,
              py: 2,
              bgcolor: "#FFE8EE",
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <HotelIcon sx={{ color: "#FF678C", mr: 2, fontSize: '1.5rem' }} />
            <Typography color="#FF678C" fontWeight="bold" variant="body1">
              Hotels: {' '}
              {hotelTypes.map((hotel, index) => (
                <Tooltip
                key={hotel.id || index}
                title={
                  hotel.image && hotel.image.length > 0 ? (
                    <Box
                      component="img"
                      src={hotel.image[0].url} // Display the first image in the tooltip
                      alt={hotel.HotelNames} 
                      sx={{
                        width: 200, // Fixed width for consistency
                        height: 'auto',
                        borderRadius: 1, // Rounded corners
                        boxShadow: 3, // Subtle shadow for depth
                      }}
                    />
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No image available.
                    </Typography>
                  )
                }
                arrow
                placement="top"
              >
                <Box
                  component="span"
                  tabIndex={0}
                  onClick={() => handleOpenDialog(hotel)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleOpenDialog(hotel);
                    }
                  }}
                  sx={{ 
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    marginRight: index !== hotelTypes.length -1 ? '8px' : '0',
                    color: '#004e8c', // Primary color
                    '&:hover': {
                      color: '#ff8c42', // Secondary color on hover
                      transition: 'color 0.3s ease',
                    },
                    outline: 'none', // Remove default outline
                    '&:focus': {
                      boxShadow: `0 0 0 2px #ff8c42`, // Focus ring for accessibility
                      borderRadius: 1,
                    }
                  }}
                >
                  {hotel.HotelNames}
                  {index < hotelTypes.length -1 && ','}
                </Box>
              </Tooltip>
              ))}
            </Typography>
          </Paper>
        </Grid>

        {/* Trip Type Section */}
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 3,
              py: 2,
              bgcolor: "#FFE8EE",
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <CategoryIcon sx={{ color: "#FF678C", mr: 2, fontSize: '1.5rem' }} />
            <Typography color="#FF678C" fontWeight="bold" variant="body1">
              Trip Type: {tripTypes.map((trip) => trip.TripTypes).join(', ')}
            </Typography>
          </Paper>
        </Grid>

        {/* Package Section */}
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 3,
              py: 2,
              bgcolor: "#FFE8EE",
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <CardTravelIcon sx={{ color: "#FF678C", mr: 2, fontSize: '1.5rem' }} />
            <Typography color="#FF678C" fontWeight="bold" variant="body1">
              Package: {packages.LandPackages}
            </Typography>
          </Paper>
        </Grid>

        {/* Exclusion Section */}
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 3,
              py: 2,
              bgcolor: "#FFE8EE",
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <RemoveCircleIcon sx={{ color: "#FF678C", mr: 2, fontSize: '1.5rem' }} />
            <Typography color="#FF678C" fontWeight="bold" variant="body1">
              Exclusion: {Exclusion}
            </Typography>
          </Paper>
        </Grid>

        {/* Inclusion Section */}
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={3}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 3,
              py: 2,
              bgcolor: "#FFE8EE",
              borderRadius: 2,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
              },
            }}
          >
            <CheckCircleOutline sx={{ color: "#FF678C", mr: 2, fontSize: '1.5rem' }} />
            <Typography color="#FF678C" fontWeight="bold" variant="body1">
              Inclusion: {Inclusions}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* Dialog to Display Selected Hotel Images */}
      <Dialog 
      open={openDialog} 
      onClose={handleCloseDialog} 
      maxWidth="md" // Increased to "md" for larger size
      fullWidth
      aria-labelledby="image-dialog-title"
      TransitionComponent={Fade}
      keepMounted
    >
      {/* Dialog Title */}
      <DialogTitle
        id="image-dialog-title"
        sx={{
          bgcolor: '#004e8c',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Conditional Rendering for Hotel Name or Flight */}
        <Typography variant="h6">
          {selectedHotel?.HotelNames ? selectedHotel.HotelNames : selectedHotel?.flights}
        </Typography>
        
        {/* Close Button */}
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            color: '#fff',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      {/* Dialog Content */}
      <DialogContent 
        dividers 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          position: 'relative',
          bgcolor: '#f5f5f5'
        }}
      >
        {selectedHotel && selectedHotel.image && selectedHotel.image.length > 0 ? (
          <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            width="100%"
          >
            {/* Previous Button */}
            <IconButton 
              onClick={handlePrevImage} 
              disabled={currentImageIndex === 0}
              sx={{ 
                position: 'absolute', 
                left: 0, 
                color: '#004e8c',
                bgcolor: currentImageIndex === 0 ? 'transparent' : 'rgba(255, 140, 66, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 140, 66, 0.2)',
                }
              }}
              aria-label="previous image"
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            
            {/* Image Container */}
            <Box
              sx={{
                maxWidth: '80%',
                maxHeight: '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: '#fff',
              }}
            >
              <img 
                src={selectedHotel.image[currentImageIndex]?.formats?.medium?.url || selectedHotel.image[currentImageIndex]?.url} 
                alt={`${selectedHotel.HotelName || selectedHotel.flights} - Image ${currentImageIndex + 1}`} 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  borderRadius: '8px',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }} 
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </Box>
            
            {/* Next Button */}
            <IconButton 
              onClick={handleNextImage} 
              disabled={currentImageIndex === selectedHotel.image.length -1}
              sx={{ 
                position: 'absolute', 
                right: 0, 
                color: '#004e8c',
                bgcolor: currentImageIndex === selectedHotel.image.length -1 ? 'transparent' : 'rgba(255, 140, 66, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 140, 66, 0.2)',
                }
              }}
              aria-label="next image"
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No images available for this {selectedHotel?.HotelName ? 'hotel' : 'flight'}.
          </Typography>
        )}
      </DialogContent>
      
      {/* Dialog Actions */}
      <DialogActions sx={{ padding: '16px 24px', justifyContent: 'flex-end', bgcolor: '#f5f5f5' }}>
        <Button 
          onClick={handleCloseDialog} 
          variant="contained" 
          color="primary"
          sx={{
            bgcolor: '#ff8c42',
            color: '#fff',
            '&:hover': {
              bgcolor: '#e07b39',
            }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default DetailsSection;
