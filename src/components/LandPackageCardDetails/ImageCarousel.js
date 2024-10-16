import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';

const ImageCarousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {images?.map((img, index) => (
        <Box key={index} component="div">
          <img
            src={img.formats.large.url}
            alt={img.name}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }}
          />
        </Box>
      ))}
    </Slider>
  );
};

export default ImageCarousel;
