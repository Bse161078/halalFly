import React, { useState } from 'react';
import {
  TextField,
  Button,
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
import { useDispatch } from 'react-redux';
import { createGetInTouch } from 'src/services';
import { createGetInTouchApiReset } from 'src/reducers';
import LoadingScreen from '../LoadingScreen';
import Translation_german from '../Translation/translation_german';
import { Circle } from '@mui/icons-material';

const ContactUsForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null); // State to store the feedback message

  const [formData, setFormData] = useState({
    PackageType: Translation_german.UMRAH_PACKAGE_OPTION,
    DepartureDate: '',
    NumberOfTraveler: 1,
    ArrivalDate: '',
    Name: '',
    Phoneno: '',
    IsFlightIncluded: false,
    DOB: '12-12-2222', // Static DOB value
    Email: '',
});

const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "NumberOfTraveler" ? parseInt(value, 10) || 1 : value,
    }));
};

const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Set the static DOB value before sending to the backend
    const formDataToSend = {
        ...formData,
        DOB: '12-12-2222', // Ensure DOB is always the static value
    };

    try {
        await dispatch(createGetInTouch(formDataToSend));
        setMessage({
            text: 'Formular erfolgreich übermittelt!',
            type: 'success',
        });

        // Reset the form fields after submission
        setFormData({
            PackageType: Translation_german.UMRAH_PACKAGE_OPTION,
            DepartureDate: '',
            NumberOfTraveler: 1,
            ArrivalDate: '',
            Name: '',
            Phoneno: '',
            IsFlightIncluded: false,
            DOB: '12-12-2222', // Reset to static value if needed in form
            Email: '',
        });
    } catch (error) {
        setMessage({
            text: 'Fehler beim Übermitteln des Formulars.',
            type: 'error',
        });
        console.error('Error submitting form:', error);
    } finally {
        dispatch(createGetInTouchApiReset());
        setLoading(false);
    }
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
            {/* Show feedback message */}
            {message && (
        <Box
          sx={{
            mb: 2,
            padding: 2,
            color: message.type === 'success' ? 'green' : 'red',
            backgroundColor: message.type === 'success' ? '#e0f7e9' : '#fdecea',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          {message.text}
        </Box>
      )}

        
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
          {Translation_german.CONTACT_US_FORM_TITLE}
        </Typography>
        <Divider sx={{ my: isMobile ? 2 : 4, borderBottom: '2px solid #FF8C42' }} />

        <Grid container spacing={isMobile ? 2 : 3}>
          {/* Full Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={Translation_german.FULL_NAME_LABEL}
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
              sx={inputStyle}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={Translation_german.EMAIL_LABEL}
              name="Email"
              type='email'
              value={formData.Email}
              onChange={handleChange}
              required
              sx={inputStyle}
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={Translation_german.PHONE_LABEL}
              name="Phoneno"
              type="tel"
              value={formData.Phoneno}
              onChange={handleChange}
              required
              sx={inputStyle}
            />
          </Grid>

          {/* Package Type */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="standard">
              <InputLabel sx={{ color: '#004e8c' }}>
                {Translation_german.PACKAGE_TYPE_LABEL}
              </InputLabel>
              <Select
              required
                name="PackageType"
                value={formData.packageType}
                onChange={handleChange}
                sx={inputStyle}
              >
                <MenuItem value={Translation_german.UMRAH_PACKAGE_OPTION}>
                  {Translation_german.UMRAH_PACKAGE_OPTION}
                </MenuItem>
                <MenuItem value={Translation_german.LAND_PACKAGE_OPTION}>
                  {Translation_german.LAND_PACKAGE_OPTION}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Number of Travelers */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={Translation_german.NUM_TRAVELERS_LABEL}
              name="NumberOfTraveler"
              type='number'
              value={formData.NumberOfTraveler}
              onChange={handleChange}
              required
              sx={inputStyle}
            />
          </Grid>

          {/* Arrival Date */}
          <Grid item xs={12} sm={6}>
            <TextField
            required
              fullWidth
              label={Translation_german.ARRIVAL_DATE_LABEL}
              name="ArrivalDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.ArrivalDate}
              onChange={handleChange}
              sx={inputStyle}
            />
          </Grid>

          {/* Departure Date */}
          <Grid item xs={12} sm={6}>
            <TextField
            required
              fullWidth
              label={Translation_german.DEPARTURE_DATE_LABEL}
              name="DepartureDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.DepartureDate}
              onChange={handleChange}
              sx={inputStyle}
            />
          </Grid>

          {/* Flight Tickets */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: '#004e8c', fontSize: isMobile ? '0.85rem' : '1rem' }}>
                {Translation_german.FLIGHT_TICKETS_LABEL}
              </FormLabel>
              <RadioGroup
                row={!isMobile}
                name="IsFlightIncluded"
                value={formData.IsFlightIncluded}
                onChange={(event) => setFormData({
                  ...formData,
                  IsFlightIncluded: event.target.value === "true" // Convert string "true"/"false" to actual boolean
                })}
                sx={{ flexDirection: isMobile ? 'column' : 'row' }}
              >
                <FormControlLabel value={true} control={<Radio sx={radioStyle} />} label={Translation_german.YES_OPTION} />
                <FormControlLabel value={false} control={<Radio sx={radioStyle} />} label={Translation_german.NO_OPTION} />
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
            > {loading ? (
              <Circle size={24} sx={{ color: '#fff' }} />
            ) : (
              Translation_german.SUBMIT_BUTTON_TEXT
            )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactUsForm;
