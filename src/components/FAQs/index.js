import React, { useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        expandIcon={<ExpandMoreIcon sx={{ color: '#004e8c', fontSize: isMobile ? '1.2rem' : 'default' }} />}
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

const FAQs = ({faqs}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const faqList = [
    {
      question: 'How do I make a reservation on your website?',
      answer: 'Provide a step-by-step guide on how users can browse and book travel services on your platform.',
    },
    {
      question: 'What documents do I need for my trip, and how do I obtain them?',
      answer: 'Provide the necessary documentation required for international travel, such as passports, visas, and insurance.',
    },
    {
      question: 'In the event that I need to modify or cancel my reservation, what are the policies?',
      answer: 'Outline the cancellation and modification policies, including any fees that may apply.',
    },
    {
      question: 'Can you specify the types of credit/debit cards, digital wallets, or other payment methods accepted?',
      answer: 'List the accepted payment methods available on your website.',
    },
  ];

  return (
    <Container sx={{ py: 5 }}>
      {/* Title and Subtitle */}
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        align="center"
        sx={{
          color: '#004e8c',
          fontWeight: 'bold',
          mb: isMobile ? 2 : 3,
        }}
      >
        Frequently Asked Questions
      </Typography>
  

      {/* FAQ Items */}
      <Box>
        {faqs?.length>0&&faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.Question} answer={faq.Answer} number={`0${index + 1}`} isMobile={isMobile} />
        ))}
      </Box>
    </Container>
  );
};

export default FAQs;
