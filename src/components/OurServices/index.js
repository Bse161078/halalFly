import React, { useState, useMemo } from 'react';
import { Grid, Card, CardContent, Typography, Container, Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Services = ({ homePage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const services = homePage?.OurServices || [];
  const OurServiceTitle = homePage?.OurServiceTitle || '';

  // State to manage "View More" functionality
  const [showAll, setShowAll] = useState(false);

  // Memoize displayed services for performance
  const displayedServices = useMemo(() => {
    return isMobile && !showAll ? services.slice(0, 3) : services;
  }, [services, isMobile, showAll]);

  const handleToggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <Container sx={{ py: isMobile ? 2 : 5 }}>
      {/* Main Title */}
      {services.length > 0 && (
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
          {OurServiceTitle}
        </Typography>
      )}

      {/* Service Cards */}
      <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
        {displayedServices.map((service, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                borderRadius: '12px',
                backgroundColor: `#${service?.backgroundColor}`,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': !isMobile && {
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-8px)',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 2,
              }}
            >
              {/* Lazy Loaded Image */}
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                }}
              >
                <img
                  src={service?.icon?.url}
                  alt={service?.title}
                  loading="lazy" // Lazy loading for images
                  style={{ width: 50, height: 50 }}
                />
              </Box>

              <CardContent sx={{ p: 0 }}>
                {/* Service Title */}
                <Typography
                  variant="h6"
                  sx={{
                    color: '#004e8c',
                    fontWeight: 'bold',
                    mb: 1,
                    textTransform: 'uppercase',
                    fontSize: '1.25rem',
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
                    fontSize: '1rem',
                  }}
                >
                  {service?.description}
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
              px: 3,
              py: 1,
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
