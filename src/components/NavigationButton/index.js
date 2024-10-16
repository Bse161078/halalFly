import React, { useState } from 'react';
import { Grid, Paper, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HotelIcon from '@mui/icons-material/Hotel';
import MenuIcon from '@mui/icons-material/Menu';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { useNavigate, useLocation } from 'react-router-dom';
import { BusinessCenter } from '@mui/icons-material';
const NavigationButton = ({umrahPackages,landPackages}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

 
  // Helper function to determine the active button
  const handleNavigation = (text) => {
    setDrawerOpen(false); // Close the drawer when navigating
  
    if (text === "Land Packages") {
      if (location.pathname === '/home') {
        window.location.hash = 'land-packages';
      } else {
        navigate('/home');
      }
    } else if (text === "Home") {
      navigate('/home');
    } else if (text === "Umrah Packages") {
      if (location.pathname === '/home') {
        window.location.hash = 'umrah-packages';
      } else {
        navigate('/home');
      }
    } else if (text === "Get in Touch") {
      navigate('/get-in-touch');
    } else if (text === "B2B Collaboration") {
      navigate('/business-collaboration', { 
        state: {
          umrahPackages,
          landPackages,
        }
      });    }
  };
  
  // Helper function to determine the active button
  const isActive = (text) => {
    if (text === "Home" && location.pathname === '/home') return true;
    if (text === "Umrah Packages" && location.hash === '#umrah-packages') return true;
    if (text === "Land Packages" && location.hash === '#land-packages') return true;
    if (text === "Get in Touch" && location.pathname === '/get-in-touch') return true;
    if (text === "B2B Collaboration" && location.pathname === '/business-collaboration') return true; // Check if this button should be active
    return false;
  };
  
  // Button data with the new B2B Collaboration button added
  const buttonData = [
    { text: "Home", icon: <HomeIcon sx={{ fontSize: 24, color: "#FFFFFF" }} /> },
    { text: "Umrah Packages", icon: <Inventory2OutlinedIcon sx={{ fontSize: 24, color: "#FFFFFF" }} /> },
    { text: "Land Packages", icon: <HotelIcon sx={{ fontSize: 24, color: "#FFFFFF" }} /> },
    { text: "Get in Touch", icon: <ContactPageIcon sx={{ fontSize: 24, color: "#FFFFFF" }} /> },
    { text: "B2B Collaboration", icon: <BusinessCenter sx={{ fontSize: 24, color: "#FFFFFF" }} /> }
  ];
  const isHomePage = location.pathname === '/home';

  return (
    <>
    <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
      {buttonData.map((item) => {
        const active = isActive(item.text);
        return (
          <Grid item xs="auto" key={item.text}>
            <Paper
              elevation={4}
              sx={{
                padding: "10px 20px",
                background: active
                  ? "#FF8C42" // Orange for active
                  : isHomePage
                  ? "#005F99" // Lighter Blue for default on home
                  : "#004e8c", // Darker Blue for other pages
                borderRadius: "25px",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: active ? '0px 4px 10px rgba(0, 0, 0, 0.15)' : '0px 8px 20px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: active ? "#004e8c" : "#FF8C42", // Switch to Orange on hover for non-active
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
                  transform: 'translateY(-4px)',
                }
              }}
              onClick={() => handleNavigation(item.text)}
            >
              {item.icon}
              <Typography
                sx={{
                  marginLeft: 1.5,
                  color: '#FFFFFF', // White text for all buttons
                  fontWeight: 'bold',
                }}
              >
                {item.text}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  </>
  
  

  );
};

export default NavigationButton;
