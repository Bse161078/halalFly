import React from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

// Define CustomLabelHeaderLarge component
const CustomLabelHeaderLarge = ({ text, color }) => (
    <Typography
        sx={{
            fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.4rem', lg: '2.8rem' }, // Updated sizes for better emphasis
            color: color || '#FF8C42', // Default to Orange color for main headers
            fontFamily: 'Inter, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: { xs: '0.5rem', md: '1rem' }, // Add margin for spacing
            lineHeight: '1.5', // Improved line-height for readability
            padding: { xs: '0 15px', sm: '0 20px' }, // Responsive padding for mobile and desktop
        }}
    >
        {text}
    </Typography>
);

// Define HeaderAndFilterSection component
const HeaderAndFilterSection = () => {
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={3} // Add more space between elements
            sx={{
                padding: { xs: '30px 20px', md: '60px 40px' }, // Increase padding for better spacing on larger screens
                borderRadius: '10px', // Keep border-radius for smooth corners
            }}
        >
            {/* Main Heading */}
            <Grid item>
                <CustomLabelHeaderLarge
                    text="Begin Your Spiritual Journey with Us."
                    color="#FF8C42" // Use Orange for the main heading for contrast
                />
            </Grid>

            {/* Subheading */}
            <Grid item>
                <CustomLabelHeaderLarge
                    text="Discover our affordable Umrah packages and let us guide you every step of the way."
                    color="#FFFFFF" // White for the subheading to maintain balance with the background
                />
            </Grid>
        </Grid>
    );
};

export default HeaderAndFilterSection;
