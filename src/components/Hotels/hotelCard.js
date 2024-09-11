
import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';

const HotelCard = ({ hotel }) => {
  return (
    <Card style={{ margin: '20px', background: "#FAF3E0" }}>
      <CardContent>
        <img src={hotel.image[0]?.url} alt={hotel.image[0]?.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <Typography variant="h5" component="h2" style={{ color: '#004225' }}>
          {hotel.name}
        </Typography>
        <Typography variant="body1" style={{ color: '#4D4D4D' }}>
          {hotel.location}
        </Typography>
        <Typography variant="body1" style={{ color: '#004225' }}>
          Price: {hotel.price_per_night}
        </Typography>
        <Typography variant="body2" style={{ color: '#A9A9A9' }}>
          Rating: {hotel.rating} ★
        </Typography>
        <Button variant="contained" color="primary" style={{ background: '#004225', marginTop: '10px' }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default HotelCard;
  