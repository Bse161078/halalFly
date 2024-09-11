import React from 'react';
import { Grid } from '@mui/material';
import HotelCard from './hotelCard'; // Adjust import path as needed
import { useLocation } from 'react-router-dom';

const HotelList = () => {
  const location = useLocation();
  const { allHotels } = location.state || {};
  
  console.log("ALLHOTELS", allHotels); // Ensure this is logging the correct data

  return (
    <Grid container style={{ background: "#FAF3E0", padding: '40px' }}>
      {allHotels && allHotels.length > 0 ? (
        allHotels.map(hotel => (
          <Grid item xs={12} sm={6} md={4} key={hotel.id}>
            <HotelCard hotel={hotel} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <p>No hotels available.</p>
        </Grid>
      )}
    </Grid>
  );
};

export default HotelList;
