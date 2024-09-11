import React from 'react';
import { Grid, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';

// Sample imports for icons, replace with actual paths
import MinistryIcon from "src/assets/images/ministry-gray.svg";
import NusukIcon from "src/assets/images/nusuk-gray.svg";

// Custom Label Component for the header
const CustomLabelCardHeader = ({ text, color }) => (
    <Typography
        sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            color: color || 'black',
            fontFamily: 'Inter-Regular',
            fontWeight: 'bold',
            textAlign: { xs: 'center', md: 'left' },
        }}
    >
        {text}
    </Typography>
);

// Custom Label Component for currency-like text
const CustomLabelCurrency = ({ text, color, fontWeight }) => (
    <Typography
        sx={{
            color: color || 'black',
            fontWeight: fontWeight || 'normal',
            fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem' },
            textAlign: 'center',
        }}
    >
        {text}
    </Typography>
);

const PartnerInfo = () => {
    return (
        <Grid container sx={{ padding: "20px", background: "#004225", borderRadius: "10px", color: "white", marginTop: 2, zIndex: 1 }} justifyContent="space-between">
            <Grid item xs={12} md={9} sx={{ marginBottom: { xs: 2, md: 0 } }}>
                <CustomLabelCardHeader
                    text="We are an accredited NUSUK partner with experience of servicing more than 4 Million Umrah pilgrims through our platforms."
                    color="white"
                />
            </Grid>
            <Grid item xs={12} md={3} container justifyContent="center" alignItems="center" spacing={1} sx={{ gap: { xs: 2, md: 1 } }}>
                <Grid item container justifyContent="center">
                    <CustomLabelCurrency text="Accredited By NUSUK" fontWeight="bold" color="white" />
                </Grid>
                <Grid item>
                    <img src={MinistryIcon} alt="Ministry Icon" style={{ maxWidth: '100%', height: 'auto' }} />
                </Grid>
                <Grid item>
                    <Divider orientation="vertical" flexItem sx={{ height: { xs: '40%', md: '60%' }, background: "#F1F3F8" }} />
                </Grid>
                <Grid item>
                    <img src={NusukIcon} alt="Nusuk Icon" style={{ maxWidth: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PartnerInfo;
