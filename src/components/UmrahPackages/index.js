import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Select, MenuItem, Grid, Box, Paper } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import FlagIcon from '@mui/icons-material/Flag';
import { useNavigate } from 'react-router-dom';

const UmrahPackageCard = ({ packageData }) => {
  const navigate = useNavigate();

  const {
    title,
    label,
    image = [],
    packageDateRange = [],
    hotelTypes = [],
    transferDetails,
    activityDetails,
    cities = [],
    tripTypes = [],
    price: PackagePrice = [],
    flightDetails,
  } = packageData || {};

  const currencySymbols = {
    USD: '$',
    Euro: '€',
    GBP: '£',
    PKR: '₨',
    AED: 'د.إ', // UAE Dirham
    SAR: '﷼',   // Saudi Riyal
  };

  const [selectedCurrency, setSelectedCurrency] = useState(
    PackagePrice.length > 0 ? PackagePrice[0].currency : 'USD'
  );
  const selectedPrice = PackagePrice?.find(price => price.currency === selectedCurrency)?.value || 'N/A';

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleViewDetails = () => {
    navigate(`/umrah-package/${packageData?.id}/details`, {
      state: { packageData }
    });
  };

  return (
    <Card
      sx={{
        margin: { xs: '10px', sm: '20px' },
        width: '100%',
        maxWidth: '500px',
        backgroundColor: "#004e8c",  // Blue background for the card
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', // Softer shadow
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)', // Slight scaling on hover for interactivity
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', // Light shadow on hover
        }
      }}
    >
      <img
        src={image.length > 0 ? image[0].url : '/default.jpg'}
        alt={image.length > 0 ? image[0].name : 'No image available'}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        }}
      />

      <CardContent sx={{ backgroundColor: '#FFFFFF' }}>
        {/* Title and City Names */}
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: '#FF8C42', fontSize: { xs: '1.2rem', sm: '1.5rem' }, fontWeight: 'bold' }}
        >
          {title} - {cities.map(city => city.CityTypes).join(', ')}
        </Typography>

        {/* Label */}
        {label && (
          <Typography
            variant="subtitle1"
            sx={{ color: '#555555', fontSize: { xs: '0.9rem', sm: '1rem' }, mt: 1 }}
          >
            {label}
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
                bgcolor: "#FF8C42", // Orange background
                borderRadius: 2,
                mr: 1,
              }}
            >
              <FlagIcon sx={{ color: "#FFFFFF", mr: 0.5, fontSize: 'small' }} />
              <Typography color="#FFFFFF" fontWeight="bold" variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.85rem' } }}>
                {trip.TripTypes}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Dates */}
        {packageDateRange.length > 0 && (
          <Typography variant="body2" sx={{ color: '#333333', mt: 1 }}>
            {packageDateRange[0]?.dateFrom} - {packageDateRange[0]?.dateTo}
          </Typography>
        )}

        {/* Accommodation */}
        {hotelTypes?.length > 0 && (
          <Typography variant="body2" sx={{ color: '#333333', mt: 1 }}>
            Accommodation: {hotelTypes[0]?.hotelRoomPrice?.map(room => room.RoomTypes).join(', ')}
          </Typography>
        )}

        {/* Included Services */}
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {transferDetails?.isTransferIncluded && (
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <DirectionsCarFilledIcon sx={{ color: "#FF8C42", mr: 0.5, fontSize: 'large' }} />
              <Typography color="#FF8C42" variant="caption">
                Transfers
              </Typography>
            </Grid>
          )}
          {flightDetails?.length > 0 && (
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <FlightIcon sx={{ color: "#FF8C42", mr: 0.5, fontSize: 'large' }} />
              <Typography color="#FF8C42" variant="caption">
                Flights
              </Typography>
            </Grid>
          )}
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <HotelIcon sx={{ color: "#FF8C42", mr: 0.5, fontSize: 'large' }} />
            <Typography color="#FF8C42" variant="caption">
              Hotels
            </Typography>
          </Grid>
          {activityDetails?.length > 0 && (
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
            <Typography variant="body1" sx={{ color: '#333333', mt: 1 }}>
              Price:
              <Select
                value={selectedCurrency}
                onChange={handleCurrencyChange}
                sx={{ ml: 2, minWidth: 100, backgroundColor: '#F0F0F0', color: '#004e8c' }}
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
            backgroundColor: '#FF8C42',
            mt: 2,
            width: '100%',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            '&:hover': {
              backgroundColor: '#E07032',
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

export default UmrahPackageCard;
