import React, { useState } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleToggle}
      sx={{
        backgroundColor: '#F0F0F0', // Light gray for the accordion body for readability
        marginBottom: 2,
        borderRadius: '8px',
        boxShadow: expanded ? '0px 4px 10px rgba(0, 0, 0, 0.15)' : '0px 2px 5px rgba(0, 0, 0, 0.1)', // Softer shadow when expanded
        '&:hover': { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)' }, // Slight hover effect for interaction
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#FF8C42' }} />} // Orange for the expand icon
        sx={{
          backgroundColor: '#004e8c', // Dark blue for the accordion header
          color: '#FFFFFF', // White text for better contrast
          fontWeight: 'bold',
          fontSize: { xs: '1rem', sm: '1.25rem' },
          padding: '10px 20px', // More spacious padding
          borderRadius: '8px 8px 0 0',
        }}
      >
        {question}
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 2, color: '#0C0C0C' }}> {/* Darker text for the answer */}
        {answer}
      </AccordionDetails>
    </Accordion>
  );
};

const FAQs = () => {
  const faqList = [
    {
      question: 'How can I book a package?',
      answer: 'You can easily book any package by clicking on the "View Details" button and following the steps to complete the booking process.',
    },
    {
      question: 'Do you offer group discounts?',
      answer: 'Yes, we offer group discounts. Please contact our customer service for more details.',
    },
    {
      question: 'Can I customize my Umrah or Hajj package?',
      answer: 'Yes, we offer customizable packages based on your preferences and budget.',
    },
    {
      question: 'Are flights included in the packages?',
      answer: 'Some packages include flights, while others don’t. Please check the package details for more information.',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ padding: '50px 20px', backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)' }}> {/* White background for better readability */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: '#FF8C42', fontWeight: 'bold', marginBottom: '30px', letterSpacing: '1px' }} // Orange heading text with spacing
      >
        Frequently Asked Questions
      </Typography>
      <Box>
        {faqList.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </Box>
    </Container>
  );
};

export default FAQs;
