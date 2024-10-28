import React from 'react';
import { Grid, Typography, Box, TextField, Button, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TikTokIcon from '@mui/icons-material/MusicNote'; // Placeholder for TikTok icon

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        width: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: '#004e8c',
        color: '#FAF3E0',
        padding: isMobile ? '20px 0' : '40px 0',
      }}
    >
      {/* Contact Info Section */}
      <Box
        sx={{
          backgroundColor: '#FF8C42',
          padding: isMobile ? '10px 0' : '20px 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container justifyContent="center" spacing={isMobile ? 1 : 2} sx={{ textAlign: 'center', color: '#FAF3E0', width: '90%' }}>
          <Grid item xs={6} sm={4}>
            <PhoneIcon sx={{ fontSize: isMobile ? '20px' : '32px', color: '#FFFFFF' }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FFFFFF', fontSize: isMobile ? '0.75rem' : '1rem' }}>
              Call Now
            </Typography>
            <Typography variant="body2" sx={{ fontSize: isMobile ? '0.70rem' : '0.9rem' }}>+49 177 9365929</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <AccessTimeIcon sx={{ fontSize: isMobile ? '20px' : '32px', color: '#FFFFFF' }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FFFFFF', fontSize: isMobile ? '0.75rem' : '1rem' }}>
              Time Operational
            </Typography>
            <Typography variant="body2" sx={{ fontSize: isMobile ? '0.7rem' : '0.9rem' }}>09:00 AM - 05:00 PM</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocationOnIcon sx={{ fontSize: isMobile ? '20px' : '32px', color: '#FFFFFF' }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FFFFFF', fontSize: isMobile ? '0.75rem' : '1rem' }}>
              Location
            </Typography>
            <Typography variant="body2" sx={{ fontSize: isMobile ? '0.7rem' : '0.9rem' }}>Germany</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Main Footer Section */}
      <Grid container justifyContent="space-between" spacing={isMobile ? 1 : 2} sx={{ padding: isMobile ? '20px 10px' : '40px 20px', maxWidth: '1200px', margin: 'auto' }}>
        {/* Logo and Social Media */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: isMobile ? 1 : 2, color: '#FFFFFF', fontSize: isMobile ? '0.8rem' : '1.5rem' }}>
            HalalFly
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, mb: isMobile ? 1 : 2, color: '#FAF3E0', fontSize: isMobile ? '0.7rem' : '0.9rem' }}>
            HalalFly is committed to providing exceptional Hajj and Umrah travel experiences, ensuring a smooth journey with top-quality services tailored to your needs.
          </Typography>
          <Box>
            <IconButton
              sx={{ color: '#FAF3E0', mx: 0.5 }}
              component="a"
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Link"
            >
              <FacebookIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
            <IconButton
              sx={{ color: '#FAF3E0', mx: 0.5 }}
              component="a"
              href="https://www.instagram.com/halalfly/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Link"
            >
              <InstagramIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
            <IconButton
              sx={{ color: '#FAF3E0', mx: 0.5 }}
              component="a"
              href="https://wa.me/491779365929"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Link"
            >
              <WhatsAppIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
            <IconButton
              sx={{ color: '#FAF3E0', mx: 0.5 }}
              component="a"
              href="https://www.tiktok.com/@halal.fly"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Link"
            >
              <TikTokIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
        {!isMobile && <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: isMobile ? 1 : 2, color: '#FFFFFF', fontSize: isMobile ? '0.8rem' : '1.2rem' }}>
            Quick Links
          </Typography>
          {['About Us', 'Our Services', 'Packages', 'FAQs', 'Blog'].map((link, index) => (
            <Typography key={index} variant="body2" sx={{ marginBottom: isMobile ? '4px' : '8px', cursor: 'pointer', color: '#FAF3E0', fontSize: isMobile ? '0.7rem' : '0.9rem' }}>
              {link}
            </Typography>
          ))}
        </Grid>}

        {/* Subscribe to Newsletter */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: isMobile ? 1 : 2, color: '#FFFFFF', fontSize: isMobile ? '0.8rem' : '1.2rem' }}>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body2" sx={{ mb: isMobile ? 1 : 2, color: '#FAF3E0', fontSize: isMobile ? '0.7rem' : '0.9rem' }}>
            Stay updated with our latest offers and services.
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your email"
            fullWidth
            sx={{
              input: { backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '10px' },
              marginBottom: '16px',
              fontSize: isMobile ? '0.7rem' : '1rem',
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#FF8C42',
              color: '#FFFFFF',
              '&:hover': { backgroundColor: '#004e8c' },
              fontSize: isMobile ? '0.8rem' : '1rem',
              padding: isMobile ? '8px' : '10px',
            }}
          >
            SUBSCRIBE NOW
          </Button>
        </Grid>
      </Grid>

      {/* Bottom Footer Section */}
      <Box sx={{ textAlign: 'center', padding: isMobile ? '15px 0' : '20px 0', backgroundColor: '#004e8c', color: '#FAF3E0', fontSize: isMobile ? '0.8rem' : '1rem' }}>
        <Typography variant="body2">© Copyright 2023. All Rights Reserved. Designed by HalalFly</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
