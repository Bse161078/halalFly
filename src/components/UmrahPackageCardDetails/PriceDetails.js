import React from 'react';
import { Typography, Box } from '@mui/material';

const PriceDetails = ({ finalPrice }) => {
  return (
    <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ fontWeight: 'bold', color: '#004e8c', textAlign: 'center' }}
          >
            Total Price: <span style={{ color: '#ff8c42', fontSize: '2rem' }}>€{finalPrice}</span>
          </Typography>

          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ mt: 2, fontStyle: 'italic', textAlign: "center", color: '#666', fontSize: '0.9rem' }}
          >
            *Price may vary based on availability.
          </Typography>
        </Box>
  

  );
};

export default PriceDetails;
