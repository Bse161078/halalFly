import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { IconButton, Box } from '@mui/material';

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    // Open WhatsApp chat to a specific number with a localized German message
    const message = encodeURIComponent(
      'Hallo, ich möchte mehr über Ihre Umrah- und Hajj-Pakete erfahren. Können Sie mir bitte weiterhelfen?'
    );
    const phoneNumber = '491779365929'; // Replace with the default WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

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
          backgroundColor: '#25D366', // WhatsApp green
          color: '#fff',
          width: 60,
          height: 60,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            backgroundColor: '#128C7E', // Darker WhatsApp green on hover
            transform: 'scale(1.1)', // Slight scale-up on hover
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)', // Slightly deeper shadow
          },
        }}
        aria-label="WhatsApp Kontakt"
      >
        <WhatsAppIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  );
};

export default WhatsAppButton;
