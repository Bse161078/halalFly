import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Container, Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Services = ({ services }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State to manage the "View More" functionality
  const [showAll, setShowAll] = useState(false);

  // Determine the services to display based on the state and screen size
  const displayedServices = isMobile && !showAll ? services.slice(0, 3) : services;

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <Container sx={{ py: isMobile ? 2 : 5 }}>
      {/* Main Title */}
      {services && (
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          align="center"
          gutterBottom
          sx={{
            color: '#FF8C42',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: isMobile ? '1px' : '2px',
            mb: isMobile ? 2 : 4,
          }}
        >
          Our Services
        </Typography>
      )}

      {/* Service Cards */}
      <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
        {displayedServices?.length > 0 &&
          displayedServices.map((service, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: isMobile ? '10px' : '15px',
                  backgroundColor: `#${service?.BackgroundColor}`,
                  boxShadow: isMobile ? 'none' : '0 4px 10px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: !isMobile && '0 8px 20px rgba(0, 0, 0, 0.15)',
                    transform: !isMobile && 'translateY(-8px)',
                  },
                  display: 'flex',
                  flexDirection: isMobile ? 'row' : 'column',
                  alignItems: 'center',
                  textAlign: isMobile ? 'left' : 'center',
                  padding: isMobile ? '10px' : '20px',
                }}
              >
                {/* Service Icon */}
                <Box
                  sx={{
                    width: isMobile ? 40 : 60,
                    height: isMobile ? 40 : 60,
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: isMobile ? 2 : 0,
                    mb: isMobile ? 0 : 2,
                    boxShadow: isMobile ? 'none' : '0 2px 5px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <Box
                    component="img"
                    src={service?.icon?.url}
                    alt={service?.title}
                    sx={{
                      width: isMobile ? 30 : 50,
                      height: isMobile ? 30 : 50,
                    }}
                  />
                </Box>

                <CardContent sx={{ p: isMobile ? '0 10px' : 0 }}>
                  {/* Service Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#004e8c',
                      fontWeight: 'bold',
                      mb: isMobile ? 0.5 : 1,
                      textTransform: 'uppercase',
                      fontSize: isMobile ? '1rem' : '1.25rem',
                    }}
                  >
                    {service?.title}
                  </Typography>

                  {/* Service Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#004e8c',
                      lineHeight: 1.4,
                      fontSize: isMobile ? '0.85rem' : '1rem',
                    }}
                  >
                    {service?.Description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* "View More" / "View Less" Button */}
      {isMobile && services.length > 3 && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="contained"
            onClick={handleToggleShowAll}
            sx={{
              backgroundColor: '#FF8C42',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#e6733e',
              },
              textTransform: 'none',
              fontWeight: 'bold',
              borderRadius: '8px',
              padding: '8px 16px',
            }}
          >
            {showAll ? 'View Less' : 'View More'}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Services;
