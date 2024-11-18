import React, { useState } from 'react';
import { Form, useLocation } from 'react-router-dom';
import { useTheme, useMediaQuery, Container, TextField, Button, Grid, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Box } from '@mui/material';
import Translation_german from '../Translation/translation_german';
import { createB2bForm } from 'src/services';
import { createB2bFormApiReset } from 'src/reducers';
import { useDispatch } from 'react-redux';
import LoadingScreen from '../LoadingScreen';

const BusinessCollaborationForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const { b2bPackages } = location.state || {};
  const [needsPackage, setNeedsPackage] = useState(false);
  const [selectedPackageType, setSelectedPackageType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const [message, setMessage] = useState(null); // State to store the feedback message
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();

  // Static package types
  const packageTypes = ["GoUmrah", "GoUmrahLite", "Prime"];
  const [formData, setFormData] = useState({
    SELECT_PACKAGE: selectedPackageType, // Initial string value
    MOBILE_NUMBER: '', // Should be a string representing the date
    NUM_PILGRIMS: 1, // Initial numeric value
    ORGANIZATION_TYPE: '', // Should be a string representing the date
    ORGANIZATION_ADDRESS: '', // Should be a non-empty string
    CONTACT_NAME: '', // Should be a non-empty string for phone number
    VISA_REQUIRED: false, // Initial boolean value
    SELECT_DATE: selectedDateRange, // Should be a string representing the date of birth
    DEPARTURE_CITY:selectedCity,
    ORGANIZATION_NAME:'',
    EMAIL:''
  });

  const handleNeedsPackageChange = (event) => {
    setNeedsPackage(event.target.checked);
    setSelectedPackageType('');
    setSelectedCity('');
    setSelectedDateRange('');
    setAvailableCities([]);
    setAvailableDates([]);
    setTotalDays(0);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "VISA_REQUIRED") {
      // Map "Ja" to true and "Nein" to false
      setFormData({ ...formData, [name]: value === "Ja" ? true : false });
    } 
    else if (name === "NUM_PILGRIMS") {
        // Convert the value to a number before setting it
        setFormData({ ...formData, [name]: Number(value) });
    } 
    else {
        setFormData({ ...formData, [name]: value });
    }
};



  const handlePackageTypeChange = (event) => {
    const packageType = event.target.value;
    setSelectedPackageType(packageType);
    setFormData({ ...formData, SELECT_PACKAGE: packageType }); // Synchronize with formData
    setSelectedCity('');
    setSelectedDateRange('');
    setTotalDays(0);

    const citiesForPackage = b2bPackages?.map(pkg => pkg.CityType);
    setAvailableCities([...new Set(citiesForPackage)]);
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setFormData({ ...formData, DEPARTURE_CITY: city }); // Synchronize with formData
    setSelectedCity(city);
    setSelectedDateRange('');
    setTotalDays(0);

    const selectedPackageDates = b2bPackages.find(pkg => pkg.CityType === city)?.dates || [];
    setAvailableDates(selectedPackageDates);
  };

  const handleDateRangeChange = (event) => {
    const dateRange = event.target.value;
    setSelectedDateRange(dateRange);
    setFormData({...formData, SELECT_DATE:dateRange} )
    const { dateFrom, dateTo } = availableDates.find(d => `${d.dateFrom}-${d.dateTo}` === dateRange);
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);
    const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    setTotalDays(daysDifference);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    try {
      await dispatch (createB2bForm(formData));
      setMessage({
        text: 'Formular erfolgreich übermittelt!',
        type: 'success',
      });      
      setSelectedPackageType('')
      setSelectedCity('')
      setSelectedDateRange('')
      setNeedsPackage(false)
      setFormData({
              ORGANIZATION_NAME: '',
              ORGANIZATION_TYPE: '',
              ORGANIZATION_ADDRESS: '',
              CONTACT_NAME: '',
              EMAIL: '',
              MOBILE_NUMBER: '',
              NUM_PILGRIMS: '',
              EMAIL:'',
              VISA_REQUIRED:false,
            
            });
      } 
    catch (error) {
      setMessage({
        text: 'Fehler beim Übermitteln des Formulars.',
        type: 'error',
      });
      console.error('Error submitting form:', error);
    }
    finally{
      dispatch(createB2bFormApiReset());
    }
    setLoading(false); // Set loading back to false after the API call completes
  };

//  const handleSubmit = (event) => {
//     event.preventDefault();
//     setErrorMessage('');
//     setSuccessMessage('');
//     console.log("there1")

//     // Check for missing required fields
//     const missingFields = Object.keys(formData).filter(
//       (key) => formData[key].trim() === ''
//     );
//     if (missingFields.length > 0) {
//       console.log("there2")
//       setErrorMessage(
//         `Please fill in all fields: ${missingFields
//           .map((field) => Translation_german[field])
//           .join(', ')}`
//       );
//       return;
//     }

//     setSuccessMessage('Form successfully submitted!');
//     console.log('Form submitted:', formData);

//     // Clear form fields
//     setFormData({
//       ORGANIZATION_NAME: '',
//       ORGANIZATION_TYPE: '',
//       ORGANIZATION_ADDRESS: '',
//       CONTACT_NAME: '',
//       EMAIL: '',
//       MOBILE_NUMBER: '',
//       NUM_PILGRIMS: '',
//     });
//   };

  return (
    <Container maxWidth="md" sx={{ mt: 5, padding: { xs: 3, md: 6 }, borderRadius: 0, backgroundColor: '#fff' }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: '#FF8C42',
          fontWeight: 'bold',
          marginBottom: 4,
          marginLeft: { xs: 0, md: 10 },
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          fontSize: { xs: isMobile && '1.3rem', sm: isMobile && '1.7rem', md: '3rem' },
        }}
      >
        {Translation_german.FORM_TITLE}
      </Typography>

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
     {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <LoadingScreen />
        </Box>
      ) : (
      <Paper
      component='form'
      onSubmit={handleSubmit}
        elevation={3}
        sx={{
          maxWidth: '800px',
          margin: '40px auto',
          padding: '50px',
          backgroundColor: '#F0F0F0',
          borderRadius: '20px',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          color: '#333',
        }}

      >
        <Typography
          variant={isMobile ? 'h6' : 'h4'}
          gutterBottom
          sx={{
            textAlign: 'center',
            color: '#004e8c',
            fontWeight: 'bold',
            marginBottom: '40px',
            textTransform: 'uppercase',
            letterSpacing: '1.2px',
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          {Translation_german.PARTNERSHIP_REQUEST}
        </Typography>

        {/* Organization Information */}
        <Typography
          variant={isMobile ? "body2" : "h6"}
          sx={{
            marginTop: '30px',
            color: '#FF8C42',
            fontWeight: 'bold',
            marginBottom: '20px',
            textTransform: 'uppercase',
          }}
        >
          {Translation_german.ORGANIZATION_INFO}
        </Typography>

        <Grid container spacing={3} sx={{ marginBottom: '30px' }}>
          {/* Organization Name */}
          <Grid item xs={12}>
            <TextField
              
              label={Translation_german.ORGANIZATION_NAME}
              fullWidth
              name="ORGANIZATION_NAME"
              value={formData.ORGANIZATION_NAME}
              onChange={handleChange}
              required

              InputLabelProps={{ style: { color: '#004e8c', fontSize: isMobile && '0.7rem' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': { borderColor: '#D5B782' },
                  '&:hover fieldset': { borderColor: '#FF8C42' },
                  '&.Mui-focused fieldset': { borderColor: '#C01718' },
                },
                '& .MuiInputBase-root': { color: '#333', fontSize: isMobile && '0.7rem' },
              }}
            />
          </Grid>

          {/* Type of Organization */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel sx={{ color: '#004e8c', fontSize: isMobile && '0.7rem' }}>
                {Translation_german.ORGANIZATION_TYPE}
              </InputLabel>
              <Select
              required
              name ="ORGANIZATION_TYPE"
                label={Translation_german.ORGANIZATION_TYPE}
                value={formData.ORGANIZATION_TYPE}
                onChange={handleChange}
                sx={{
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#D5B782' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FF8C42' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#C01718' },
                  '& .MuiSelect-select': { color: '#333' },
                }}
              >
                <MenuItem sx={{ color: '#004e8c', fontSize: isMobile && '0.7rem' }} value="TravelAgency">
                  {Translation_german.TYPE_TRAVEL_AGENCY}
                </MenuItem>
                <MenuItem sx={{ fontSize: isMobile && '0.7rem' }} value="Corporate">
                  {Translation_german.TYPE_CORPORATE}
                </MenuItem>
                <MenuItem sx={{ fontSize: isMobile && '0.7rem' }} value="NGO">
                  {Translation_german.TYPE_NGO}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Organization Address */}
          <Grid item xs={12}>
            <TextField
            required
            name="ORGANIZATION_ADDRESS"
              label={Translation_german.ORGANIZATION_ADDRESS}
              fullWidth
              value={formData.ORGANIZATION_ADDRESS}
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#004e8c', fontSize: isMobile && '0.7rem' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': { borderColor: '#D5B782' },
                  '&:hover fieldset': { borderColor: '#FF8C42' },
                  '&.Mui-focused fieldset': { borderColor: '#C01718' },
                },
                '& .MuiInputBase-root': { color: '#333', fontSize: isMobile && '0.7rem' },
              }}
            />
          </Grid>

          {/* Contact Name */}
          <Grid item xs={12}>
            <TextField
            required
              label={Translation_german.CONTACT_NAME}
              fullWidth
              name="CONTACT_NAME"
              value={formData.CONTACT_NAME}
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#004e8c', fontSize: isMobile && '0.7rem' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': { borderColor: '#D5B782' },
                  '&:hover fieldset': { borderColor: '#FF8C42' },
                  '&.Mui-focused fieldset': { borderColor: '#C01718' },
                },
                '& .MuiInputBase-root': { color: '#333', fontSize: isMobile && '0.7rem' },
              }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
            required
            name="EMAIL"
              label={Translation_german.EMAIL}
              type="email"
              fullWidth
              value={formData.EMAIL}
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#004e8c', fontSize: isMobile && '0.7rem' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': { borderColor: '#D5B782' },
                  '&:hover fieldset': { borderColor: '#FF8C42' },
                  '&.Mui-focused fieldset': { borderColor: '#C01718' },
                },
                '& .MuiInputBase-root': { color: '#333', fontSize: isMobile && '0.7rem' },
              }}
            />
          </Grid>

          {/* Mobile Number */}
          <Grid item xs={12}>
            <TextField
            required
            name="MOBILE_NUMBER"
              label={Translation_german.MOBILE_NUMBER}
              type="tel"
              fullWidth
              value={formData.MOBILE_NUMBER}
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#004e8c', fontSize: isMobile && '0.7rem' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': { borderColor: '#D5B782' },
                  '&:hover fieldset': { borderColor: '#FF8C42' },
                  '&.Mui-focused fieldset': { borderColor: '#C01718' },
                },
                '& .MuiInputBase-root': { color: '#333', fontSize: isMobile && '0.7rem' },
              }}
            />
          </Grid>
        </Grid>

        {/* Reservation Details */}
        <Typography
          variant="h6"
          sx={{
            marginTop: '20px',
            color: '#FF8C42',
            fontWeight: 'bold',
            marginBottom: '20px',
            textTransform: 'uppercase',
          }}
        >
          {Translation_german.RESERVATION_DETAILS}
        </Typography>

        <Grid container spacing={3} sx={{ marginBottom: '30px' }}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            {/* Step 1: Need Package Toggle */}
            <Grid item xs={12} sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={needsPackage}
                    onChange={handleNeedsPackageChange}
                    color="primary"
                  />
                }
                label={Translation_german.SELECT_PACKAGE}
                sx={{ fontSize: isMobile && '0.7rem', color: '#004e8c' }}
              />
            </Grid>

            {/* Conditional Steps for Package Selection */}
            {needsPackage && (
              <>
                {/* Step 2: Package Type Selection */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" sx={{ marginBottom: 3 }}>
                    <InputLabel sx={{ fontSize: isMobile && '0.7rem' }}>{Translation_german.SELECT_PACKAGE}</InputLabel>
                    <Select
                    name="SELECT_PACKAGE"
                    required
                      value={selectedPackageType}
                      
                      onChange={handlePackageTypeChange}
                      label={Translation_german.SELECT_PACKAGE}
                    >
                      {packageTypes.map((packageType, index) => (
                        <MenuItem key={index} value={packageType}>
                          {packageType}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Step 3: City Selection */}
                {selectedPackageType && (
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" sx={{ marginBottom: 3 }}>
                      <InputLabel sx={{ fontSize: isMobile && '0.7rem' }}>{Translation_german.DEPARTURE_CITY}</InputLabel>
                      <Select
                      required
                        value={selectedCity}
                        onChange={handleCityChange}
                        label={Translation_german.DEPARTURE_CITY}
                      >
                        {availableCities.map((city, index) => (
                          <MenuItem key={index} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {/* Step 4: Date Range Selection */}
                {selectedCity && (
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined" sx={{ marginBottom: 3 }}>
                      <InputLabel sx={{ fontSize: isMobile && '0.7rem' }}>{Translation_german.SELECT_DATE}</InputLabel>
                      <Select
                      required
                        value={selectedDateRange}
                        onChange={handleDateRangeChange}
                        label={Translation_german.SELECT_DATE}
                      >
                        {availableDates.map((date, index) => (
                          <MenuItem key={index} value={`${date.dateFrom}-${date.dateTo}`}>
                            {`${new Date(date.dateFrom).toLocaleDateString('de-DE', { month: 'long', day: 'numeric', year: 'numeric' })} - ${new Date(date.dateTo).toLocaleDateString('de-DE', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}

                {/* Display Total Days */}
                {selectedDateRange && (
                  <Typography variant="body1" sx={{ fontSize: isMobile && '0.7rem', marginTop: 2, fontWeight: 'bold', color: '#C01718' }}>
                    {Translation_german.TOTAL_DAYS}: {totalDays}
                  </Typography>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
            required
            name="NUM_PILGRIMS"
              label={Translation_german.NUM_PILGRIMS}
              type="number"
              fullWidth
              value={formData.NUM_PILGRIMS}
              onChange={handleChange}
              InputLabelProps={{ style: { color: '#004e8c', fontSize: isMobile && '0.7rem' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': { borderColor: '#D5B782' },
                  '&:hover fieldset': { borderColor: '#FF8C42' },
                  '&.Mui-focused fieldset': { borderColor: '#C01718' },
                },
                '& .MuiInputBase-root': { color: '#333', fontSize: isMobile && '0.7rem' },
              }}
            />
          </Grid>

          {/* Visa Required */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel sx={{ color: '#004e8c', fontSize: isMobile && '0.7rem' }}>{Translation_german.VISA_REQUIRED}</InputLabel>
              <Select
                required
                name="VISA_REQUIRED"
                label={Translation_german.VISA_REQUIRED}
                value={formData.VISA_REQUIRED ? "Ja" : "Nein"} // Display Ja or Nein based on formData value
                onChange={handleChange}
                sx={{
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#D5B782' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FF8C42' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#C01718' },
                  '& .MuiSelect-select': { color: '#333', fontSize: isMobile && '0.7rem' },
                }}
              >
                <MenuItem sx={{ fontSize: isMobile && '0.7rem' }} value="Ja">
                  {Translation_german.VISA_OPTION_YES}
                </MenuItem>
                <MenuItem sx={{ fontSize: isMobile && '0.7rem' }} value="Nein">
                  {Translation_german.VISA_OPTION_NO}
                </MenuItem>
              </Select>

            </FormControl>
          </Grid>
        </Grid>

        {/* Consent and Submit Button */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            fontSize: isMobile && '0.7rem',
            marginTop: '30px',
            backgroundColor: '#FF8C42',
            color: '#FAF3E0',
            fontWeight: 'bold',
            padding: '15px 0',
            borderRadius: '12px',
            '&:hover': { backgroundColor: '#00336a' },
          }}
        >
          {Translation_german.SUBMIT_BUTTON}
        </Button>
      </Paper>)}
    </Container>
  );
};

export default BusinessCollaborationForm;
