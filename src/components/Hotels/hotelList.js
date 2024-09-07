import React from 'react';
import { Grid } from '@mui/material';
import HotelCard from './hotelCard'; // Assuming the component is in the same folder
const hotels = [
    {
      id: 1,
      name: 'Voco Makkah an IHG Hotel',
      location: 'Makkah, Saudi Arabia',
      price: '22,425.03',
      rating: '4.5',
      imageUrl: 'https://cdn.pixabay.com/photo/2017/08/06/14/56/people-2593251_1280.jpg'
    },
    {
      id: 2,
      name: 'Crowne Plaza Madinah',
      location: 'Madinah, Saudi Arabia',
      price: '36,777.50',
      rating: '4.7',
      imageUrl: 'https://pixabay.com/photos/lobby-hotel-interior-hallway-398845/'
    },
    {
      id: 3,
      name: 'Anwar Al Madinah Movenpick Hotel',
      location: 'Madinah, Saudi Arabia',
      price: '53,820.82',
      rating: '4.8',
      imageUrl: 'https://cdn.pixabay.com/photo/2012/11/21/10/24/building-66789_1280.jpg'
    }
  ];
const HotelList = () => {
  return (
    <Grid container style={{background: "#FAF3E0", padding: '40px'}}>
      {hotels.map(hotel => (
        <Grid item xs={12} sm={6} md={4} key={hotel.id}>
          <HotelCard hotel={hotel} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HotelList;
