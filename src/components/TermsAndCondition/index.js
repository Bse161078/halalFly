import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Translation_german from '../Translation/translation_german';

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ padding: { xs: 2, md: 6 }, marginTop: 5 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: '#004e8c' }}>
        {Translation_german.TERMS_AND_CONDITIONS_TITLE}
      </Typography>

      <Box sx={{ backgroundColor: '#F7F7F7', padding: 3, borderRadius: '8px' }}>
        <Typography variant="h6" sx={{ color: '#FF8C42', mb: 2 }}>
          {Translation_german.EFFECTIVE_DATE}
        </Typography>

        <Typography variant="body1" paragraph>
          {Translation_german.INTRODUCTION_TERMS_AND_CONDITIONS}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          1. {Translation_german.ACCEPTANCE_OF_TERMS}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.ACCEPTANCE_OF_TERMS_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          2. {Translation_german.USE_OF_SERVICES}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.USE_OF_SERVICES_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          3. {Translation_german.USER_RESPONSIBILITIES}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.USER_RESPONSIBILITIES_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          4. {Translation_german.PAYMENT_TERMS}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.PAYMENT_TERMS_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          5. {Translation_german.MODIFICATION_OF_TERMS}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.MODIFICATION_OF_TERMS_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          6. {Translation_german.TERMINATION_OF_SERVICE}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.TERMINATION_OF_SERVICE_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          7. {Translation_german.GOVERNING_LAW}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.GOVERNING_LAW_DESCRIPTION}
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 4, color: '#004e8c' }}>
          8. {Translation_german.CONTACT_INFORMATION}
        </Typography>
        <Typography variant="body1" paragraph>
          {Translation_german.CONTACT_INFORMATION_DESCRIPTION}
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;
