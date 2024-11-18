import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, Divider, IconButton, useTheme, useMediaQuery, MenuItem, Select, FormControl } from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { LocalizationProvider, StaticDatePicker, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Slider from 'react-slick';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateLandpackageCouponApi} from 'src/services';
import { validateLandpackageCouponApiReset } from 'src/reducers';
import { useDispatch } from 'react-redux';
import { useReducer } from 'react';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CategoryIcon from '@mui/icons-material/Category';
import { CheckCircleOutline } from '@mui/icons-material';
import CardTravelIcon from '@mui/icons-material/CardTravel'; 
import ImageCarousel from './ImageCarousel';
import DatePicker from './DatePicker';
import RoomAndOccupantsSelection from './RoomAndOccupantsSelection';
import DetailsSection from './DetailsSections/DetailsSection';
import AdditionalOptions from './AdditionalOption';
import Coupons from '../UmrahPackageCardDetails/Coupons';
import FloatingButtonWithPrice from '../UmrahPackageCardDetails/FloatingButtonWithPrice';
import Translation_german from '../Translation/translation_german';

const LandPackageCardDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageData, filterAdults, filterInfants, filterHotel, filterRoom,selectedDateRange } = location.state || {};
  const [selectedMealPlan, setSelectedMealPlan] = useState('');
  const [availableMealPlans, setAvailableMealPlans] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedRoom, setSelectedRoom] = useState(filterRoom || null);
  const [adults, setAdults] = useState(filterAdults || 0);
  const [infants, setInfants] = useState(filterInfants || 0);
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [selectedTransfer, setSelectedTransfer] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [activityInsurance, setActivityInsurance] = useState(null); // null, 'yes', 'no'
  const [transferInsurance, setTransferInsurance] = useState(null);
  const [travelInsurance, setTravelInsurance] = useState('no');
  const [selectedInsurances, setSelectedInsurances] = useState([]);  // Array to hold selected insurance types
  const [discount,setDiscount] = useState(0)
  const [couponCode, setCouponCode] = useState('');
 const [selectedRoomsId,setSelectedRoomsId] = useState([]);
  const [couponId,setCoupodId] = useState('')
  const [flightInsurance, setFlightInsurance] = useState(null);
  const [selectedFlights,setSelectedFlights] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  const couponsApi = async (couponCode) => {
    try {
      // Dispatch the API call with the coupon code in the required format
      const response = await dispatch(validateLandpackageCouponApi({ coupon: couponCode }));
      // Check if the response contains a valid coupon and discount
      setCoupodId(response?.payload?._id)
      if (response.payload?.CouponName) {
        setDiscount(response?.payload?.DsicountPrice) ;
        return { isValid: true };

      }
      else
      {

        setDiscount(0)
        return { isValid: false };


      }
    } catch (error) {
      setDiscount(0)
    } finally {
      dispatch(validateLandpackageCouponApiReset());  // Always reset the validation state after the API call completes
    }
  };


 
  const handleActivityInsuranceChange = (event) => {
    const value = event.target.value;
    setActivityInsurance(value);
    if (value === 'no') {
      setActivityInsurance('no');
      setSelectedActivity([]);
    }
  };
  
  const handleTransferInsuranceChange = (event) => {
    const value = event.target.value;
    setTransferInsurance(value);
    if (value === 'no') {
      setTransferInsurance('no');
      setSelectedTransfer([]);
    }
  };
  
  const handleFlightInsuranceChange = (event) => {
    const value = event.target.value;
    setFlightInsurance(value);
    if (value === 'no') {
      setFlightInsurance('no');
    }
  };

  const handleAddInsurance = (selectedOption) => {
    setSelectedInsurances([...selectedInsurances, selectedOption]);
    totalPrice()
  };

  const handleRemoveInsurance = (index) => {
    const updatedInsurances = selectedInsurances.filter((_, idx) => idx !== index);
    setSelectedInsurances(updatedInsurances);
  };

  
  const handleTravelInsuranceChange = (event) => {
    const value = event.target.value;
    setTravelInsurance(value);
    if (value === 'no') {
      setSelectedInsurances([]);
    }
  };

  const insuranceOptions = packageData?.insurance;
  
  const handleMealPlanChange = (event) => {
    const selected = availableMealPlans.find((meal) => meal._id === event.target.value);
    setSelectedMealPlan(selected);
  };
  useEffect(() => {
    if (packageData?.date_from_to?.[0]) {
      setDateRange({
        start: dayjs(selectedDateRange?.dateFrom?selectedDateRange?.dateFrom:packageData?.date_from_to?.[0].dateFrom),
        end: dayjs(selectedDateRange?.dateTo?selectedDateRange?.dateTo:packageData?.date_from_to?.[0].dateTo),
      });
    }

    setAdults(filterAdults ? filterAdults : 0);
  }, [packageData]);

  if (!packageData) {
    return <Typography>Loading...</Typography>;
  }
  const {
    name,
    description,
    image,
    hotelTypes,
    transferDetails,
    activityDetails,
    PackagePrice,
    flightDetails,
    tripTypes,
    packages,
    NeedActivity,
    NeedTransfer,
    NeedFlights,
    NeedInsurance
  } = packageData;
  const previousLocation = location.pathname;
  const findPriceInEuro = (priceArray) => {
    return priceArray?.find((p) => p.currency === 'eur')?.value || 0;
  };

  const basePriceEuro = findPriceInEuro(PackagePrice);
  const handleFlightChanges = (event) => {
    const selected = flightDetails.find((flight) => flight.id === event.target.value);
    setSelectedFlights(selected);
  };
  const handleRoomChange = (room) => {
    setSelectedRoom(room);
    setErrorMessage(''); // Reset the error message
    const combinedMealPlans = packageData?.hotelTypes.reduce((acc, hotel) => {
      return [...acc, ...hotel?.mealPlans || []];
  }, []);
  
  setAvailableMealPlans(combinedMealPlans);
    if (room.RoomTypes === 'Quad') {
      // If the room type is Quad, set 1 adult and 0 infants
      setAdults(1);
      setInfants(0);
    } else {
      // For other room types, set the number of adults and infants based on the room's total capacity
      setAdults(room.totalAdults || 1);
      setInfants(room.totalInfants || 0);
    }
  };
  

  // Disable increase or decrease of adults or infants if no room is selected
  const handleIncrease = (type) => {
    if (!selectedRoom) {
      setErrorMessage('Bitte wählen Sie einen Zimmertyp aus, bevor Sie Erwachsene oder Kleinkinder hinzufügen.');
      return;
    }
  
    const updateCount = (currentCount, maxCount, setter, typeLabel) => {
      if (selectedRoom.RoomTypes !== 'Custom' && currentCount >= maxCount) {
        setErrorMessage(`Sie können nicht mehr als ${maxCount} ${typeLabel} hinzufügen.`);
        return false;
      }
      setter(currentCount + 1);
      return true;
    };
  
    let success = false;
    if (type === 'adults') {
      success = updateCount(adults, selectedRoom.totalAdults, setAdults, 'Erwachsene');
    } else if (type === 'infants') {
      success = updateCount(infants, selectedRoom.totalInfants, setInfants, 'Kleinkinder');
    }
  
    if (success) setErrorMessage(''); // Clear the error only if increment was successful
  };
  

const handleDecrease = (type) => {
  if (!selectedRoom) {
    setErrorMessage('Please select a room type before adjusting adults or infants.');
    return;
  }

  if (type === 'adults' && adults > 1) {
    setAdults(adults - 1);
    setErrorMessage(''); // Clear error message on decrement
  }

  if (type === 'infants' && infants > 0) {
    setInfants(infants - 1);
    setErrorMessage(''); // Clear error message on decrement
  }
};

  const handleActivityChange = (event) => {
    const selected = activityDetails.find((activity) => activity.id === event.target.value);
    setSelectedActivity(selected);
  };

  const handleTransferChange = (event) => {
    const selected = transferDetails.find((transfer) => transfer.id === event.target.value);
    setSelectedTransfer(selected);
  };

  const totalPrice = () => {
    let totalRoomPrice = 0;      // To store the total room price for all hotels
    let totalDays = 0;           // To track total days (in case it's needed separately)
    let infantsTotalPrice = 0;   // To store total price for infants across hotels
    const activityPrice = selectedActivity?.price*adults || 0;  // Activity price
    const transferPrice = selectedTransfer?.Price*adults || 0;  // Transfer price
    const flightPrice = selectedFlights?.Price*adults || 0;
    const mealPrice = selectedMealPlan?.Meal_Price*adults || 0;
    if (selectedRoom) {
        // Loop through each hotel in the package
        packageData?.hotelTypes?.forEach((hotel) => {
            totalDays += hotel?.totalDays || 0;  // Add the total days for the hotel

            // Find the room price for the selected room type in the current hotel
            const room = hotel?.hotelRoomPrice?.find((room) => room.RoomTypes === selectedRoom.RoomTypes);

            if (room) {
                // Calculate the total room price for this hotel
                const adultRoomPrice = parseFloat(room?.RoomPrice || 0);  // Single adult room price
                totalRoomPrice += adultRoomPrice * adults * hotel?.totalDays; // Multiply by adults and total days

                // Calculate the infants' total price for this hotel
                infantsTotalPrice += (packageData?.InfantPrice || 0) * infants ; // Infant price
            }
        });
    }
    let insurancePrice = 0
    if(selectedInsurances)
    {
      selectedInsurances?.map((insurance)=>{
        insurancePrice += insurance?.InsurancePrice
      })

    }
    // Ensure basePriceEuro is a valid number and calculate the final total
    const total = 
        Number(basePriceEuro || 0) +       // Base price in euros
        Number(totalRoomPrice || 0) +      // Total room price (summed across all hotels)
        Number(infantsTotalPrice || 0) +   // Total infants' price (summed across all hotels)
        Number(activityPrice || 0) +       // Activity price
        Number(transferPrice || 0) +       // Transfer price
        Number(mealPrice || 0)+
        Number(flightPrice || 0)+
        Number(insurancePrice||0)-
        Number(discount*adults)
    // Return the total price, ensuring it's valid and not NaN

    return isNaN(total) ? 0 : total;
};

  
  // Usage of totalPrice function
  const finalPrice = totalPrice();
  const displayFinalPrice = typeof finalPrice === 'number' && !isNaN(finalPrice) ? finalPrice.toFixed(2) : '0.00';
  const selectedInsuranceIds = selectedInsurances?.map((insurance) => insurance.id);
  const selectedMealPlanId = selectedMealPlan?.id;
  const selectedActivityId = selectedActivity?.id;
  const selectedTransferId = selectedTransfer?.id
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const renderDay = (date, selectedDates, pickersDayProps) => {
    const isHighlighted = date.isSameOrAfter(dateRange.start) && date.isSameOrBefore(dateRange.end);
    return (
      <PickersDay
        {...pickersDayProps}
        disabled={!isHighlighted}
        sx={
          isHighlighted
            ? {
              backgroundColor: '#004e8c',
              color: '#FFFFFF',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: '#00336a',
                },
              }
            : {}
        }
      />
    );
  };

  const shouldDisableDate = (date) => {
    return !date.isBetween(dateRange.start, dateRange.end, null, '[]');
  };


  return (
    <Paper
      sx={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '20px auto',
        borderRadius: '10px',
        backgroundColor: '#F9F9F9',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Top Section with Image Carousel and Calendar */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
        <ImageCarousel images={packageData.image} />

        </Grid>

        <Grid item xs={12} md={4}>
        <DatePicker dateRange={dateRange} 
        shouldDisableDate={shouldDisableDate}
        renderDay={renderDay} />
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', mt: 4 }}>
      <Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Title and Description */}
        <Typography
          variant={isMobile?'h5':"h3"} // Change to h3 for a more balanced title size
          sx={{
            color: '#004e8c',
            fontWeight: isMobile?900:'bold',
            textAlign: 'center', // Centering the title for a more balanced look
            textTransform: 'capitalize', // Ensures the title looks neat
            letterSpacing: isMobile?'0.3px':'1px', // Add letter spacing for a refined look
            mt: isMobile?0:4, // Add margin on top for breathing room
            mb: 2, // Add bottom margin to space it out
            lineHeight: 1.3, // Line height for better readability
          }}
          gutterBottom
        >
          {name}
        </Typography>

          <Typography
            variant="subtitle1" // Use subtitle1 for a cleaner look
            sx={{
              mb: 3, // Add margin below for spacing
              color: '#FF8C42', // Keep the theme color for description
              textAlign: 'center', // Center-align to match the title
              fontSize: isMobile?'0.75rem':'1.1rem', // Slightly larger font size
              lineHeight: '1.6', // Improve readability with line height
              maxWidth: '800px', // Limit width for better focus
              mx: 'auto', // Center the description by using auto margins
            }}
          >
            {description}
          </Typography>
          <Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Proceed to Book Button */}

          <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    mt: 3, // Margin on top to separate it from other elements
    mb: 3, // Margin on bottom for additional spacing
  }}
>
  {adults>0&&<Button
    variant="contained"
    disableElevation
    sx={{
      backgroundColor: '#FF8C42', // Bold contrasting background for visibility
      color: '#FFFFFF', // White text color for contrast
      borderRadius: '30px', // More rounded for badge-like look
      padding: '10px 20px', // Padding for a compact badge feel
      fontSize: '1.1rem', // Slightly larger font for readability
      fontWeight: 'bold',
      minWidth: '200px', // Fixed minimum width for consistent badge appearance
      textAlign: 'center',
      textTransform: 'none',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', // Subtle shadow for badge effect
      position: 'relative', // For additional styling if needed
      '&:hover': {
        backgroundColor: '#E6793B', // Darken on hover for effect
        transform: 'scale(1.02)', // Slight scale for interactivity
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '-6px',
        right: '-6px',
        width: '14px',
        height: '14px',
        backgroundColor: '#0070ba',
        borderRadius: '50%', // Dot style to indicate action or focus
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
      },
    }}
    onClick={() =>
      navigate('/booking-details', {
        state: {
          packageData,
          finalPrice,
          adults,
          selectedRoomsId,
          infants,
          couponId,
          selectedInsuranceIds,
          selectedActivity,
          selectedTransfer,
          selectedMealPlanId,
          selectedTransferId,
          selectedActivityId,
          couponCode,
          previousLocation,
          selectedRoom,
        },
      })
    }
  >
    Weiter zur Buchung - Gesamt: €{finalPrice}
  </Button>}
</Box>

      <Divider sx={{ my: 2, borderColor: '#004e8c' }} />
      <RoomAndOccupantsSelection
        selectedHotel={packageData.hotelTypes[0]} // First hotel
        selectedRoom={selectedRoom}
        adults={adults}
        infants={infants}
        handleRoomChange={handleRoomChange}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
        errorMessage={errorMessage}
        mealPlans={availableMealPlans}
        selectedMealPlan={selectedMealPlan}
        handleMealPlanChange={handleMealPlanChange}
      />
      <Divider sx={{ my: 2, borderColor: '#004e8c' }} />
          <Box sx={{ mt: 4 }}>
        <DetailsSection 
        packages={packages} hotelTypes={hotelTypes} 
        tripTypes={tripTypes}/>
      </Box>

<Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Activity and Transfer Selection */}
        
         {/* Additional Options */}
         <AdditionalOptions
        selectedActivity={selectedActivity} 
        selectedTransfer={selectedTransfer} activityDetails={activityDetails} 
        transferDetails={transferDetails} handleTransferChange={handleTransferChange} 
        handleActivityChange={handleActivityChange} activityInsurance={activityInsurance} 
        handleActivityInsuranceChange={handleActivityInsuranceChange} transferInsurance={transferInsurance}
        handleTransferInsuranceChange={handleTransferInsuranceChange} flightInsurance={flightInsurance}
        handleFlightInsuranceChange={handleFlightInsuranceChange}
        insuranceOptions={insuranceOptions}
      selectedInsurances={selectedInsurances}
      handleAddInsurance={handleAddInsurance}
      handleRemoveInsurance={handleRemoveInsurance}
      travelInsurance={travelInsurance}
      NeedInsurance={NeedInsurance}
      NeedFlights={NeedFlights}
      NeedActivity={NeedActivity}
      NeedTransfer={NeedTransfer}
      flightDetails={flightDetails}
      selectedFlights={selectedFlights}
      handleFlightChanges={handleFlightChanges}
      handleTravelInsuranceChange={handleTravelInsuranceChange}
        />

{/* Proceed to Book Button */}
     {adults>0&& <FloatingButtonWithPrice 
        finalPrice={finalPrice}
        packageData={packageData}
        adults={adults}
        infants={infants}
        selectedRoomsId={selectedRoomsId}
        couponCode={couponCode}
        selectedInsuranceIds={selectedInsuranceIds}
        selectedMealPlanId={selectedMealPlan}
        selectedTransferId={selectedTransferId}
        selectedActivityId={selectedActivityId}
        previousLocation={previousLocation}
      />}
        
<Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Total Price */}
        <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ fontWeight: 'bold', color: '#004e8c', textAlign: 'center' }}
          >
                    {Translation_german.TOTAL_PRICE}
                    <span style={{ color: '#ff8c42', fontSize: '2rem' }}>€{finalPrice}</span>
          </Typography>

          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ mt: 2, fontStyle: 'italic', textAlign: "center", color: '#666', fontSize: '0.9rem' }}
          >
        {Translation_german.PRICE_NOTE}
        </Typography>
        </Box>

        <Divider sx={{ my: 2, borderColor: '#004e8c' }} />
        <Coupons setCouponCode={setCouponCode}
       setDiscount={setDiscount} 
       discount={discount} couponCode={couponCode}
       couponsApi={couponsApi}  // Pass the wrapped API function
       />
      

      </Box>
    </Paper>
  );
};

export default LandPackageCardDetails;
