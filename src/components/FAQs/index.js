import React, { useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const FAQItem = ({ question, answer, number, isMobile }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleToggle}
      sx={{
        backgroundColor: expanded ? '#FAFAFA' : '#FFFFFF',
        marginBottom: isMobile ? 1 : 2,
        borderRadius: '8px',
        boxShadow: expanded ? '0px 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
        border: '1px solid #E0E0E0',
      }}
    >
      <AccordionSummary
        expandIcon={
          expanded ? (
            <RemoveIcon sx={{ color: '#004e8c', fontSize: isMobile ? '1.2rem' : 'default' }} />
          ) : (
            <AddIcon sx={{ color: '#004e8c', fontSize: isMobile ? '1.2rem' : 'default' }} />
          )
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '10px 15px' : '15px 20px',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            width: '30px',
            fontWeight: 'bold',
            color: '#004e8c',
            fontSize: isMobile ? '0.9rem' : '1.1rem',
          }}
        >
          {number}
        </Typography>
        <Typography
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: expanded ? '#004e8c' : '#000',
            fontSize: isMobile ? '0.95rem' : '1rem',
          }}
        >
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: isMobile ? '10px 15px' : '20px', color: '#4A4A4A', fontSize: '0.9rem' }}>
        {answer}
      </AccordionDetails>
    </Accordion>
  );
};

const FAQs = ({ homePage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const FAQS = homePage?.FAQS || [];
  const FaqsTitle = homePage?.FaqsTitle || '';

  return (
    <Container sx={{ py: 5 }}>
      {/* Title */}
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        align="center"
        sx={{
          color: '#004e8c',
          fontWeight: 'bold',
          mb: isMobile ? 2 : 3,
        }}
      >
        {FaqsTitle}
      </Typography>

      {/* FAQ Items */}
      <Box>
        {FAQS?.length > 0 && FAQS.map((faq, index) => (
          <FAQItem key={index} question={faq.Question} answer={faq.Answer} number={`0${index + 1}`} isMobile={isMobile} />
        ))}
      </Box>
    </Container>
  );
};

export default FAQs;
