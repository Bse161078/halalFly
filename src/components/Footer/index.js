import React from 'react';
import { Grid, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';

// Sample imports for images, replace with actual paths
import LogoLargeIcon from 'src/assets/images/logo-large.png';
import MinistryIcon from "src/assets/images/ministry-gray.svg";
import NusukIcon from "src/assets/images/nusuk-gray.svg";
import SisaLogoIcon from 'src/assets/images/sisa-logo.png';
import PaypalIcon from "src/assets/images/paypal.svg";
import MasterCardIcon from "src/assets/images/mastercard.svg";
import ApplePayIcon from "src/assets/images/applepay.svg";

const CustomLabelCurrency = ({ text, color, fontWeight }) => {
    return (
        <Typography
            sx={{
                color: color || 'black',
                fontWeight: fontWeight || 'normal',
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem' },
            }}
        >
            {text}
        </Typography>
    );
};

const Footer = () => {
    return (
        <Grid
            container
            spacing={4}
            justifyContent="space-between"
            sx={{ padding: { xs: '20px', sm: '40px 20px', md: '40px 40px', lg: '40px 60px' } }}
        >
            {/* First Column */}
            <Grid item xs={12} sm={6} md={3} container direction="column" alignItems={{ xs: 'center', sm: 'flex-start' }}>
                <Grid item>
                    <img src={LogoLargeIcon} alt="Logo" style={{ width: '180px', maxWidth: '100%' }} />
                </Grid>
                <Grid item container spacing={1} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }} sx={{ mt: 1 }}>
                    <Grid item>
                        <img src={MinistryIcon} alt="Ministry Icon" style={{ width: 'auto', maxWidth: '100%' }} />
                    </Grid>
                    <Grid item>
                        <Divider orientation="vertical" flexItem sx={{ height: '40px', background: '#F1F3F8' }} />
                    </Grid>
                    <Grid item>
                        <img src={NusukIcon} alt="Nusuk Icon" style={{ width: 'auto', maxWidth: '100%' }} />
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 1 }}>
                    <img src={SisaLogoIcon} alt="Sisa Logo" style={{ width: '70px', maxWidth: '100%' }} />
                </Grid>
                <Grid item container spacing={1} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }} sx={{ mt: 1 }}>
                    <Grid item>
                        <img src={ApplePayIcon} alt="Apple Pay" style={{ width: 'auto', maxWidth: '100%' }} />
                    </Grid>
                    <Grid item>
                        <Divider orientation="vertical" flexItem sx={{ height: '40px', background: '#F1F3F8' }} />
                    </Grid>
                    <Grid item>
                        <img src={MasterCardIcon} alt="MasterCard" style={{ width: 'auto', maxWidth: '100%' }} />
                    </Grid>
                    <Grid item>
                        <Divider orientation="vertical" flexItem sx={{ height: '40px', background: '#F1F3F8' }} />
                    </Grid>
                    <Grid item>
                        <img src={PaypalIcon} alt="PayPal" style={{ width: 'auto', maxWidth: '100%' }} />
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 2, textAlign: { xs: 'center', sm: 'left' } }}>
                    <CustomLabelCurrency text="Contact Us" color="black" fontWeight="bold" />
                </Grid>
                <Grid item container spacing={0.5} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }} sx={{ mt: 1 }}>
                    <Grid item>
                        <CustomLabelCurrency text="Call Us: " color="black" />
                    </Grid>
                    <Grid item>
                        <CustomLabelCurrency text="+971 42457300" color="#494b90" fontWeight="bold" />
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 2, textAlign: { xs: 'center', sm: 'left' } }}>
                    <CustomLabelCurrency text="Traveazy DMCC (Registered Office), Unit No." color="black" fontWeight="bold" />
                </Grid>
                <Grid item>
                    <CustomLabelCurrency text="1503, Swiss Tower, Cluster-Y, JLT, Dubai UAE." color="black" fontWeight="bold" />
                </Grid>
                <Grid item>
                    <CustomLabelCurrency text="P.O. Box no. 938533" color="black" fontWeight="bold" />
                </Grid>
            </Grid>

            {/* Second Column */}
            <Grid item xs={12} sm={6} md={3} container direction="column" alignItems={{ xs: 'center', sm: 'flex-start' }}>
                <Grid item>
                    <CustomLabelCurrency text="Quick Links" color="black" fontWeight="bold" />
                </Grid>
                {["Home", "Privacy Policy", "FAQS", "Contact Us", "Terms Of Use"].map((link, index) => (
                    <Grid item key={index} sx={{ mt: 2 }}>
                        <CustomLabelCurrency text={link} color="#78829D" />
                    </Grid>
                ))}
            </Grid>

            {/* Third Column */}
            <Grid item xs={12} sm={6} md={3} container direction="column" alignItems={{ xs: 'center', sm: 'flex-start' }}>
                <Grid item>
                    <CustomLabelCurrency text="Company" color="black" fontWeight="bold" />
                </Grid>
                {["Blogs", "About Us", "Career"].map((link, index) => (
                    <Grid item key={index} sx={{ mt: 2 }}>
                        <CustomLabelCurrency text={link} color="#78829D" />
                    </Grid>
                ))}
            </Grid>

            {/* Fourth Column */}
            <Grid item xs={12} sm={6} md={3} container direction="column" alignItems={{ xs: 'center', sm: 'flex-start' }}>
                <Grid item>
                    <CustomLabelCurrency text="Resources" color="black" fontWeight="bold" />
                </Grid>
                <Grid item sx={{ mt: 2 }}>
                    <CustomLabelCurrency text="Packages" color="#78829D" />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Footer;
