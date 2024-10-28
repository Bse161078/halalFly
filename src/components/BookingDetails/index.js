import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, useTheme, useMediaQuery, Divider,Select
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getFormOptionsApiReset } from "../../reducers";
import { getFormOptionsApi } from "../../services";
import BookingManagerDetails from './BookingManagerDetails';
import AdultsDetailsForm from './AdultsDetailsForm';
import InfantsDetails from './InfantsDetails';
import PreferredContactMethod from './PreferredContactMethod';
import VisaDescriptionModal from './VisaDescriptionModal';
import { styled } from '@mui/material/styles';
import {createHotelPaymentLinkApiReducer, createHotelPaymentLinkApiReset,
  createTravelCardPaymentLinkApiReducer, createTravelCardPaymentLinkApiReset} from '../../reducers'
import {createHotelPaymentLinkApi, createTravelCardPaymentLinkApi,} from '../../services'
import PaymentOptions from './PaymentOptions';

const CustomSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#004e8c', // Gold border color
    borderRadius: '8px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#FF8C42', // Red on hover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#C01718',
    boxShadow: '0 0 8px rgba(192, 23, 24, 0.5)', // Red glow when focused
  },
  '& .MuiSelect-select': {
    padding: '12px 14px',
    color: '#0C0C0C', // Black text color
  },
  '& .MuiSvgIcon-root': {
    color: '#D5B782', // Gold icon color
  },
  backgroundColor: '#FAF3E0', // Light background for the dropdown
  borderRadius: '8px',
  transition: 'border-color 0.3s, box-shadow 0.3s',
}));

const BookingForm = () => {
  const location = useLocation();
  const [paymentType, setPaymentType] = useState('full'); // Single state for payment type
  const theme =  useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { packageData, finalPrice, adults, children, infants } = location.state || {};
    console.log("packageData",packageData)
  const {data: createTravelCardPaymentLink, loading: createTravelCardPaymentLinkLoading, error: createTravelCardPaymentLinkError} =
  useSelector((state) => state.createTravelCardPaymentLinkApiReducer);
const {data: createHotelPaymentLink, loading: createHotelPaymentLinkLoading, error: createHotelPaymentLinkError} =
  useSelector((state) => state.createHotelPaymentLinkApiReducer);
  console.log("createTravelCardPaymentLink",createTravelCardPaymentLink,createHotelPaymentLink)
  useEffect(() => {
    
    dispatch(createTravelCardPaymentLinkApi({
        travel_card: "6711865ebf40d421a707c21d",
        price:"6711865ebf40d421a707c21e",
        room:"6711865ebf40d421a707c222",
        images:["https://dibbz.s3.amazonaws.com/sixth_out_ot_06_1_2c5b36118e.jpg"],
        number_of_adults:2,
        number_of_infants:1,
        hotel : "6711865ebf40d421a707c220"

    }))


    dispatch(createHotelPaymentLinkApi({
        hotel:"66f871475f65661e14c8dda8",
        price:"66ef626a62c3cca3f476e9f0",
        room:"66ed756c877e8b8f1fdeeb2b",
        activity:"66ed756d877e8b8f1fdeeb2f",
        transfer:"66ed756d877e8b8f1fdeeb2d",
        images:["https://dibbz.s3.amazonaws.com/sixth_out_ot_06_1_2c5b36118e.jpg"],
        number_of_adults:2,
        number_of_infants:2,

    }))

    return function cleanup() {
        
        dispatch(createTravelCardPaymentLinkApiReset());
        dispatch(createHotelPaymentLinkApiReset());
    };
}, []);
  const dispatch = useDispatch();

  const [adultsDetails, setAdultsDetails] = useState(
    Array(adults).fill({ name: '', passport: '', visa: '', nationality: '', visaOptions: [] })
  );
  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(finalPrice);
  const [childrenDetails, setChildrenDetails] = useState(
    Array(children).fill({ name: '', passport: '', nationality: '', visa: '', visaOptions: [] })
  );
  const [visaDescriptionOpen, setVisaDescriptionOpen] = useState(false);
  const [visaDescription, setVisaDescription] = useState('');
  const [bookingManagerDetails, setBookingManagerDetails] = useState({
    name: '', phone: '', email: '', nationality: ''
  });
  const [preferredContactMethod, setPreferredContactMethod] = useState('');

  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        await dispatch(getFormOptionsApi());
      } catch (error) {
        console.error('Error fetching form options:', error);
      }
    };

    fetchFormOptions();

    return () => {
      dispatch(getFormOptionsApiReset());
    };
  }, [dispatch]);

  const { data: allFormOptions } = useSelector((state) => state.formOptionsApiSliceReducer) || {};
  const umrahVisaCountries = allFormOptions?.[0]?.umrahVisaNationality ? allFormOptions[0].umrahVisaNationality.split('\n') : [];
  const tourismVisaCountries = allFormOptions?.[0]?.tourismVisaNationality ? allFormOptions[0].tourismVisaNationality.split('\n') : [];
  const validateForm = () => {
    let formErrors = {};
    adultsDetails.forEach((adult, index) => {
      if (!adult.name) formErrors[`name_${index}`] = 'Name is required';
      if (!adult.passport) formErrors[`passport_${index}`] = 'Passport number is required';
      if (!adult.nationality) formErrors[`nationality_${index}`] = 'Nationality is required';
      if (!adult.visa) formErrors[`visa_${index}`] = 'Visa type is required';
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleAdultChange = (index, field, value) => {
    const updatedAdults = adultsDetails.map((adult, i) => 
      i === index ? { ...adult, [field]: value } : adult
    );

    if (field === 'nationality') {
      const updatedVisaOptions = tourismVisaCountries.includes(value)
        ? [
            { label: 'I have my visa', price: 0 },
            { label: 'Umrah Visa', price: 200 },
            { label: 'Travel Visa', price: 150 },
          ]
        : umrahVisaCountries.includes(value)
        ? [
            { label: 'I have my visa', price: 0 },
            { label: 'Umrah Visa', price: 200 },
          ]
        : [];

      updatedAdults[index] = {
        ...updatedAdults[index],
        visaOptions: updatedVisaOptions,
      };
    }

    if (field === 'visa') {
      const currentVisaPrice = updatedAdults[index].visaOptions.find(v => v.label === value)?.price || 0;
      const oldVisaPrice = adultsDetails[index].visaOptions.find(v => v.label === adultsDetails[index].visa)?.price || 0;
      setTotalPrice(totalPrice + currentVisaPrice - oldVisaPrice);
    }

    setAdultsDetails(updatedAdults);
  };

  const handleVisaInfoClick = () => {
    setVisaDescription(allFormOptions?.[0]?.TravelVisaDecription || "");
    setVisaDescriptionOpen(true);
  };

  const handleClose = () => {
    setVisaDescriptionOpen(false);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted successfully');
    } else {
      console.log('Validation errors');
    }
  };

  return (
    <Paper
    sx={{
      padding: '30px',
      maxWidth: '1200px',
      margin: '20px auto',
      borderRadius: '15px',
      backgroundColor: '#ffffff', // Light background
      color: '#004e8c', // Primary theme blue for text
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)', // Softer shadow for a clean look
    }}
  >
    <Typography variant={isMobile?'h4':"h2"} align='center' gutterBottom sx={{ fontWeight: 'bolder', color: '#004e8c' }}>
      Booking Form
    </Typography>
  
    <BookingManagerDetails
      bookingManagerDetails={bookingManagerDetails}
      setBookingManagerDetails={setBookingManagerDetails}
      visaCountries={[...umrahVisaCountries, ...tourismVisaCountries]}
    />
    <Divider sx={{ my: 3, backgroundColor: '#FF8C42' }} /> {/* Orange divider */}
  
    <AdultsDetailsForm
      adultsDetails={adultsDetails}
      handleAdultChange={handleAdultChange}
      visaCountries={[...umrahVisaCountries, ...tourismVisaCountries]}
      handleVisaInfoClick={handleVisaInfoClick}
      CustomSelect={CustomSelect}
      errors={errors}
    />
    <Divider sx={{ my: 3, backgroundColor: '#FF8C42' }} />
  
    {infants > 0 && (
      <>
        <InfantsDetails infants={infants} />
        <Divider sx={{ my: 3, backgroundColor: '#FF8C42' }} />
      </>
    )}
  
    <PreferredContactMethod
      preferredContactMethod={preferredContactMethod}
      setPreferredContactMethod={setPreferredContactMethod}
    />
  
    <VisaDescriptionModal
      visaDescriptionOpen={visaDescriptionOpen}
      handleClose={handleClose}
      visaDescription={visaDescription}
      tourismVisaCountries={tourismVisaCountries}
    />
  
    <Divider sx={{ my: 3, backgroundColor: '#FF8C42' }} />
  
    <Box sx={{ textAlign: 'center', marginBottom: '24px' }}>
  <Typography 
    variant={isMobile?'h7':"h4"} 
    sx={{ 
      color: '#004e8c', 
      fontWeight: 'bold', 
      marginBottom: '8px',
      textTransform: 'uppercase', // Optional, for a more formal look
    }} 
    gutterBottom
  >
    {paymentType==="full"?"Total Price":"Deposit"}
  </Typography>
  <Typography 
    sx={{ 
      color: '#FF8C42', // Orange color for the price
      fontWeight: 'bold',
      fontSize: isMobile?'1.5rem':'2.5rem', // Larger font size for emphasis
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
      marginBottom: '16px',
    }}
  >
    €{paymentType==="full"?totalPrice:packageData?.DepositPrice}
  </Typography>
  <Typography 
    variant="body1" 
    sx={{ 
      color: '#004e8c', 
      fontWeight: 'bold', 
      fontSize: isMobile?'0.8rem':'1.2rem', 
      marginBottom: '16px',
    }}
  >
    Package: {packageData?.title || packageData?.name}
  </Typography>
</Box>

  
    <Divider sx={{ my: 3, backgroundColor: '#FF8C42' }} />
  
    <PaymentOptions paymentType={paymentType} setPaymentType={setPaymentType}/>

  </Paper>
  
  );
};

export default BookingForm;
