import React from 'react';
import Slider from 'react-slick';
import { Typography, Box,useTheme,useMediaQuery } from '@mui/material';
import UmrahPackageCard from './index';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const UmrahPackages = ({ packages }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enables auto-moving of the cards
    autoplaySpeed: 2000, // 3 seconds per slide
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: '20px 0', maxWidth: '95%', margin: '0 auto' }}>
      {/* Heading for Umrah Packages */}
      <Typography
        variant={isMobile?'h5':"h3"}
        align="center"
        sx={{
          fontFamily: 'Neon, sans-serif',
          fontWeight: 'bold',
          color: '#FF8C42',
          marginBottom: '30px',
        }}
      >
        Popular Umrah Packages
      </Typography>

      {packages?.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ color: 'black', marginTop: '30px' }}
        >
          No Umrah Packages available
        </Typography>
      ) : (
        <Slider {...settings}>
          {packages?.map((umrahPackage) => (
            <Box key={umrahPackage.id} sx={{ padding: '10px' }}>
              <UmrahPackageCard packageData={umrahPackage} />
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default UmrahPackages;
