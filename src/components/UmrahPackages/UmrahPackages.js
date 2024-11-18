import React from 'react';
import Slider from 'react-slick';
import { Typography, Box, useTheme, useMediaQuery, IconButton } from '@mui/material';
import UmrahPackageCard from './index';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const UmrahPackages = ({ packages, homePage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { UmrahPackageTitle } = homePage;

  const ArrowButton = ({ onClick, direction }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        [direction === 'left' ? 'left' : 'right']: '10px', // Adjust position
        marginLeft:direction === 'left'?-10:0,
        marginRight:direction === 'right'?-10:0,
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: '#FF8C42', // Bright orange for better visibility
        color: '#FFFFFF',
        fontSize: '58px',
        padding: '10px',
        borderRadius: '50%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
        zIndex: 2,
        '&:hover': {
          backgroundColor: '#E07B39', // Slightly darker orange on hover
        },
      }}
    >
      {direction === 'left' ? <ChevronLeftIcon fontSize="large" /> : <ChevronRightIcon fontSize="large" />}
    </IconButton>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3, // Show 1 slide on mobile, 3 on larger screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: !isMobile&&<ArrowButton direction="right" />,
    prevArrow: !isMobile&&<ArrowButton direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <Box id="umrah-packages" sx={{ padding: '20px 0', maxWidth: '95%', margin: '0 auto' }}>
      {/* Heading for Umrah Packages */}
      <Typography
        variant={isMobile ? 'h5' : 'h3'}
        align="center"
        sx={{
          fontFamily: 'Neon, sans-serif',
          fontWeight: 'bold',
          color: '#FF8C42',
          marginBottom: '30px',
        }}
      >
        {UmrahPackageTitle || 'Umrah Packages'}
      </Typography>

      {packages?.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ color: 'black', marginTop: '30px' }}>
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
