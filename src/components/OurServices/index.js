import React from 'react';
import { Grid, Card, CardContent, Typography, Container } from '@mui/material';
import { FlightTakeoff, Hotel, SupportAgent, Group, DirectionsBus, Explore } from '@mui/icons-material';

const servicesData = [
  {
    title: "Hajj & Umrah Packages",
    description: "We offer a range of customizable Hajj and Umrah packages, tailored to meet your specific needs. From economy to luxury, choose the package that fits your budget and schedule.",
    icon: <FlightTakeoff sx={{ color: '#004e8c', fontSize: 50 }} />, // Blue color for the icon
  },
  {
    title: "Land Packages",
    description: "Explore our land packages designed to enhance your pilgrimage experience. From guided tours to hotel accommodations, Halalfly ensures every aspect of your journey is taken care of.",
    icon: <Hotel sx={{ color: '#004e8c', fontSize: 50 }} />,
  },
  {
    title: "Custom Itineraries",
    description: "Want a personalized journey? Our experts create custom itineraries that match your travel preferences, covering all holy sites and more.",
    icon: <Explore sx={{ color: '#004e8c', fontSize: 50 }} />,
  },
  {
    title: "24/7 Support (Call, Chat, Video Call)",
    description: "Halalfly provides 24/7 customer support. Connect with us via chat, phone, or video call to resolve your queries and ensure a smooth booking experience.",
    icon: <SupportAgent sx={{ color: '#004e8c', fontSize: 50 }} />,
  },
  {
    title: "Group & Family Packages",
    description: "We offer special group and family deals to make your spiritual journey more convenient. Get the best prices for large groups and families.",
    icon: <Group sx={{ color: '#004e8c', fontSize: 50 }} />,
  },
  {
    title: "Transportation Services",
    description: "Halalfly provides reliable and comfortable transportation options for travelers to easily get around the holy cities during their pilgrimage.",
    icon: <DirectionsBus sx={{ color: '#004e8c', fontSize: 50 }} />,
  }
];

const Services = () => {
  return (
    <Container sx={{ py: 5 }}>
      {/* Main Title */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          color: '#FF8C42', // Orange for visibility and theme consistency
          fontWeight: 'bold',
          textTransform: 'uppercase', // To make it stand out more
          letterSpacing: '2px', // Adds some spacing between letters
        }}
      >
        Our Services
      </Typography>

      {/* Service Cards */}
      <Grid container spacing={4}>
        {servicesData.map((service, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                border: '2px solid #FF8C42', // Orange border for high contrast
                borderRadius: '15px', // Rounded corners for a modern look
                backgroundColor: '#FAF3E0', // Light cream background for a clean and soft look
                color: '#004e8c', // Blue text color for descriptions and titles
                transition: 'transform 0.3s, background-color 0.3s, box-shadow 0.3s', // Smooth hover animations
                '&:hover': {
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
                  transform: 'translateY(-8px)', // Lift card on hover
                  backgroundColor: '#FF8C42', // Orange background on hover
                  color: '#FFFFFF', // White text color on hover for readability
                },
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
                {/* Service Icon */}
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  {service.icon}
                </div>

                {/* Service Title */}
                <Typography
                  variant="h6"
                  sx={{
                    cursor: 'default',
                    color: '#004e8c', // Blue color for the title
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textTransform: 'uppercase', // Ensure titles stand out
                    '&:hover': { color: '#FFFFFF' }, // White text on hover
                  }}
                >
                  {service.title}
                </Typography>

                {/* Service Description */}
                <Typography
                  variant="body2"
                  sx={{
                    cursor: 'default',
                    mt: 2,
                    color: '#004e8c', // Blue text for description
                    textAlign: 'center',
                    lineHeight: '1.5',
                    maxWidth: '90%', // Ensure the description stays within bounds
                  }}
                >
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
