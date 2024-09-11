import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Divider, Grid, Paper, CardMedia, CardContent, Select, MenuItem, Typography } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

const PackageCard = ({ title, imageUrl, prices, selectedCurrency, onCurrencyChange, label, destinations, pricingNote }) => {
  const [localCurrency, setLocalCurrency] = useState(selectedCurrency);
  const cardRef = useRef(null);

  const handleCurrencyChange = (event) => {
    const currency = event.target.value;
    setLocalCurrency(currency);
    onCurrencyChange(currency);
  };

  const price = prices.find(p => p.currency === localCurrency)?.value || 'N/A';

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
        transition: 'transform 0.2s',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      ref={cardRef}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{ width: '100%', height: { xs: '150px', sm: '200px' } }}
      />
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" color="black" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          {title}
        </Typography>
        
        <Box sx={{ mt: 1, mb: 1 }}>
          <Paper sx={{ display: 'inline-flex', alignItems: 'center', px: 1, py: 0.5, bgcolor: "#FFE8EE", borderRadius: 2 }}>
            <FlagIcon sx={{ color: "#FF678C", mr: 0.5, fontSize: 'small' }} />
            <Typography color="#FF678C" fontWeight="bold" variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
              {label}
            </Typography>
          </Paper>
        </Box>

        <Typography color="#A0A7B5" fontWeight="bold" variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
          Destination: {destinations}
        </Typography>

        <Grid container spacing={1} sx={{ mt: 1 }}>
          {[
            { Icon: FlightIcon, text: "Flights" },
            { Icon: DirectionsCarFilledIcon, text: "Transfers" },
            { Icon: HotelIcon, text: "Hotels" },
            { Icon: LocalActivityIcon, text: "Activities" }
          ].map(({ Icon, text }, index) => (
            <Grid item key={index} xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon sx={{ color: "#A0A7B5", mr: 0.5, fontSize: 'small' }} />
              <Typography color="#A0A7B5" fontWeight="bold" variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                {text}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' } }}>
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Typography color="black" fontWeight="bold" variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              {localCurrency} {price}
            </Typography>
            <Typography color="#A0A7B5" fontWeight="bold" variant="body2" sx={{ mt: 1, fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
              Pricing Note: {pricingNote}
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#FAF3E0",
              color: "#004225",
              borderRadius: "15px",
              textTransform: "none",
              fontWeight: "bold",
              width: { xs: '100%', sm: 'auto' },
              padding: { xs: '8px 12px', sm: '10px 16px' },
              fontSize: { xs: '0.8rem', sm: '1rem' },
              '&:hover': {
                bgcolor: "#E3D8B8"
              }
            }}
          >
            View Details
          </Button>
        </Box>

        <Select
          value={localCurrency}
          onChange={handleCurrencyChange}
          sx={{ mt: 2, width: '100%', fontSize: { xs: '0.8rem', sm: '1rem' } }}
        >
          {prices.map((price) => (
            <MenuItem key={price.currency} value={price.currency}>
              {price.currency}
            </MenuItem>
          ))}
        </Select>
      </CardContent>
    </Paper>
  );
};

export default PackageCard;