import React from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

// Define CustomLabelHeaderLarge component
const CustomLabelHeaderLarge = ({ text, color }) => (
    <Typography
        sx={{
            fontSize: { xs: '0.5rem', sm: '1rem', md: '2.5rem', lg: '3rem' },
            color: color || 'black',
            fontFamily: 'Inter-Regular',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: { xs: '1rem', md: '1.5rem' },
            lineHeight: '1.2',
        }}
    >
        {text}
    </Typography>
);

// Define HeaderAndFilterSection component
const HeaderAndFilterSection = () => {
    return (
        <Grid container direction="column" alignItems="center" spacing={-1}>
            <Grid item>
                <CustomLabelHeaderLarge
                    text="Begin your spiritual journey with us."
                    color="white"
                />
            </Grid>
            <Grid item>
                <CustomLabelHeaderLarge
                    text="Discover our affordable Umrah packages and let us guide you every step of the way."
                    color="white"
                />
            </Grid>
        </Grid>
    );
};

export default HeaderAndFilterSection;
