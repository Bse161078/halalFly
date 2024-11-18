import React, { useState } from 'react';
import {
  Grid,
  Paper,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen';

const NavigationButton = ({ b2bPackages,homePage,homePageLoading }) => {
  console.log("b2bPackages",b2bPackages)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
console.log("hamza2",homePage)
  const handleNavigation = (text) => {
    setDrawerOpen(false); // Close the drawer when navigating

    if (text === homePage.navButton3Text) {
      if (location.pathname === '/home') {
        window.location.hash = 'land-packages';
      } else {
        navigate('/home');
      }
    } else if (text === homePage?.navButton1Text) {
      navigate('/home');
    } else if (text === homePage?.navButton2Text) {
      if (location.pathname === '/home') {
        window.location.hash = 'umrah-packages';
      } else {
        navigate('/home');
      }
    } else if (text === homePage?.navButton4Text) {
      navigate('/get-in-touch');
    } else if (text === homePage?.navButton5Text) {
      navigate('/business-collaboration', {
        state: {
          b2bPackages
        },
      });
    }
  };

  const isActive = (text) => {
    if (text === homePage?.navButton1Text && location.pathname === '/home') return true;
    if (text === homePage?.navButton2Text && location.hash === '#umrah-packages') return true;
    if (text === homePage?.navButton3Text && location.hash === '#land-packages') return true;
    if (text === homePage?.navButton4Text && location.pathname === '/get-in-touch') return true;
    if (text === homePage?.navButton5Text && location.pathname === '/business-collaboration') return true;
    return false;
  };

  const buttonData = [
    {
      text: homePage?.navButton1Text,
      icon: homePage?.navButton1Icon?.url 
        ? <img src={homePage.navButton1Icon.url} alt="icon1" style={{ width: 24, height: 24 }} />
        : null,
    },
    {
      text: homePage?.navButton2Text,
      icon: homePage?.navButton2Icon?.url 
        ? <img src={homePage.navButton2Icon.url} alt="icon2" style={{ width: 24, height: 24 }} />
        : null,
    },
    {
      text: homePage?.navButton3Text,
      icon: homePage?.navButton3Icon?.url 
        ? <img src={homePage.navButton3Icon.url} alt="icon3" style={{ width: 24, height: 24 }} />
        : null,
    },
    {
      text: homePage?.navButton4Text,
      icon: homePage?.navButton4Icon?.url 
        ? <img src={homePage.navButton4Icon.url} alt="icon4" style={{ width: 24, height: 24 }} />
        : null,
    },
    {
      text: homePage?.navButton5Text,
      icon: homePage?.navButton5Icon?.url 
        ? <img src={homePage.navButton5Icon.url} alt="icon5" style={{ width: 24, height: 24 }} />
        : null,
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      {
        homePageLoading&&<LoadingScreen/>
      }
      <Grid container spacing={3} alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
        {buttonData.map((item) => {
          const active = isActive(item.text);
          return (
            <Grid item xs="auto" key={item.text}>
              <Paper
                elevation={4}
                sx={{
                  padding: '10px 20px',
                  background: active
                    ? '#FF8C42'
                    : location.pathname === '/home'
                    ? '#005F99'
                    : '#004e8c',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: active
                    ? '0px 4px 10px rgba(0, 0, 0, 0.15)'
                    : '0px 8px 20px rgba(0, 0, 0, 0.2)',
                  '&:hover': {
                    backgroundColor: active ? '#004e8c' : '#FF8C42',
                    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(-4px)',
                  },
                }}
                onClick={() => handleNavigation(item.text)}
              >
                {item.icon}
                <Typography sx={{ marginLeft: 1.5, color: '#FFFFFF', fontWeight: 'bold' }}>
                  {item.text}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Mobile Navigation Drawer */}
      <IconButton
        sx={{ display: { xs: 'flex', md: 'none' }, position: 'absolute', top: 10, right: 10, color: '#FFFFFF' }}
        onClick={() => setDrawerOpen(true)}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250, backgroundColor: '#004e8c', height: '100%' }}>
          {buttonData.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.text)}
              sx={{
                '&:hover': { backgroundColor: '#FF8C42' },
              }}
            >
              <ListItemIcon sx={{ color: '#FFFFFF' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ color: '#FFFFFF', fontWeight: 'bold' }} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavigationButton;
