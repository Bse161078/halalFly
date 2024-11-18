import React, { useState } from 'react';
import { Grid, Typography, Paper, Tab, Tabs, Box, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Translation_german from 'src/components/Translation/translation_german';

const PackageInclusionsExclusions = ({ packages }) => {
  const { Include, Exclusion } = packages;
  console.log("packages",packages)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  // Define the number of items to show initially
  const initialVisibleItems = 5;

  const [showAllIncludes, setShowAllIncludes] = useState(false);
  const [showAllExclusions, setShowAllExclusions] = useState(false);

  // Toggle functions for showing more items
  const toggleShowAllIncludes = () => setShowAllIncludes(!showAllIncludes);
  const toggleShowAllExclusions = () => setShowAllExclusions(!showAllExclusions);

  const paperStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    bgcolor: "#FAFAFA",
    textAlign: 'center',
    borderRadius: 10,
    width: isMobile ? '70%' : '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    },
  };

  const iconStyle = {
    width: isMobile ?  20 : 35,
    height: isMobile ?  20 : 35,
    marginRight: '12px',
    filter: 'grayscale(100%)',
    transition: 'filter 0.3s ease',
    '&:hover': {
      filter: 'none',
    },
  };
  const tabStyle = {
    fontSize: isMobile ? '0.55rem' : '1rem', // Adjust font size for mobile
    fontWeight: 'bold',
    color: tabValue === 0 ? '#004e8c' : '#999999', // Active tab color adjustment
    textTransform: 'none',
    padding: isMobile ? '2px 5px' : '10px 12px', // Adjust padding for smaller screens
  };


  const renderItems = (items, showAll, toggleShow, label) => (
    <>
      <Grid container spacing={3}>
        {items && items.length > 0 ? (
          items.slice(0, showAll ? items.length : initialVisibleItems).map((item) => (
            <Grid item xs={12} sm={6} md={6} key={item._id} align="center">
              <Paper sx={paperStyle}>
                <img
                  src={item.IncludeIcons?.url || item.Icon?.url || ''}
                  alt={item.IncludeIcons?.alternativeText || item.Icon?.alternativeText || 'Icon'}
                  style={iconStyle}
                />
                <Typography color={label === "Include" ? "#004e8c" : "#FF8C42"} fontWeight="bold" 
                sx={{ fontSize: isMobile ? '0.55rem' : '1rem', // Adjust font size for mobile
}}>
                  {item.Include || item.Exclusion}
                </Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#999' }}>Keine Artikel{label.toLowerCase()}</Typography>
        )}
      </Grid>
      {items && items.length > initialVisibleItems && (
        <Box textAlign="center" mt={2}>
          <Button variant="text" color="primary" sx={{    fontSize: isMobile ? '0.55rem' : '1rem', // Adjust font size for mobile
}} onClick={toggleShow}>
            {showAll ? Translation_german.VIEW_LESS_BUTTON : Translation_german.VIEW_MORE_BUTTON}
          </Button>
        </Box>
      )}
    </>
  );

  return (
    <Box sx={{ padding: isMobile ? '0rem' : '2rem' }}>
  {isMobile ? (
    <>
      {/* Tabs Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          variant="scrollable" // Allows the tabs to scroll on smaller screens
          scrollButtons="auto" // Shows scroll buttons when necessary
          TabIndicatorProps={{
            style: {
              backgroundColor: '#FF8C42', // Orange for active tab indicator
              height: '3px',
            },
          }}
          sx={{
            minHeight: 'unset', // Allow flexible tab height on mobile
          }}
        >
          <Tab label= {Translation_german.INCLUDED_SERVICES} sx={{ ...tabStyle, maxWidth: '100%' }} />
          <Tab label={Translation_german.SERVICES_EXCLUDED} sx={{ ...tabStyle, maxWidth: '100%' }} />
        </Tabs>
      </Box>

      {/* Content for Tabs */}
      {tabValue === 0 && (
        <Box sx={{ marginTop: '1rem' }}>
          {!isMobile&&<Typography
          
            sx={{
              fontSize: {
                xs: '0.65rem', // Equivalent to 'h7' on extra small screens
                sm: '1.5rem', // Equivalent to 'h4' on small screens
                md: '2rem', // Equivalent to 'h3' on medium screens
                lg: '2.5rem', // Equivalent to 'h2' on large screens
              },
              color: '#004e8c',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            {Translation_german.INCLUDED_SERVICES}
          </Typography>}
          {renderItems(Include, showAllIncludes, toggleShowAllIncludes, "Include")}
        </Box>
      )}
      {tabValue === 1 && (
        <Box sx={{ marginTop: '1rem' }}>
{!isMobile&&<Typography            variant="h6"
            sx={{
              color: '#004e8c',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            {Translation_german.SERVICES_EXCLUDED}
            </Typography>}
          {renderItems(Exclusion, showAllExclusions, toggleShowAllExclusions, "Exclusion")}
        </Box>
      )}
    </>
  ) : (
    <Grid container spacing={4}>
      {/* Desktop view for Included */}
      <Grid item xs={12} md={6}>
        <Typography
          variant="h5"
          sx={{
            color: '#004e8c',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
            {Translation_german.INCLUDED_SERVICES}
            </Typography>
        {renderItems(Include, showAllIncludes, toggleShowAllIncludes, "Include")}
      </Grid>

      {/* Desktop view for Excluded */}
      <Grid item xs={12} md={6}>
        <Typography
          variant="h5"
          sx={{
            color: '#004e8c',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
            {Translation_german.SERVICES_EXCLUDED}
            </Typography>
        {renderItems(Exclusion, showAllExclusions, toggleShowAllExclusions, "Exclusion")}
      </Grid>
    </Grid>
  )}
</Box>

  );
};

export default PackageInclusionsExclusions;
