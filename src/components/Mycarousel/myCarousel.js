import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, IconButton, Button, Grid, Paper, Divider } from '@mui/material';
import { ArrowBack, ArrowForward, Flight as FlightIcon, DirectionsCar as DirectionsCarFilledIcon, Hotel as HotelIcon, LocalActivity as LocalActivityIcon, Flag as FlagIcon } from '@mui/icons-material';

// Sample data for cards
const cardsData = [
  {
    id: 1,
    title: "Umrah Pilgrimage - Makkah",
    description: "Experience the spiritual journey in the holy city of Makkah.",
    imgUrl: "https://cdn.pixabay.com/photo/2012/11/22/08/19/hajj-66986_1280.jpg",
    duration: "Makkah 3N",
    price: "2500.00"
  },
  {
    id: 2,
    title: "Hajj Package - Makkah & Madinah",
    description: "Complete Hajj experience with stays in both holy cities.",
    imgUrl: "https://cdn.pixabay.com/photo/2012/11/22/08/19/hajj-66983_1280.jpg",
    duration: "Makkah 5N • Madinah 3N",
    price: "5000.00"
  },
  {
    id: 3,
    title: "Umrah Plus - Extended Stay",
    description: "Umrah pilgrimage with an extended stay for deeper spiritual connection.",
    imgUrl: "https://cdn.pixabay.com/photo/2018/10/30/03/05/islam-3782623_1280.jpg",
    duration: "Makkah 4N • Madinah 3N",
    price: "3500.00"
  },
  {
    id: 4,
    title: "Luxury Umrah Experience",
    description: "Perform Umrah with premium accommodations and services.",
    imgUrl: "https://cdn.pixabay.com/photo/2020/02/20/03/24/nabawi-mosque-4863805_1280.jpg",
    duration: "Makkah 3N • Madinah 2N",
    price: "4500.00"
  },
];

const CustomLabel = ({ color, text, fontWeight, variant = "body1" }) => (
  <Typography variant={variant} style={{ color, fontWeight }}>
    {text}
  </Typography>
);

const PackageCard = ({ card }) => (
  <Paper elevation={3} sx={{
    width: 300,
    margin: '16px',
    borderRadius: "10px",
    overflow: 'hidden'
  }}>
    <CardMedia
      component="img"
      height="200"
      image={card.imgUrl}
      alt={card.title}
    />
    <CardContent>
      <CustomLabel variant="h6" color="black" text={card.title} fontWeight="bold" />
      
      <Box sx={{ mt: 1, mb: 1 }}>
        <Paper sx={{ display: 'inline-flex', alignItems: 'center', px: 1, py: 0.5, bgcolor: "#FFE8EE", borderRadius: 2 }}>
          <FlagIcon sx={{ color: "#FF678C", mr: 0.5, fontSize: 'small' }} />
          <CustomLabel color="#FF678C" text="Popular" fontWeight="bold" variant="caption" />
        </Paper>
      </Box>

      <CustomLabel color="#A0A7B5" text={card.duration} fontWeight="bold" variant="body2" />

      <Grid container spacing={1} sx={{ mt: 1 }}>
        {[
          { Icon: FlightIcon, text: "Flights" },
          { Icon: DirectionsCarFilledIcon, text: "Transfers" },
          { Icon: HotelIcon, text: "Hotels" },
          { Icon: LocalActivityIcon, text: "Activities" }
        ].map(({ Icon, text }, index) => (
          <Grid item key={index} xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon sx={{ color: "#A0A7B5", mr: 0.5, fontSize: 'small' }} />
            <CustomLabel color="#A0A7B5" text={text} fontWeight="bold" variant="caption" />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <CustomLabel color="black" text={`AED ${card.price}`} fontWeight="bold" variant="h6" />
          <CustomLabel color="#A0A7B5" text="Starting from" fontWeight="bold" variant="caption" />
          <CustomLabel color="#A0A7B5" text="Per person on twin sharing" fontWeight="bold" variant="caption" />
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#FAF3E0",
            color: "#004225",
            borderRadius: "15px",
            textTransform: "none",
            fontWeight: "bold",
            '&:hover': {
              bgcolor: "#E3D8B8"
            }
          }}
        >
          View Details
        </Button>
      </Box>
    </CardContent>
  </Paper>
);

export default function UmrahHajjCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cardsData.length) % cardsData.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const visibleCards = 2; // Number of cards to show at a time

  return (
    <Box sx={{ width: '100%', height: 'auto', position: 'relative', overflow: 'hidden', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflowX: 'hidden', gap: 2 }}>
        {cardsData.map((card, index) => (
          <Box
            key={card.id}
            sx={{
              flex: '0 0 auto',
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              transition: 'transform 0.5s ease',
              display: index >= currentIndex && index < currentIndex + visibleCards ? 'block' : 'none'
            }}
          >
            <PackageCard card={card} />
          </Box>
        ))}
      </Box>
      <IconButton
        onClick={prevSlide}
        sx={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.7)' }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={nextSlide}
        sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(255,255,255,0.7)' }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
}
