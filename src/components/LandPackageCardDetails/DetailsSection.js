import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HotelIcon from '@mui/icons-material/Hotel';
import CategoryIcon from '@mui/icons-material/Category';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';

const DetailsSection = ({ cities, hotelTypes, tripTypes, packages, Exclusion, Inclusions }) => {
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
              Hotels: {hotelTypes.map((hotel) => hotel.HotelNames).join(', ')}
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
    </Box>
  );
};

export default DetailsSection;
