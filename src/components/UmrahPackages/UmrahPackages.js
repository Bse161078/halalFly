import React from 'react';
import Slider from 'react-slick';
import { Typography, IconButton, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UmrahPackageCard from './index'; // Ensure the correct path
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
        right: '20px',
        transform: 'translateY(-50%)',
        backgroundColor: '#FF8C42', // Orange background for arrows
        zIndex: 2,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        color: '#FFFFFF', // White color for the arrow icon
        '&:hover': {
          backgroundColor: '#E07032', // Darker orange on hover
        },
        transition: 'background-color 0.3s',
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
        left: '-40px',
        transform: 'translateY(-50%)',
        backgroundColor: '#FF8C42', // Orange background for arrows
        zIndex: 2,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        color: '#FFFFFF', // White color for the arrow icon
        '&:hover': {
          backgroundColor: '#E07032', // Darker orange on hover
        },
        transition: 'background-color 0.3s',
      }}
      onClick={onClick}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const UmrahPackages = ({ packages }) => {
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: () => (
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: '#FF8C42', // Orange color for the dots
          borderRadius: '50%',
          margin: '0 5px',
        }}
      />
    ),
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
          initialSlide: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <Box
      id="umrah-packages"
      sx={{
        padding: '20px 0',
        position: 'relative',
        borderRadius: '10px',
        maxWidth: '90%',
        margin: '0 auto',
      }}
    >
      {/* Heading for Umrah Packages */}
      <Typography
  variant="h3"
  align="center"
  sx={{
    fontFamily: 'Neon, sans-serif', // Use 'Neon' or a similar sleek font; fallback to sans-serif
    fontWeight: 'bold',
    color: '#FF8C42', // Orange color for your theme
  }}
>
  Land Packages
</Typography>







      {/* If no packages are available, show a message */}
      {packages?.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ color: 'black', marginTop: '30px' }}
        >
          No Umrah Packages available
        </Typography>
      ) : (
        <Box sx={{ padding: '0px 20px', marginLeft: 5 }}>
          <Slider {...settings}>
            {packages?.map((umrahPackage) => (
              <Box key={umrahPackage.id} sx={{ padding: '10px' }}>
                <UmrahPackageCard packageData={umrahPackage} />
              </Box>
            ))}
          </Slider>
        </Box>
      )}
    </Box>
  );
};

export default UmrahPackages;
