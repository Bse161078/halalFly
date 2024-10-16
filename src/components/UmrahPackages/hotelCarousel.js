import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getHotelTravelCardsApiReset } from 'src/reducers';
import { getHotelTravelCardsApi } from 'src/services';
import CustomCarousel from './CustomCarousel';  // Make sure this path is correct

export default function UmrahHajjCarousel() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Use breakpoint for mobile responsiveness

  const dispatch = useDispatch();
  const { data: allTravelCards, loading, error } = useSelector((state) => state.getHotelTravelCardsApiReducer);

  useEffect(() => {
    dispatch(getHotelTravelCardsApi());
    return () => {
      dispatch(getHotelTravelCardsApiReset());
    };
  }, [dispatch]);

  const handleCurrencyChange = (event, currency) => {
    setSelectedCurrency(currency);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, bgcolor: 'error.light', borderRadius: 1, m: 2 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!allTravelCards || allTravelCards.length === 0) {
    return (
      <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1, m: 2 }}>
        <Typography>No Umrah Packages available at the moment. Please check back later.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', p: isMobile ? 1 : 2 }}>
      <Typography
        id="umrah-packages"
        variant={isMobile ? 'h6' : 'h5'}
        gutterBottom
        sx={{
          textAlign: 'center',
          mb: isMobile ? 2 : 3,
          fontSize: { xs: '1.2rem', sm: '1.5rem' }, // Dynamic font size
          color: { xs: '#FAF3E0', sm: '#004225', md: '#FAF3E0' } // Dynamically change color based on screen size
        }}
      >
        Umrah & Hajj Packages
      </Typography>

      <CustomCarousel
        items={allTravelCards}
        selectedCurrency={selectedCurrency}
        onCurrencyChange={handleCurrencyChange}
        isMobile={isMobile}
      />
    </Box>
  );
}
