import React, { useState, useEffect } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import PackageCard from './packageCard'; // Ensure this path is correct

const CustomCarousel = ({ items, selectedCurrency, onCurrencyChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  // Breakpoints for responsive handling
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Mobile size (<=600px)
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Tablet size (600px-900px)

  const visibleItems = isMobile ? 1 : isTablet ? 2 : 3; // 1 item on mobile, 2 on tablet, 3 on desktop

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleItems) % items.length);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex - visibleItems + items.length) % items.length);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.5s ease',
          transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          width: `${items.length * (100 / visibleItems)}%`,
        }}
      >
        {items.map((item) => (
          <Box
            key={item._id}
            sx={{
              flexShrink: 0,
              width: `${100 / visibleItems}%`,
              padding: '0 10px',
            }}
          >
            <PackageCard
              title={item.title}
              imageUrl={item.image[0]?.url || 'https://via.placeholder.com/150'}
              prices={item.price}
              selectedCurrency={selectedCurrency}
              label={item.label}
              destinations={item.destinations}
              pricingNote={item.pricingNote}
              packageId={item.id}
              packages={item?.packages[0]?.PackageTypes}
              flightsIncluded={item.flightDetails.isFlightIncluded}
              activityIncluded={item.activityDetails.isActivityIncluded}
              transfersIncluded={item.transferDetails.isTransferIncluded}
              cityOptions={item.cityOption}
              hotelOptions={item.hotelOptions}
            />
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
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

          {/* Dots Navigation (Tablet/Desktop Only) */}
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
