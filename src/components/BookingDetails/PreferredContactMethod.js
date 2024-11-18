import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';

const PreferredContactMethod = ({ preferredContactMethod, setPreferredContactMethod }) => {
  return (
    <>
    <Typography 
      variant="h5" 
      sx={{ 
        color: '#004e8c',  // Blue for the title
        fontWeight: 'bold', 
        marginBottom: '16px', 
        textAlign: 'center'  // Center alignment for the title
      }}
    >
      Wie möchten Sie kontaktiert werden?
    </Typography>
    
    <Box 
      sx={{ 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '24px', 
        backgroundColor: '#f9f9f9',  // Light background to make the content stand out
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',  // Subtle shadow for depth
      }}
    >
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <RadioGroup
          id="preferredContactMethod"
          value={preferredContactMethod}
          onChange={(e) => setPreferredContactMethod(e.target.value)}
        >
          <FormControlLabel
            value="email"
            control={
              <Radio 
                sx={{ 
                  color: '#004e8c',  // Blue border for unselected
                  '&.Mui-checked': { color: '#FF8C42' },  // Orange when selected
                  '&:hover': { backgroundColor: 'rgba(255, 140, 66, 0.1)' }  // Light hover effect
                }} 
              />
            }
            label={<Typography sx={{ color: '#004e8c', fontWeight: 'bold' }}>E-Mail</Typography>}  // Blue label text
          />
          
          <FormControlLabel
            value="phone"
            control={
              <Radio 
                sx={{ 
                  color: '#004e8c', 
                  '&.Mui-checked': { color: '#FF8C42' },
                  '&:hover': { backgroundColor: 'rgba(255, 140, 66, 0.1)' }
                }} 
              />
            }
            label={<Typography sx={{ color: '#004e8c', fontWeight: 'bold' }}>Telefon</Typography>}  // Blue label text
          />
          
          <FormControlLabel
            value="whatsapp"
            control={
              <Radio 
                sx={{ 
                  color: '#004e8c', 
                  '&.Mui-checked': { color: '#FF8C42' },
                  '&:hover': { backgroundColor: 'rgba(255, 140, 66, 0.1)' }
                }} 
              />
            }
            label={<Typography sx={{ color: '#004e8c', fontWeight: 'bold' }}>WhatsApp</Typography>}  // Blue label text
          />
        </RadioGroup>
      </FormControl>
    </Box>
  </>
  
  );
};

export default PreferredContactMethod;
