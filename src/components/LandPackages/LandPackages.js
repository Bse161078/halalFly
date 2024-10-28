import React from 'react';
import Slider from 'react-slick';
import { useMediaQuery,useTheme,Typography, Box } from '@mui/material';
import LandPackageCard from './LandPackageCard'; // Replace with your LandPackageCard component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LandPackages = ({ hotels }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: isMobile?1:3,
    slidesToScroll: 1,
    autoplay: true, // Enables auto-moving of the cards
    autoplaySpeed: 2000, // 2 seconds per slide
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
      {/* Heading for Land Packages */}
      <Typography
        variant={isMobile?'h5':"h3"}
        align="center"
        sx={{
          fontFamily: 'Neon, sans-serif',
          fontWeight: 'bold',
          color: '#004e8c', // Adjusted to match the theme for land packages
          marginBottom: '30px',
        }}
      >
        Popular Land Packages
      </Typography>

      {hotels?.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ color: 'black', marginTop: '30px' }}
        >
          No Land Packages available
        </Typography>
      ) : (
        <Slider {...settings}>
          {hotels?.map((landPackage) => (
            <Box key={landPackage.id} sx={{ padding: '10px' }}>
              <LandPackageCard packageData={landPackage} />
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default LandPackages;
