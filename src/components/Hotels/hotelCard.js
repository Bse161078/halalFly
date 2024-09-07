
  import React from 'react';
  import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
  
  const HotelCard = ({ hotel }) => {
    return (
      <Card style={{ margin: '20px', background: "#FAF3E0" }}>
        <CardContent>
          <img src={hotel.imageUrl} alt={hotel.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
          <Typography variant="h5" component="h2" style={{ color: '#004225' }}>
            {hotel.name}
          </Typography>
          <Typography variant="body1" style={{ color: '#4D4D4D' }}>
            {hotel.location}
          </Typography>
          <Typography variant="body1" style={{ color: '#004225' }}>
            Price: {hotel.price}
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
    