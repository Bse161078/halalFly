import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import PackageCard from './packageCard'; // Ensure this path is correct

const CustomCarousel = ({ items, selectedCurrency, onCurrencyChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = window.innerWidth <= 600; // Consider mobile screens less than or equal to 600px width

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.5s ease',
            transform: `translateX(-${currentIndex * (isMobile ? 100 : 33.33)}%)`,
            width: `${items.length * (isMobile ? 100 : 33.33)}%`,
          }}
        >
          {items.map((item) => (
            <Box
              key={item._id}
              sx={{
                flexShrink: 0,
                width: isMobile ? '100%' : '33.33%',
                padding: '0 10px',
              }}
            >
              <PackageCard
                title={item.title}
                imageUrl={item.image[0]?.url || 'N/A'}
                prices={item.price}
                selectedCurrency={selectedCurrency}
                onCurrencyChange={onCurrencyChange}
                label={item.label}
                destinations={item.destinations}
                pricingNote={item.pricingNote}
              />
            </Box>
          ))}
        </Box>
      </Box>
      {items.length > 1 && (
        <>
          <IconButton
            onClick={handleBack}
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              zIndex: 1,
            }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              zIndex: 1,
            }}
          >
            <ArrowForward />
          </IconButton>
          {!isMobile && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '10px 0',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {items.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: currentIndex === index ? 'black' : 'gray',
                    margin: '0 5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CustomCarousel;
