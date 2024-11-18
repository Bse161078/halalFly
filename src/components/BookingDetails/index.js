import React, { useState, useEffect } from 'react';
import {
  Box, Typography,CircularProgress, Button,Paper, useTheme, useMediaQuery, Divider,Select
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
import Translation_german from '../Translation/translation_german';


const CustomSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    border: "2px solid #004e8c",
    borderRadius: "8px",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#FF8C42 !important",
    boxShadow: "0 0 8px rgba(255, 140, 66, 0.3)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#004e8c",
  },
  "& .MuiSelect-select": {
    color: "#004e8c",
    fontSize: "1rem",
    padding: "12px 16px",
    fontWeight: "bold",
  },
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
}));



const BookingForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const [paymentType, setPaymentType] = useState('full');   // Single state for payment type
  const [selectedMethod, setSelectedMethod] = useState(''); // State to track selected payment method
  const theme =  useTheme();
  const isDeposit = paymentType.includes("deposit");
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {selectedTransferId,selectedActivityId, packageData,selectedMealPlanId,couponId,
    selectedInsuranceIds, finalPrice,selectedRoomsId, couponCode,previousLocation,
    adults, infants,selectedRoom } = location.state || {};
    const [adultsDetails, setAdultsDetails] = useState(
      Array(adults).fill({ name: '', dob: '', visa: '', nationality: '', visaOptions: [] })
    );
    const [errors, setErrors] = useState({});
    const [totalPrice, setTotalPrice] = useState(finalPrice);
   
    const [visaDescriptionOpen, setVisaDescriptionOpen] = useState(false);
    const [visaDescription, setVisaDescription] = useState('');
    const [bookingManagerDetails, setBookingManagerDetails] = useState({
      name: '', phone: '', email: '', address: '',city :'',zipCode:''
    });
    const [preferredContactMethod, setPreferredContactMethod] = useState('');
    const paymentMethod = selectedMethod.toLowerCase();
    const type = previousLocation?.includes("umrah-package") ? "travel_cards" : "hotel";
    const imageIds = packageData?.image?.map((img) => img.url);
    const [generalErrorMessage, setGeneralErrorMessage] = useState('');

    const handlePayClick = async () => {
     
        try {
          const response = await dispatch(
            createTravelCardPaymentLinkApi({
              payment:paymentMethod,
              travel_card: packageData.id || '',
              price: packageData?.price?.id || '',
              insurance: selectedInsuranceIds || [], // array of strings
              coupan: couponCode || '',
              meal: selectedMealPlanId?.id || '',
              number_of_adults: adults || 0,
              number_of_infants: infants || 0,
              images: imageIds || [], // array of strings
              room: selectedRoomsId || [], // array of room IDs
              activity: selectedActivityId || '',
              transfer: selectedTransferId || '',
              currency: "EUR",
              is_deposit: isDeposit || false,
              successUrl: 'https://halalfly-1a512.web.app/payment/success',
              errorUrl:'https://halalfly-1a512.web.app/payment/failure',
              type: type || 'travel_cards',
              bookingDetails: {
                  ContactUs: preferredContactMethod,
                  PaymentMethod: selectedMethod,
                  RoomType: selectedRoom?.RoomTypes,
                  NumOfAdults: adults, // modify as needed
                  ManagerDetails: {
                      Name: bookingManagerDetails?.name,
                      PhoneNo: bookingManagerDetails?.phone,
                      Email: bookingManagerDetails?.email,
                      Address: bookingManagerDetails?.address,
                      City: bookingManagerDetails?.city,
                      ZipCode: bookingManagerDetails?.zipCode
                  },
                  AdultDetails: adultsDetails.map((adult) => ({
                    FullName: adult.name,
                    DOB: adult.dob,
                    Nationality: adult.nationality,
                    VisaType: adult.visa,
                  })),
                  
              }
          }));

          // Open the payment link in a new tab if URL is present in the response
          if (response?.payload?.url) {
            window.open(response.payload.url, '_blank'); // Opens URL in a new tab
        } else if (response?.payload?.links.length>0) {
            window.open(response.payload.links[1].href)
        } else {
          setGeneralErrorMessage("Payment link URL not found in response.");
        }
        } catch (error) {
          setGeneralErrorMessage("Error creating payment link:");
        } finally {
          dispatch(createTravelCardPaymentLinkApiReset()); // Reset API state if needed
        }
      
    };
  
    const validateForm = () => {
      let formErrors = {};
      let firstErrorFieldId = null; // Track the first field with an error
    
      // Validate bookingManagerDetails
      if (!bookingManagerDetails.name) {
        formErrors.name = 'Name des Buchungsmanagers ist erforderlich';
        if (!firstErrorFieldId) firstErrorFieldId = 'bookingManagerName';
      }
      if (!bookingManagerDetails.phone) {
        formErrors.phone = 'Telefonnummer des Buchungsmanagers ist erforderlich';
        if (!firstErrorFieldId) firstErrorFieldId = 'bookingManagerPhone';
      }
      if (!bookingManagerDetails.email) {
        formErrors.email = 'E-Mail des Buchungsmanagers ist erforderlich';
        if (!firstErrorFieldId) firstErrorFieldId = 'bookingManagerEmail';
      }
      if (!bookingManagerDetails.address) {
        formErrors.address = 'Adresse des Buchungsmanagers ist erforderlich';
        if (!firstErrorFieldId) firstErrorFieldId = 'bookingManagerAddress';
      }
      if (!bookingManagerDetails.city) {
        formErrors.city = 'Stadt des Buchungsmanagers ist erforderlich';
        if (!firstErrorFieldId) firstErrorFieldId = 'bookingManagerCity';
      }
      if (!bookingManagerDetails.zipCode) {
        formErrors.zipCode = 'Postleitzahl des Buchungsmanagers ist erforderlich';
        if (!firstErrorFieldId) firstErrorFieldId = 'bookingManagerZipCode';
      }
    
      // Validate adultsDetails
      adultsDetails.forEach((adult, index) => {
        if (!adult.name) {
          formErrors[`name_${index}`] = `Name für Erwachsener ${index + 1} ist erforderlich`;
          if (!firstErrorFieldId) firstErrorFieldId = `adultName_${index}`;
        }
        if (!adult.dob) {
          formErrors[`dob_${index}`] = `Pass für Erwachsener ${index + 1} ist erforderlich`;
          if (!firstErrorFieldId) firstErrorFieldId = `adultDob_${index}`;
        }
        if (!adult.nationality) {
          formErrors[`nationality_${index}`] = `Nationalität für Erwachsener ${index + 1} ist erforderlich`;
          if (!firstErrorFieldId) firstErrorFieldId = `adultNationality_${index}`;
        }
        if (!adult.visa) {
          formErrors[`visa_${index}`] = `Visumtyp für Erwachsener ${index + 1} ist erforderlich`;
          if (!firstErrorFieldId) firstErrorFieldId = `adultVisa_${index}`;
        }
      });
    
      // Validate other fields if needed
      if (!preferredContactMethod) {
        formErrors.preferredContactMethod = 'Bevorzugte Kontaktmethode ist erforderlich';
        if (!firstErrorFieldId) firstErrorFieldId = 'preferredContactMethod';
      }
      if (!selectedMethod) {
        formErrors.selectedMethod = 'Zahlungsmethode ist erforderlich';
        if (!firstErrorFieldId) firstErrorFieldId = 'selectedMethod';
      }
    
      // Set errors for each field
      setErrors(formErrors);
    
      // Set general error message based on missing categories
      const missingCategories = [];
      if (Object.keys(formErrors).some(key => key.includes('name') || key.includes('phone') || key.includes('email') || key.includes('address') || key.includes('city') || key.includes('zipCode'))) {
        missingCategories.push("Details des Buchungsmanagers");
      }
      if (Object.keys(formErrors).some(key => key.includes('name_') || key.includes('passport') || key.includes('nationality') || key.includes('visa'))) {
        missingCategories.push("Details der Erwachsenen");
      }
      if (formErrors.preferredContactMethod) {
        missingCategories.push("Bevorzugte Kontaktmethode");
      }
      if (formErrors.selectedMethod) {
        missingCategories.push("Zahlungsmethode");
      }
    
      const generalMessage = missingCategories.length > 0 
        ? `Bitte füllen Sie die folgenden Abschnitte aus: ${missingCategories.join(', ')}`
        : '';
      setGeneralErrorMessage(generalMessage);
    
      // Return the form validity and the first error field ID
      return { isValid: Object.keys(formErrors).length === 0, firstErrorFieldId };
    };
    
    
    
    

    const handleClick = () => {
      setGeneralErrorMessage(''); // Clear any existing messages
      console.log("there1")
      const { isValid, firstErrorFieldId } = validateForm();
    
      if (isValid) {
        console.log("there2")

        setIsProcessing(true); // Start loading spinner
        handlePayClick();      // Trigger the payment process
        setTimeout(() => setIsProcessing(false), 3000); // Simulate processing time or replace with real processing status
      } else {
        setGeneralErrorMessage('Bitte überprüfen Sie die hervorgehobenen Felder und füllen Sie alle erforderlichen Informationen aus.');
        if (firstErrorFieldId) {
          document.getElementById(firstErrorFieldId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          document.getElementById(firstErrorFieldId)?.focus();
        }
      }
    };
    

  useEffect(() => {

    return function cleanup() {
        
        dispatch(createTravelCardPaymentLinkApiReset());
        // dispatch(createHotelPaymentLinkApiReset());
    };
}, []);
  const dispatch = useDispatch();

 
  useEffect(() => {
    const fetchFormOptions = async () => {
      try {
        await dispatch(getFormOptionsApi());
      } catch (error) {
        setErrors('Error fetching form options:', error);
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
// Combine both lists and sort them alphabetically
const allVisaCountries = [
  ...(
    allFormOptions?.[0]?.umrahVisaNationality 
      ? allFormOptions[0].umrahVisaNationality.split('\n') 
      : []
  ),
  ...(
    allFormOptions?.[0]?.tourismVisaNationality 
      ? allFormOptions[0].tourismVisaNationality.split('\n') 
      : []
  )
].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));



  const handleAdultChange = (index, field, value) => {
    const updatedAdults = adultsDetails.map((adult, i) => 
      i === index ? { ...adult, [field]: value } : adult
    );

    if (field === 'nationality') {
      const updatedVisaOptions = tourismVisaCountries.includes(value)
        ?[
          { label: 'Ich habe mein Visum', price: 0 },
          { label: 'Umrah-Visum', price: 200 },
          { label: 'Reisevisum', price: 150 },
        ]
        : umrahVisaCountries.includes(value)
        ? [
          { label: 'Ich habe mein Visum', price: 0 },
          { label: 'Umrah-Visum', price: 200 },
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
      {Translation_german.BOOKING_TITLE}
    </Typography>
  {generalErrorMessage && (
  <Box
    sx={{
      mb: 2,
      padding: 2,
      color: 'red', // Display color for error
      backgroundColor: '#fdecea', // Light red background for visibility
      borderRadius: '8px',
      textAlign: 'center',
    }}
  >
    {generalErrorMessage}
  </Box>
)}

    <BookingManagerDetails
      bookingManagerDetails={bookingManagerDetails}
      setBookingManagerDetails={setBookingManagerDetails}
      visaCountries={[...umrahVisaCountries, ...tourismVisaCountries]}
    />
    <Divider sx={{ my: 3, backgroundColor: '#FF8C42' }} /> {/* Orange divider */}
  
    <AdultsDetailsForm
      adultsDetails={adultsDetails}
      handleAdultChange={handleAdultChange}
      visaCountries={allVisaCountries}
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
    {paymentType==="full"?"Gesamtpreis":"Anzahlung"}
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
    Paket: {packageData?.title || packageData?.name}
  </Typography>
</Box>

  
    <Divider sx={{ my: 3, backgroundColor: '#FF8C42' }} />
  
    <PaymentOptions selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod}
     paymentType={paymentType} setPaymentType={setPaymentType}/>
     {/* Pay Button */}
    { selectedMethod&&
    <Button
      variant="contained"
      type="submit"
      color="primary"
      onClick={handleClick}
      disabled={isProcessing}
      sx={{
        mt: 3,
        backgroundColor: '#004e8c',
        color: '#fff',
        padding: isMobile ? '8px 16px' : '12px 24px',
        fontSize: isMobile ? '0.875rem' : '1rem',
        width: isMobile ? '100%' : '100%',
        alignSelf:!isMobile&&'center',
        '&:hover': {
          backgroundColor: '#00376b',
        },
        '&:active': {
          backgroundColor: '#002a56',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isProcessing ? (
        <CircularProgress size={24} sx={{ color: '#fff' }} />
      ) : (
        `Bezahlen mit ${selectedMethod==="Stripe"?"Debit-/Kreditkarte":selectedMethod}`
      )}
    </Button>}
  </Paper>
  
  );
};

export default BookingForm;
