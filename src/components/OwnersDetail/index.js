import React from 'react';
import { Container, Typography, Grid, Paper, Box, Avatar } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Translation_german from '../Translation/translation_german';
import avatar from '../../assets/images/halal-fly-logo.png'
const OwnerDetails = () => {
  return (
    <Container maxWidth="md" sx={{ padding: { xs: 3, md: 6 }, marginTop: 5 }}>
      {/* Header */}
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#004e8c', mb: 4 }}>
        {Translation_german.OWNER_DETAILS_TITLE}
      </Typography>

      <Paper elevation={4} sx={{ padding: 4, borderRadius: '16px', backgroundColor: '#F0F8FF' }}>
        {/* Owner Avatar */}
        <Box display="flex" justifyContent="center" mb={4}>
          <Avatar 
            src={avatar} 
            alt="Owner Avatar"
            sx={{ width: 120, height: 120, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }} 
          />
        </Box>

        {/* Owner Information */}
        <Grid container spacing={4}>
          {/* Business Name */}
          <Grid item xs={12} sm={6} md={4}>
            <Box display="flex" alignItems="center">
              <BusinessIcon sx={{ color: '#FF8C42', fontSize: 32, marginRight: 2 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#004e8c' }}>
                  {Translation_german.BUSINESS_NAME}
                </Typography>
                <Typography variant="body2" sx={{ color: '#333' }}>
                  HalalFly GmbH
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6} md={4}>
            <Box display="flex" alignItems="center">
              <EmailIcon sx={{ color: '#FF8C42', fontSize: 32, marginRight: 2 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#004e8c' }}>
                  {Translation_german.EMAIL_LABEL}
                </Typography>
                <Typography variant="body2" sx={{ color: '#333' }}>
                  owner@halalfly.com
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={6} md={4}>
            <Box display="flex" alignItems="center">
              <PhoneIcon sx={{ color: '#FF8C42', fontSize: 32, marginRight: 2 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#004e8c' }}>
                  {Translation_german.PHONE_LABEL}
                </Typography>
                <Typography variant="body2" sx={{ color: '#333' }}>
                  +49 123 456 7890
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Location */}
          <Grid item xs={12} sm={6} md={4}>
            <Box display="flex" alignItems="center">
              <LocationOnIcon sx={{ color: '#FF8C42', fontSize: 32, marginRight: 2 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#004e8c' }}>
                  {Translation_german.LOCATION_LABEL}
                </Typography>
                <Typography variant="body2" sx={{ color: '#333' }}>
                  Berlin, Germany
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default OwnerDetails;
