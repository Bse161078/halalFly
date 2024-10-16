import React, { useState } from 'react';
import { Card, Paper, CardContent, Typography, Button, Select, MenuItem, Grid, Box } from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useNavigate } from 'react-router-dom';
import FlagIcon from '@mui/icons-material/Flag';

const LandPackageCard = ({ packageData }) => {
  const navigate = useNavigate();
  const {
    name,
    image,
    cities,
    packages,
    date_from_to,
    hotelTypes,
    transferDetails,
    activityDetails,
    PackagePrice,
    tripTypes
  } = packageData;

  const [selectedCurrency, setSelectedCurrency] = useState(PackagePrice[0]?.currency || 'USD');

  // Currency symbol mapping
  const currencySymbols = {
    USD: '$',
    Euro: '€',
    GBP: '£',
    PKR: '₨',
    AED: 'د.إ', // UAE Dirham
    SAR: '﷼',   // Saudi Riyal
  };

  const selectedPrice = PackagePrice.find(price => price.currency === selectedCurrency)?.value || 'N/A';

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleViewDetails = () => {
    navigate(`/land-package/${packageData.id}/details`, {
      state: { packageData }
    });
  };

  return (
    <Card
      sx={{
        margin: { xs: '10px', sm: '20px' },
        width: '100%',
        maxWidth: '500px',
        backgroundColor: "#FFFFFF",  // White background for a clean look
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)', // Slight scaling on hover
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)', // Add shadow on hover
        }
      }}
    >
      <img
        src={image[0]?.url}
        alt={image[0]?.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
        }}
      />

      <CardContent sx={{ padding: 3 }}>
        {/* Package Title */}
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: '#004e8c', fontSize: { xs: '1.2rem', sm: '1.5rem' }, fontWeight: 'bold' }}
        >
          {name} - {cities.map(city => city.cityTypes).join(', ')}
        </Typography>

        {/* Package Label */}
        {packages && (
          <Typography
            variant="subtitle1"
            sx={{ color: '#555555', fontSize: { xs: '0.9rem', sm: '1rem' }, mt: 1 }}
          >
            {packages?.LandPackages}
          </Typography>
        )}

        {/* Trip Types */}
        <Box sx={{ mt: 1, mb: 1 }}>
          {tripTypes.map(trip => (
            <Paper
              key={trip._id}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: 1,
                py: 0.5,
                bgcolor: "#004e8c", // Gold background
                borderRadius: 2,
                mr: 1,
              }}
            >
              <FlagIcon sx={{ color: "white", mr: 0.5, fontSize: 'small' }} />
              <Typography color="white" fontWeight="bold" variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                {trip.TripTypes}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Dates */}
        <Typography variant="body2" sx={{ color: '#004e8c', mt: 1 }}>
          {date_from_to[0].dateFrom} - {date_from_to[0].dateTo}
        </Typography>

        {/* Accommodation Options */}
        <Typography variant="body2" sx={{ color: '#004e8c', mt: 1 }}>
          Accommodation: {hotelTypes[0]?.hotelRoomPrice?.map(room => room.RoomTypes).join(', ')}
        </Typography>

        {/* Included Services Icons */}
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {transferDetails.length > 0 && (
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <DirectionsCarFilledIcon sx={{ color: "#FF8C42", mr: 0.5, fontSize: 'large' }} />
              <Typography color="#FF8C42" variant="caption">
                Transfers
              </Typography>
            </Grid>
          )}
          {hotelTypes.length > 0 && (
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <HotelIcon sx={{ color: "#FF8C42", mr: 0.5, fontSize: 'large' }} />
              <Typography color="#FF8C42" variant="caption">
                Hotels
              </Typography>
            </Grid>
          )}
          {activityDetails.length > 0 && (
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalActivityIcon sx={{ color: "#FF8C42", mr: 0.5, fontSize: 'large' }} />
              <Typography color="#FF8C42" variant="caption">
                Activities
              </Typography>
            </Grid>
          )}
        </Grid>

        {/* Price and Currency Selector */}
        {PackagePrice.length > 0 && (
          <>
            <Typography variant="body1" sx={{ color: '#004e8c', mt: 1 }}>
              Price:
              <Select
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                sx={{ ml: 2, minWidth: 100, backgroundColor: '#FFFFFF', color: '#004e8c' }}
                size="small"
              >
                {PackagePrice.map(price => (
                  <MenuItem key={price.currency} value={price.currency}>
                    {price.currency}
                  </MenuItem>
                ))}
              </Select>
            </Typography>

            <Typography variant="h6" sx={{ color: '#004e8c', mt: 1 }}>
              {currencySymbols[selectedCurrency] || selectedCurrency}:{selectedPrice}
            </Typography>
          </>
        )}

        {/* View Details Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#FF8C42', // Orange background
            mt: 2,
            width: '100%',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            '&:hover': {
              backgroundColor: '#E57435', // Slightly darker orange on hover
            }
          }}
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default LandPackageCard;
