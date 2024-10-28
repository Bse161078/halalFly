import React from 'react';
import { Grid, Typography } from '@mui/material';

// Define CustomLabelHeaderLarge component
const CustomLabelHeaderLarge = ({ text, color }) => (
    <Typography
        sx={{
            fontSize: { xs: '1rem', sm: '1.4rem', md: '2.2rem', lg: '2.8rem' },
            color: color || '#FF8C42',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: { xs: '0.3rem', md: '1rem' },
            lineHeight: { xs: '1.3', md: '1.5' },
            padding: { xs: '0 10px', sm: '0 20px' },
        }}
    >
        {text}
    </Typography>
);

// Function to remove special characters
const sanitizeText = (text) => text.replace(/[^a-zA-Z0-9\s]/g, '');

// Define HeaderAndFilterSection component
const HeaderAndFilterSection = ({ mainText }) => {
    const sanitizedText = sanitizeText(mainText);
    const lines = sanitizedText ? sanitizedText.split('\n').filter((line) => line.trim() !== '') : [];
    const firstLine = lines[0] || '';
    const secondLine = lines[1] || '';

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={{ xs: 1, md: 3 }}
            sx={{
                padding: { xs: '20px 15px', sm: '30px 20px', md: '60px 40px' },
                borderRadius: '10px',
            }}
        >
            {/* Main Heading */}
            <Grid item>
                <CustomLabelHeaderLarge
                    text={firstLine}
                    color="#FF8C42"
                />
            </Grid>

            {/* Subheading */}
            <Grid item>
                <CustomLabelHeaderLarge
                    text={secondLine}
                    color="#FFFFFF"
                />
            </Grid>
        </Grid>
    );
};

export default HeaderAndFilterSection;
