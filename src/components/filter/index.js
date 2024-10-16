import React, { useState, useEffect } from 'react';
import { Grid, Box, MenuItem } from '@mui/material';
import UmrahFilter from './umrahFilter'; // Ensure the correct path to the UmrahFilter component
import { CustomDropdown } from "../common/CustomDrowDown";
import { CustomLabel } from "../common/CustomLabel";
import LandFilter from './LandFilter';

function Index({ allUmrahPackages, allLandPackages }) {
  // Set the initial state to "Umrah Packages"
  const [selectedValue, setSelectedValue] = useState("Umrah Packages"); // State to store the selected value
  const [selectedComponent, setSelectedComponent] = useState(<UmrahFilter travelData={allUmrahPackages} />);
  console.log("allUmrahPackages",allUmrahPackages)
  // Handle selection changes
  const handleSelection = (name, value) => {
    setSelectedValue(value); // Update the selected value state

    // Update the selected component based on the selected value
    if (value === 'Umrah Packages') {
      setSelectedComponent(<UmrahFilter travelData={allUmrahPackages} />);
    } else if (value === 'Land Packages') {
      setSelectedComponent(<LandFilter travelData={allLandPackages} />);
    }
  };

  // Automatically set the Umrah packages on initial load
  useEffect(() => {
    // Ensure UmrahFilter is displayed as default
    setSelectedComponent(<UmrahFilter travelData={allUmrahPackages} />);
  }, [allUmrahPackages]);

  return (
    <Box
      sx={{
        p: 2,
        width: '100%',
        position: 'relative', // Ensure the Box stays positioned
        zIndex: 10, // Set a higher z-index to stay above other elements
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: '100%', margin: '0 auto' }}
      >
        {/* CustomDropdown component wrapped inside a responsive Grid item */}
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <CustomDropdown
            value={selectedValue} // Set the value prop to reflect the current selection
            name="packageSelect"
            container={['Umrah Packages', 'Land Packages'].map((option) => (
              <MenuItem
                key={option}
                value={option}
                onClick={() => handleSelection('packageSelect', option)}
              >
                <CustomLabel text={option} /> {/* Replace with your actual label component */}
              </MenuItem>
            ))}
            placeholder="Select a Package"
            onChange={(e) => handleSelection('packageSelect', e.target.value)}
            disabled={false} // Adjust if needed
          />
        </Grid>

        {/* Render the selected component (UmrahFilter or LandFilter) */}
        <Grid item xs={12}>
          {selectedComponent}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
