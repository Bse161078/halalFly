import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Translation_german from '../Translation/translation_german';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ padding: { xs: 2, md: 6 }, marginTop: 5 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: '#004e8c' }}>
        {Translation_german.TITLE}
      </Typography>

      <Box sx={{ backgroundColor: '#F7F7F7', padding: 3, borderRadius: '8px' }}>
        <Typography variant="h6" sx={{ color: '#FF8C42', mb: 2 }}>
          {Translation_german.EFFECTIVE_DATE}
        </Typography>

        <Typography variant="body1" paragraph>
          {Translation_german.INTRODUCTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          {Translation_german.INFORMATION_WE_COLLECT}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.INFORMATION_WE_COLLECT_DESCRIPTION}
        </Typography>

        <Typography variant="h6" sx={{ color: '#FF8C42' }}>{Translation_german.PERSONAL_INFORMATION}</Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.PERSONAL_INFORMATION_DESCRIPTION}
          <ul>
            <li>{Translation_german.FULL_NAME}</li>
            <li>{Translation_german.EMAIL_ADDRESS}</li>
            <li>{Translation_german.PHONE_NUMBER}</li>
            <li>{Translation_german.PASSPORT_DETAILS}</li>
            <li>{Translation_german.PAYMENT_INFORMATION}</li>
            <li>{Translation_german.TRAVEL_DETAILS}</li>
          </ul>
        </Typography>

        <Typography variant="h6" sx={{ color: '#FF8C42' }}>{Translation_german.NON_PERSONAL_INFORMATION}</Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.NON_PERSONAL_INFORMATION_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          {Translation_german.HOW_WE_USE_YOUR_INFORMATION}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.HOW_WE_USE_YOUR_INFORMATION_DESCRIPTION}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.PURPOSES_LIST.split('\n').map((line, index) => (
            <span key={index}>{line}<br /></span>
          ))}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          {Translation_german.HOW_WE_SHARE_YOUR_INFORMATION}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.HOW_WE_SHARE_YOUR_INFORMATION_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          {Translation_german.DATA_SECURITY}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.DATA_SECURITY_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          {Translation_german.COOKIES_AND_TRACKING}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.COOKIES_AND_TRACKING_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          {Translation_german.YOUR_DATA_RIGHTS}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.YOUR_DATA_RIGHTS_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          {Translation_german.DATA_RETENTION}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.DATA_RETENTION_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          {Translation_german.CHANGES_TO_POLICY}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.CHANGES_TO_POLICY_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          {Translation_german.CONTACT_US}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.CONTACT_US_DESCRIPTION}
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
