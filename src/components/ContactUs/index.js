import React, { useState } from 'react';
import {
  TextField,
  Button,
  Tooltip,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  Container,
  Typography,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

const ContactUsForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    packageType: 'Umrah Package',
    numTravelers: '',
    arrivalDate: '',
    departureDate: '',
    flight: 'No',
    hotelClass: '5 Star',
    roomType: 'Single',
    transfer: 'No',
    transport: 'No',
    activities: 'No',
    specialRequests: '',
    contactMethod: 'Email',
  });

  const roomTypes = {
    Single: { persons: 1, color: '#4CAF50' },
    Double: { persons: 2, color: '#2196F3' },
    Triple: { persons: 3, color: '#FF9800' },
    Quad: { persons: 4, color: '#E91E63' },
  };

  const renderPersons = (count, color) => {
    return Array.from({ length: count }, (_, index) => (
      <PersonIcon key={index} sx={{ color, fontSize: isMobile ? '1rem' : '1.5rem' }} />
    ));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    alert('Form submitted successfully!');
  };

  // Adjustments to input and radio styles for mobile view
  const inputStyle = {
    height: isMobile ? '48px' : '56px',
    fontSize: isMobile ? '0.9rem' : '1rem',
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: '#004e8c' },
      '&:hover fieldset': { borderColor: '#FF8C42' },
      '&.Mui-focused fieldset': { borderColor: '#FF8C42' },
    },
  };

  const radioStyle = {
    color: '#004e8c',
    '&.Mui-checked': { color: '#FF8C42' },
  };

  return (
    <Container maxWidth="md" sx={{ padding: 4, borderRadius: 3, marginTop: 5 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: '#F0F0F0',
          padding: isMobile ? 3 : 4,
          borderRadius: 2,
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          gutterBottom
          align="center"
          sx={{ color: '#004e8c', fontWeight: 'bold', mb: isMobile ? 2 : 4 }}
        >
          Contact Us
        </Typography>
        <Divider sx={{ my: isMobile ? 2 : 4, borderBottom: '2px solid #FF8C42' }} />

        <Grid container spacing={isMobile ? 2 : 3}>
          {/* Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={inputStyle}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={inputStyle}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              sx={inputStyle}
            />
          </Grid>

          {/* Package Type */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel sx={{ color: '#004e8c' }}>Package Type</InputLabel>
              <Select
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
                sx={inputStyle}
              >
                <MenuItem value="Umrah Package">Umrah Package</MenuItem>
                <MenuItem value="Land Package">Land Package</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Number of Travelers */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Travelers"
              name="numTravelers"
              type="number"
              value={formData.numTravelers}
              onChange={handleChange}
              required
              sx={inputStyle}
            />
          </Grid>

          {/* Arrival Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Arrival Date"
              name="arrivalDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.arrivalDate}
              onChange={handleChange}
              sx={inputStyle}
            />
          </Grid>

          {/* Departure Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Departure Date"
              name="departureDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.departureDate}
              onChange={handleChange}
              sx={inputStyle}
            />
          </Grid>

          {/* Flight Tickets */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: '#004e8c', fontSize: isMobile ? '0.85rem' : '1rem' }}>
                Do you already have flight tickets?
              </FormLabel>
              <RadioGroup
                row={!isMobile}
                name="flight"
                value={formData.flight}
                onChange={handleChange}
                sx={{ flexDirection: isMobile ? 'column' : 'row' }}
              >
                <FormControlLabel value="Yes" control={<Radio sx={radioStyle} />} label="Yes" />
                <FormControlLabel value="No" control={<Radio sx={radioStyle} />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#FF8C42',
                color: 'white',
                padding: isMobile ? 1.5 : 2,
                borderRadius: '8px',
                fontSize: isMobile ? '0.9rem' : '1rem',
                '&:hover': {
                  backgroundColor: '#FF7321',
                },
              }}
              fullWidth
            >
              Submit Your Request
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactUsForm;
