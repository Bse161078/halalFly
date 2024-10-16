import React from 'react';
import { Grid, Typography, Box, TextField, Button, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TikTokIcon from '@mui/icons-material/MusicNote'; // Placeholder for TikTok icon

const Footer = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 'none', margin: 0, padding: 0, backgroundColor: '#004e8c', color: '#FAF3E0', padding: '40px 0' }}>
      {/* Contact Info Section */}
      <Box sx={{ backgroundColor: '#FF8C42', padding: '20px 0', display: 'flex', justifyContent: 'center' }}>
        <Grid container justifyContent="center" spacing={2} sx={{ textAlign: 'center', color: '#FAF3E0', width: '90%' }}>
          <Grid item xs={12} sm={4}>
            <PhoneIcon sx={{ fontSize: '32px', color: '#FFFFFF' }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
              Call Now
            </Typography>
            <Typography variant="body2">+49 177 9365929</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <AccessTimeIcon sx={{ fontSize: '32px', color: '#FFFFFF' }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
              Time Operational
            </Typography>
            <Typography variant="body2">09:00 AM - 05:00 PM</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocationOnIcon sx={{ fontSize: '32px', color: '#FFFFFF' }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
              Location
            </Typography>
            <Typography variant="body2">Germany</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Main Footer Section */}
      <Grid container justifyContent="space-between" spacing={2} sx={{ padding: '40px 20px', maxWidth: '1200px', margin: 'auto' }}>
        {/* Logo and Social Media */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#FFFFFF' }}>
            HalalFly
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 2, color: '#FAF3E0' }}>
            HalalFly is committed to providing exceptional Hajj and Umrah travel experiences, ensuring a smooth journey with top-quality services tailored to your needs.
          </Typography>
          <Box>
            <IconButton
              sx={{ color: '#FAF3E0', mx: 1 }}
              component="a"
              href="https://www.facebook.com"
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              sx={{ color: '#FAF3E0', mx: 1 }}
              component="a"
              href="https://www.instagram.com/halalfly/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              sx={{ color: '#FAF3E0', mx: 1 }}
              component="a"
              href={`https://wa.me/491779365929`} 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </IconButton>
            <IconButton
              sx={{ color: '#FAF3E0', mx: 1 }}
              component="a"
              href="https://www.tiktok.com/@halal.fly"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#FFFFFF' }}>
            Quick Links
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '8px', cursor: 'pointer', color: '#FAF3E0' }}>About Us</Typography>
          <Typography variant="body2" sx={{ marginBottom: '8px', cursor: 'pointer', color: '#FAF3E0' }}>Our Services</Typography>
          <Typography variant="body2" sx={{ marginBottom: '8px', cursor: 'pointer', color: '#FAF3E0' }}>Packages</Typography>
          <Typography variant="body2" sx={{ marginBottom: '8px', cursor: 'pointer', color: '#FAF3E0' }}>FAQs</Typography>
          <Typography variant="body2" sx={{ cursor: 'pointer', color: '#FAF3E0' }}>Blog</Typography>
        </Grid>

        {/* Subscribe to Newsletter */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#FFFFFF' }}>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#FAF3E0' }}>
            Stay updated with our latest offers and services.
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter your email"
            fullWidth
            sx={{
              input: { backgroundColor: '#FFFFFF', borderRadius: '4px', padding: '10px' },
              marginBottom: '16px',
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#FF8C42', color: '#FFFFFF', '&:hover': { backgroundColor: '#004e8c' } }}
          >
            SUBSCRIBE NOW
          </Button>
        </Grid>
      </Grid>

      {/* Bottom Footer Section */}
      <Box sx={{ textAlign: 'center', padding: '20px 0', backgroundColor: '#004e8c', color: '#FAF3E0' }}>
        <Typography variant="body2">© Copyright 2023. All Rights Reserved. Designed by HalalFly</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
