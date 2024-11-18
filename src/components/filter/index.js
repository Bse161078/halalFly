import React, { useState, useEffect } from "react";
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
  useTheme,
  Typography,
  Divider,
} from "@mui/material";
import UmrahFilter from "./umrahFilter";
import LandFilter from "./LandFilter";
import Translation_german from "../Translation/translation_german";

function Index({ umrahIcon, landPackageIcon, allUmrahPackages, allLandPackages }) {
  const [selectedTab, setSelectedTab] = useState(Translation_german.UMRAH_PACKAGES_LABEL);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, newValue) => {
    if (newValue) setSelectedTab(newValue); // Prevent null tab selection
  };

  return (
    <Box
      sx={{
        p: isMobile ? 3 : 3,
        width: "100%",
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)", // Soft shadow
        backgroundColor: "#ffffff", // Light background
        zIndex: 10,
        ml: isMobile ? 0 : "auto",
        mr: isMobile ? 0 : "auto", // Center align
        alignItems: "center",

        "::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "200%",
          background: "linear-gradient(to bottom, #d5b782 0%, #f8e8c2 100%)",
          backgroundSize: "300% 300%",
          animation: "moveGradient 8s ease-in-out infinite",
          zIndex: -1,
        },

        "@keyframes moveGradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },

        color: "#004e8c", // Blue for text and primary accents
      }}
    >
      {/* Segmented Control Section */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mb: isMobile ? 2 : 3,
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <ToggleButtonGroup
          value={selectedTab}
          exclusive
          onChange={handleTabChange}
          aria-label="Umrah and Land Packages Toggle"
          sx={{
            "& .MuiToggleButton-root": {
              borderColor: "#f3c893",
              color: "#004e8c",
              textTransform: "capitalize",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              "&.Mui-selected": {
                backgroundColor: "#004e8c",
                color: "#FFFFFF",
                "& .icon": { // Specific styling for icon within selected state
                  backgroundColor: "#FFFFFF",
                  borderRadius: "50%", // Makes the icon background circular
                  padding: "4px", // Adds some padding around the icon
                },
              },
              "&:hover": {
                backgroundColor: "#f3c893",
                transform: "scale(1.05)",
                color: "#004e8c",
              },
              "&:focus": {
                boxShadow: "0 0 8px rgba(0, 78, 140, 0.2)",
              },
            },
          }}
        >
          <ToggleButton value={Translation_german.UMRAH_PACKAGES_LABEL} aria-label="Umrah">
            <Box
              component="img"
              src={umrahIcon}
              alt="Umrah Icon"
              loading="lazy" // Lazy load icons
              className="icon" // Adds the icon class for targeted styling
              sx={{
                width: 28,
                height: 28,
                mr: 1,
                transition: "all 0.3s ease", // Smooth transition for icon color and background
              }}
            />
            {Translation_german.UMRAH_PACKAGES_LABEL}
          </ToggleButton>
          <ToggleButton value={Translation_german.LAND_PACKAGES_LABEL} aria-label="Land">
            <Box
              component="img"
              src={landPackageIcon}
              alt="Land Package Icon"
              loading="lazy" // Lazy load icons
              className="icon" // Adds the icon class for targeted styling
              sx={{
                width: 28,
                height: 28,
                mr: 1,
                transition: "all 0.3s ease", // Smooth transition for icon color and background
              }}
            />
            {Translation_german.LAND_PACKAGES_LABEL}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Divider sx={{ my: 2, backgroundColor: "#004e8c", height: "2px" }} />

      {/* Render Selected Component */}
      <Box sx={{ mt: isMobile ? 2 : 3, px: isMobile ? 2 : 4 }}>
        <Typography variant="h6" align="center" gutterBottom sx={{ color: "#004e8c", fontWeight: "bold" }}>
          {selectedTab === Translation_german.UMRAH_PACKAGES_LABEL
            ? "Umrah-Pakete Filter"
            : "Land-Pakete Filter"}
        </Typography>
        {selectedTab === Translation_german.UMRAH_PACKAGES_LABEL ? (
          <UmrahFilter travelData={allUmrahPackages} />
        ) : (
          <LandFilter travelData={allLandPackages} />
        )}
      </Box>
    </Box>
  );
}

export default Index;
