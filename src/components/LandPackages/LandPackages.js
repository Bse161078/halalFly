import React from 'react';
import Slider from 'react-slick';
import { Typography, IconButton, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LandPackageCard from './LandPackageCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      style={{
        position: 'absolute',
        top: '50%',
        right: '10px',
        transform: 'translateY(-50%)',
        backgroundColor: '#FF8C42', // Orange color for arrows
        zIndex: 2,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        color: '#FFFFFF', // White arrow color
        width: '40px',
        height: '40px',
      }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

// Custom Previous Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      style={{
        position: 'absolute',
        top: '50%',
        left: '-30px',
        transform: 'translateY(-50%)',
        backgroundColor: '#FF8C42', // Orange color for arrows
        zIndex: 2,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        color: '#FFFFFF', // White arrow color
        width: '40px',
        height: '40px',
      }}
      onClick={onClick}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const LandPackages = ({ hotels }) => {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      id="land-packages"
      sx={{
        padding: { xs: '20px 0', md: '40px 0' },
        position: 'relative',
        maxWidth: '90%',
        margin: '0 auto',
      }}
    >
      {/* Heading for Land Packages */}
      <Typography
  variant="h3"
  align="center"
  sx={{
    fontFamily: 'Neon, sans-serif', // Use 'Neon' or a similar sleek font; fallback to sans-serif
    fontWeight: 'bold',
    color: '#004e8c', // Orange color for your theme
  }}
>
  Land Packages
</Typography>





      {/* If no hotels are available, show a message */}
      {hotels?.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ color: 'black', marginTop: '30px' }}
        >
          No Land Packages available
        </Typography>
      ) : (
        <Box sx={{ padding: '0px 20px', marginLeft: { xs: 0, md: 5 } }}>
          <Slider {...settings}>
            {hotels?.map((hotel) => (
              <Box
                key={hotel.id}
                sx={{
                  padding: '20px', // Consistent padding for spacing between cards
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <LandPackageCard
                  packageData={hotel}
                  sx={{
                    width: { xs: '90%', md: '80%' }, // Adjust width for responsiveness
                    minHeight: '400px',
                    backgroundColor: '#004e8c', // Blue background for the card
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
                    borderRadius: '8px',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)', // Increased shadow on hover
                      transform: 'scale(1.05)', // Slight scaling on hover
                    },
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      )}
    </Box>
  );
};

export default LandPackages;
