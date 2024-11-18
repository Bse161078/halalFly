import React, { useEffect } from 'react';
import { Grid, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import NavigationButton from '../NavigationButton';
import { getStaticHomeApi,getB2bPackagesApi} from '../../services';
import { getStaticHomeApiReset,getB2bPackagesApiReset } from "../../reducers";
import LoadingScreen from '../LoadingScreen';

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
    [theme.breakpoints.down('sm')]: {
      maxWidth: '60px', // Make logo smaller on small screens
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
  const location = useLocation(); // Used to track the current route
  const dispatch = useDispatch();

  const { data: homePage, loading: homePageLoading } = useSelector(
    (state) => state.getStaticHomeApiReducer
  );
  const {data:b2bPackages, loading:b2bPackagesLoading} = useSelector((state)=>state.getB2bPackagesApiReducer);

  useEffect(() => {
    dispatch(getStaticHomeApi());
    dispatch(getB2bPackagesApi());

    return () => {
      dispatch(getStaticHomeApiReset());
      dispatch(getB2bPackagesApiReset());
    };
  }, [dispatch, location.pathname]); // Adding location.pathname ensures API is called on route change

  // If the API is still loading, display the LoadingScreen component
  if (homePageLoading&& b2bPackagesLoading) {
    return <LoadingScreen />;
  }

  // Only render the rest of the UI after loading is complete
  return (
    <Grid container spacing={0} alignItems="center" className={classes.headerContainer}>
      {/* Logo */}
      <Grid item xs={2} style={{ flex: '1 1 auto' }}>
        <img
        
          src={homePage?.length > 0 && homePage[0].Logo?.url}
          alt="Logo"
          loading='lazy'
          className={classes.logo}
          onClick={() => navigate('/home')}
        />
      </Grid>

      {/* Conditional Navigation Button */}
      <Grid item xs={10}>
        <NavigationButton
          homePageLoading={homePageLoading}
          b2bPackages={b2bPackages}
          homePage={homePage?.length > 0 ? homePage[0] : null}
          className={classes.navButton}
        >
          Navigate
        </NavigationButton>
      </Grid>

    
    </Grid>
  );
};

export default Header;
