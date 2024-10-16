import React from 'react';
import { Grid, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import AvatarLogin from "src/assets/images/avatar-login.png";
import UaeCurrencyIcon from "src/assets/images/uae-icon.png";
import EnglandIcon from "src/assets/images/england.png";
import LogoImage from "src/assets/images/halal-fly-logo.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { CustomLabelCurrency } from '../common/CustomLabel'; 
import { makeStyles } from '@mui/styles';
import NavigationButton from '../NavigationButton';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
      padding: '10px 20px',
      backgroundColor: '#004e8c', // Blue background for the header
      color: '#FAF3E0', // Light color for text
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
      borderBottom: '2px solid #FF8C42', // Orange bottom border for emphasis
      [theme.breakpoints.down('sm')]: {
        padding: '10px 10px',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    logo: {
      maxWidth: '80px',
      height: 'auto',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.1)', // Slight scaling on hover
      },
    },
    icon: {
      width: 24,
      height: 24,
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(1),
    },
    userAvatar: {
      width: 24,
      height: 24,
      cursor: 'pointer',
      marginLeft: theme.spacing(1),
    },
    dropdownIcon: {
      color: '#FAF3E0', // Light color for dropdown icons
      marginLeft: theme.spacing(0.5),
    },
    logoutButton: {
      color: '#FAF3E0', // Light color for the icon
      marginLeft: theme.spacing(1),
      transition: 'color 0.3s ease, background-color 0.3s ease', // Smooth transition on hover
      '&:hover': {
        color: '#FF8C42', // Orange color on hover
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light hover background
      },
    },
    navButton: {
      padding: '10px 20px',
      background: '#FAF3E0', // Light background for button
      borderRadius: '10px',
      color: '#004e8c', // Blue text
      fontWeight: 'bold',
      textTransform: 'uppercase',
      border: '2px solid #FF8C42', // Orange border for emphasis
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(1),
      transition: 'all 0.3s ease', // Smooth hover transition
      '&:hover': {
        backgroundColor: '#FF8C42', // Orange background on hover
        color: '#FAF3E0', // Light color for text on hover
        transform: 'scale(1.05)', // Slight scaling on hover for interactivity
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Shadow for depth on hover
      },
    },
  }));
  
  const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
  
    const handleLogout = () => {
      console.log('Logout clicked');
      navigate('/login');
    };
  
    return (
      <Grid container spacing={2} alignItems="center" className={classes.headerContainer}>
        {/* Logo */}
        <Grid item xs="auto" style={{ flex: '1 1 auto' }}>
          <img src={LogoImage} alt="Logo" className={classes.logo} onClick={() => navigate('/home')} />
        </Grid>
  
        {/* Conditional Navigation Button */}
        {location.pathname !== '/home' &&
          location.pathname !== '/login' &&
          location.pathname !== '/register' && (
            <Grid item>
              <NavigationButton className={classes.navButton}>Navigate</NavigationButton>
            </Grid>
          )}
  
        {/* Currency and Language Selection */}
        <Grid item container xs alignItems="center" justifyContent="flex-end" spacing={2}>
          {/* Uncomment these lines if you want to include currency and language selection */}
          {/* <Grid item className={classes.iconContainer}>
              <img src={UaeCurrencyIcon} alt="UAE Currency" className={classes.icon} />
              <CustomLabelCurrency text="AED" fontWeight="bold" style={{ marginLeft: 4 }} />
              <ArrowDropDownIcon className={classes.dropdownIcon} />
            </Grid>
            <Grid item className={classes.iconContainer}>
              <img src={EnglandIcon} alt="England" className={classes.icon} />
              <CustomLabelCurrency text="Eng" fontWeight="bold" style={{ marginLeft: 4 }} />
              <ArrowDropDownIcon className={classes.dropdownIcon} />
            </Grid> */}
  
          {/* Logout Button */}
          {location.pathname !== '/login' && location.pathname !== '/register' && (
            <Grid item>
              <IconButton className={classes.logoutButton} onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  };
  
  export default Header;
  