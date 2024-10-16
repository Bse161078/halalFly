import React from 'react';
import { Typography, Box } from '@mui/material';

const InfantsDetails = ({ infants }) => {
  console.log("infants :",infants)
  return (
    <>
      {infants > 0 && (
       <Box
       sx={{
         padding: '20px',
         borderRadius: '12px',
         marginBottom: '24px',
         backgroundColor: '#f9f9f9', // Light background for contrast
         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
         transition: 'transform 0.3s ease',
         '&:hover': {
           transform: 'scale(1.02)', // Slight zoom on hover
           boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)', // Increase shadow on hover
         },
       }}
     >
       <Typography
         variant="h5"
         sx={{
           color: '#004e8c', // Blue title text
           fontWeight: 'bold',
           marginBottom: '12px',
           textAlign: 'center', // Centering the text for a clean look
           fontSize: '1.5rem', // Larger font size for emphasis
         }}
       >
         Infants: {infants}
       </Typography>
     
       <Typography
         variant="body1"
         sx={{
           color: '#666', // Soft gray text for better readability
           textAlign: 'center', // Centering the message
           fontSize: '1rem', // Slightly larger font for readability
           fontStyle: 'italic', // Italic to make the message more subtle
         }}
       >
         No additional details required for infants.
       </Typography>
     </Box>
     
      )}
    </>
  );
};

export default InfantsDetails;
