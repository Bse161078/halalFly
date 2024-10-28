import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import UmrahFilter from './umrahFilter';
import LandFilter from './LandFilter';

function Index({ umrahIcon, landPackageIcon, allUmrahPackages, allLandPackages }) {
  const [selectedTab, setSelectedTab] = useState("Umrah Packages");
  const [selectedComponent, setSelectedComponent] = useState(<UmrahFilter travelData={allUmrahPackages} />);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 'Umrah Packages') {
      setSelectedComponent(<UmrahFilter travelData={allUmrahPackages} />);
    } else {
      setSelectedComponent(<LandFilter travelData={allLandPackages} />);
    }
  };

  useEffect(() => {
    setSelectedComponent(<UmrahFilter travelData={allUmrahPackages} />);
  }, [allUmrahPackages]);

  return (
    <Box
      sx={{
        p: isMobile ? 1 : 2,
        width: '100%',
        backgroundColor: "#FFFFFF",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
      }}
    >
      {/* Tab Section */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          mb: isMobile ? 2 : 3,
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          TabIndicatorProps={{
            style: {
              backgroundColor: "#FF8C42", // Orange for active tab indicator
            },
          }}
          variant={isMobile ? 'fullWidth' : 'standard'}
          sx={{
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <Tab
            icon={<Box component="img" src={umrahIcon} alt="Umrah Icon" sx={{ width: 24, height: 24 }} />}
            iconPosition="start"
            label="Umrah Packages"
            value="Umrah Packages"
            sx={{
              color: selectedTab === "Umrah Packages" ? "#004e8c" : "#999999",
              fontWeight: selectedTab === "Umrah Packages" ? "bold" : "normal",
              textTransform: "none",
              fontSize: isMobile ? "0.75rem" : "1rem",
              width: isMobile ? '100%' : 'auto', // Full width on mobile
            }}
          />
          <Tab
            icon={<Box component="img" src={landPackageIcon} alt="Land Package Icon" sx={{ width: 24, height: 24 }} />}
            iconPosition="start"
            label="Land Packages"
            value="Land Packages"
            sx={{
              color: selectedTab === "Land Packages" ? "#004e8c" : "#999999",
              fontWeight: selectedTab === "Land Packages" ? "bold" : "normal",
              textTransform: "none",
              fontSize: isMobile ? "0.875rem" : "1rem",
              width: isMobile ? '100%' : 'auto', // Full width on mobile
            }}
          />
        </Tabs>
      </Box>

      {/* Render Selected Component */}
      <Box sx={{ mt: isMobile ? 2 : 3 }}>
        {selectedComponent}
      </Box>
    </Box>
  );
}

export default Index;
