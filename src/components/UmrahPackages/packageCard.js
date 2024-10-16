import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Grid, Paper, CardMedia, CardContent, Select, MenuItem, Typography } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useNavigate } from "react-router-dom";

const PackageCard = ({ title, imageUrl, prices, packageId, selectedCurrency, onCurrencyChange, label, destinations, flightsIncluded, activityIncluded, transfersIncluded }) => {
  const [localCurrency, setLocalCurrency] = useState(selectedCurrency);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const handleCurrencyChange = (event) => {
    event.stopPropagation();
    const currency = event.target.value;
    setLocalCurrency(currency);
    onCurrencyChange(currency);
  };

  const price = prices?.find(p => p.currency === localCurrency)?.value || 'N/A';

  // Mouse hover effect (3D rotation)
  useEffect(() => {
    const card = cardRef.current;

    function handleMouseMove(e) {
      const box = card.getBoundingClientRect();
      const centerX = box.left + box.width / 2;
      const centerY = box.top + box.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (-1) * (10 * mouseY) / (box.height / 2);
      const rotateY = (10 * mouseX) / (box.width / 2);

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function handleMouseLeave() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSelection = () => {
    navigate(`/package/${packageId}/details`, {
      state: {
        packages: packageId
      },
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: '500px',
        margin: '16px auto',
        borderRadius: "10px",
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s ease-in-out',
        backgroundColor: '#ffffff', // White background for clean look
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          transform: 'scale(1.05)', // Scale on hover
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)', // Deeper shadow on hover
        }
      }}
      ref={cardRef} // Adding the ref to the card
    >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{ width: '100%', height: { xs: '150px', sm: '200px' }, objectFit: 'cover' }}
      />
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Title */}
        <Typography variant="h5" color="#004e8c" fontWeight="bold" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' }, mt: 1 }}>
          {title}
        </Typography>

        {/* Label */}
        <Box sx={{ mt: 1, mb: 1 }}>
          <Paper sx={{ display: 'inline-flex', alignItems: 'center', px: 1, py: 0.5, bgcolor: "#E5F8EB", borderRadius: 2 }}>
            <FlagIcon sx={{ color: "#004e8c", mr: 0.5, fontSize: 'small' }} />
            <Typography color="#004e8c" fontWeight="bold" variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
              {label}
            </Typography>
          </Paper>
        </Box>

        {/* Destination */}
        <Typography color="#A0A7B5" fontWeight="bold" variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
          Destination: {destinations || "N/A"}
        </Typography>

        {/* Icons for included services */}
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {flightsIncluded && (
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <FlightIcon sx={{ color: "#ff8c42", mr: 0.5, fontSize: 'small' }} />
              <Typography color="#ff8c42" fontWeight="bold" variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                Flights
              </Typography>
            </Grid>
          )}
          {transfersIncluded && (
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <DirectionsCarFilledIcon sx={{ color: "#ff8c42", mr: 0.5, fontSize: 'small' }} />
              <Typography color="#ff8c42" fontWeight="bold" variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                Transfers
              </Typography>
            </Grid>
          )}
          <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <HotelIcon sx={{ color: "#ff8c42", mr: 0.5, fontSize: 'small' }} />
            <Typography color="#ff8c42" fontWeight="bold" variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
              Hotels
            </Typography>
          </Grid>
          {activityIncluded && (
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalActivityIcon sx={{ color: "#ff8c42", mr: 0.5, fontSize: 'small' }} />
              <Typography color="#ff8c42" fontWeight="bold" variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                Activities
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Currency Selector and Price */}
        <Typography variant="body1" sx={{ color: '#004e8c', mt: 1 }}>
          Price:
          <Select
            value={localCurrency}
            onChange={handleCurrencyChange}
            sx={{ ml: 2, minWidth: 100 }}
          >
            {prices?.map(price => (
              <MenuItem key={price.currency} value={price.currency}>
                {price.currency}
              </MenuItem>
            ))}
          </Select>
        </Typography>

        <Typography variant="h6" sx={{ color: '#004e8c', mt: 1 }}>
          {localCurrency}: ${price}
        </Typography>

        {/* Action Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#004e8c',
            mt: 2,
            width: '100%',
            fontSize: { xs: '0.8rem', sm: '1rem' },
            '&:hover': {
              backgroundColor: '#003366',
            }
          }}
          onClick={handleSelection}
        >
          View Details
        </Button>
      </CardContent>
    </Paper>
  );
};

export default PackageCard;
