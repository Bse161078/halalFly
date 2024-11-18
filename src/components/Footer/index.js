import React, { useEffect } from 'react';
import { Grid, Typography, Box, TextField, Button, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TikTokIcon from '@mui/icons-material/MusicNote'; // Placeholder for TikTok icon
import { useDispatch, useSelector } from 'react-redux';
import { getStaticHomeApiReset } from '../../reducers';
import { getStaticHomeApi } from 'src/services';
import LoadingScreen from '../LoadingScreen';
import Translation_german from '../Translation/translation_german';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: homePage, loading: homePageLoading } = useSelector((state) => state.getStaticHomeApiReducer);

  useEffect(() => {
    dispatch(getStaticHomeApi());
    return () => {
      dispatch(getStaticHomeApiReset());
    };
  }, [dispatch]);

  

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#004e8c',
        color: '#FAF3E0',
        width: '100%',
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
        <Grid container justifyContent="center" spacing={2} sx={{ width: '90%' }}>
          {[
            {
              icon: <PhoneIcon sx={{ fontSize: isMobile ? '20px' : '32px', color: '#FFFFFF' }} />,
              label: Translation_german.CALL_NOW_LABEL,
              text: '+49 177 9365929',
            },
            {
              icon: <AccessTimeIcon sx={{ fontSize: isMobile ? '20px' : '32px', color: '#FFFFFF' }} />,
              label: Translation_german.TIME_OPERATIONAL_LABEL,
              text: '09:00 AM - 05:00 PM',
            },
            {
              icon: <LocationOnIcon sx={{ fontSize: isMobile ? '20px' : '32px', color: '#FFFFFF' }} />,
              label: Translation_german.LOCATION_LABEL,
              text: Translation_german.LOCATION_COUNTRY,
            },
          ].map((item, index) => (
            <Grid item xs={6} sm={4} key={index} textAlign="center">
              {item.icon}
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#FFFFFF', fontSize: isMobile ? '0.75rem' : '1rem' }}>
                {item.label}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: isMobile ? '0.7rem' : '0.9rem' }}>
                {item.text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Main Footer Section */}
      <Grid
        container
        spacing={2}
        sx={{ padding: isMobile ? '20px' : '40px', maxWidth: '1200px', margin: 'auto' }}
      >
        {/* Logo and Social Media */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#FFFFFF',
              fontSize: isMobile ? '0.8rem' : '1.5rem',
            }}
          >
            {homePage?.[0]?.FooterHeading || 'HalalFly'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.6,
              mb: 2,
              color: '#FAF3E0',
              fontSize: isMobile ? '0.7rem' : '0.9rem',
            }}
          >
            {homePage?.[0]?.FooterText || 'Your travel partner for Umrah and Hajj.'}
          </Typography>
          <Box>
            {[
              { icon: <FacebookIcon />, link: 'https://www.facebook.com', label: 'Facebook' },
              { icon: <InstagramIcon />, link: 'https://www.instagram.com/halalfly/', label: 'Instagram' },
              { icon: <WhatsAppIcon />, link: 'https://wa.me/491779365929', label: 'WhatsApp' },
              { icon: <TikTokIcon />, link: 'https://www.tiktok.com/@halal.fly', label: 'TikTok' },
            ].map((item, index) => (
              <IconButton
                key={index}
                sx={{ color: '#FAF3E0', mx: 0.5 }}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
              >
                {item.icon}
              </IconButton>
            ))}
          </Box>
        </Grid>

        {/* Quick Links */}
        {!isMobile && (
          <Grid item xs={12} sm={4} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#FFFFFF',
                fontSize: isMobile ? '0.8rem' : '1.2rem',
              }}
            >
              {Translation_german.QUICK_LINKS_TITLE}
            </Typography>
            {[
              { label: Translation_german.PRIVACY_POLICY, path: '/privacy-policy' },
              { label: Translation_german.TERMS_AND_CONDITIONS_LINK, path: '/terms-and-conditions' },
              { label: Translation_german.OWNERS_DETAILS, path: '/owners-details' },
              { label: Translation_german.FAQS_LINK, path: '' },
            ].map((link, index) => (
              <Typography
                key={index}
                variant="body2"
                onClick={() => handleNavigation(link.path)}
                sx={{
                  cursor: 'pointer',
                  color: '#FAF3E0',
                  fontSize: isMobile ? '0.7rem' : '0.9rem',
                  mb: 1,
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Grid>
        )}

        {/* Newsletter Subscription */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#FFFFFF',
              fontSize: isMobile ? '0.8rem' : '1.2rem',
            }}
          >
            {Translation_german.NEWSLETTER_TITLE}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: '#FAF3E0',
              fontSize: isMobile ? '0.7rem' : '0.9rem',
            }}
          >
            {Translation_german.NEWSLETTER_DESCRIPTION}
          </Typography>
          <TextField
            variant="outlined"
            placeholder={Translation_german.NEWSLETTER_PLACEHOLDER}
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
            {Translation_german.SUBSCRIBE_BUTTON}
          </Button>
        </Grid>
      </Grid>

      {/* Bottom Footer Section */}
      <Box
        sx={{
          textAlign: 'center',
          padding: isMobile ? '15px 0' : '20px 0',
          backgroundColor: '#004e8c',
          color: '#FAF3E0',
        }}
      >
        <Typography variant="body2">{Translation_german.COPYRIGHT_TEXT}</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
