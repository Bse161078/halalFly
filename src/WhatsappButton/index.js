import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { IconButton, Box } from '@mui/material';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Open WhatsApp chat to a specific number
    window.open(
        'https://wa.me/491779365929?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20Umrah%20packages%20and%20Hajj%20packages.%20Can%20you%20please%20assist%20me?',
        '_blank'
      );  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={handleWhatsAppClick}
        sx={{
          backgroundColor: '#25D366',
          color: '#fff',
          width: 60,
          height: 60,
          '&:hover': {
            backgroundColor: '#128C7E',
          },
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};

export default WhatsAppButton;
