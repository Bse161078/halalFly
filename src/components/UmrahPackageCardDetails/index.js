import React, { useState, useEffect } from 'react';
import { Box, Typography,Button, Grid, Paper, Divider, useTheme, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import SliderComponent from './SliderComponent';
import DateRangePickerComponent from './DateRangeComponent';
import RoomAndOccupantsSelection from './RoomAndOccupantsSelection';
import AdditionalOptions from './AdditionalOption';
import PriceDetails from './PriceDetails';
import DetailsSection from './DetailsSection/DetailsSection';
import FloatingButtonWithPrice from './FloatingButtonWithPrice';
import Coupons from './Coupons';
import { validateCouponApi } from 'src/services';
import { validateCouponApiReset } from 'src/reducers';
import { useDispatch, useSelector } from 'react-redux';

const UmrahPackageCardDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageData, filterAdults, filterInfants, filterHotel, filterRoom,selectedDateRange } = location.state || {};
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedHotel, setSelectedHotel] = useState(filterHotel || null);
  const [selectedRoom, setSelectedRoom] = useState(filterRoom || null);
  const [adults, setAdults] = useState(filterAdults || 1);
  const [infants, setInfants] = useState(filterInfants || 0);
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [selectedTransfer, setSelectedTransfer] = useState(0);
  const [selectedFlights,setSelectedFlights] = useState(0);
  const [selectedMealPlan, setSelectedMealPlan] = useState('');
  const [availableMealPlans, setAvailableMealPlans] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [activityInsurance, setActivityInsurance] = useState(null); // null, 'yes', 'no'
  const [transferInsurance, setTransferInsurance] = useState(null);
  const [flightInsurance, setFlightInsurance] = useState(null);
  const [travelInsurance, setTravelInsurance] = useState('no');
  const [selectedInsurances, setSelectedInsurances] = useState([]);  // Array to hold selected insurance types
  const [discount,setDiscount] = useState(0)
  const [couponCode, setCouponCode] = useState('');

  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
  const dispatch = useDispatch();

  const couponsApi = async (couponCode) => {
    try {
      // Dispatch the API call with the coupon code in the required format
      const response = await dispatch(validateCouponApi({ coupon: couponCode }));
      console.log("responsbbe",response.payload)
      // Check if the response contains a valid coupon and discount
      if (response.payload?.CouponName) {
        setDiscount(response?.payload?.DiscountPrice) ;
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
      dispatch(validateCouponApiReset());  // Always reset the validation state after the API call completes
    }
  };
  


 
  const handleActivityInsuranceChange = (event) => {
    const value = event.target.value;
    setActivityInsurance(value);
    if (value === 'no') {
      setActivityInsurance('no');
    }
  };
  
  const handleTransferInsuranceChange = (event) => {
    const value = event.target.value;
    setTransferInsurance(value);
    if (value === 'no') {
      setTransferInsurance('no');
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

  const handleInsuranceTypeChange = (index, value) => {
    const selectedOption = insuranceOptions.find(option => option.type === value);
    const updatedInsurances = selectedInsurances.map((insurance, idx) => 
      idx === index ? { type: value, price: selectedOption ? selectedOption.price : 0 } : insurance

  );
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
  const {
    title,
    description,
    image,
    hotelTypes,
    transferDetails,
    activityDetails,
    price,
    cities,
    tripTypes,
    packages,
    flightDetails
  } = packageData;

  useEffect(() => {
    if (packageData?.packageDateRange[0]) {
      setDateRange({
        start: dayjs(selectedDateRange?.length>0?selectedDateRange?.dateFrom:packageData?.packageDateRange[0].dateFrom),
        end: dayjs(selectedDateRange?.dateTo?selectedDateRange?.dateTo:packageData?.packageDateRange[0].dateTo),
      });
    }
    setAdults(filterAdults ? filterAdults : 1);
  }, [packageData]);

  if (!packageData) {
    return <Typography>Loading...</Typography>;
  }  


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
    setErrorMessage('Please select a room type before adding adults or infants.');
    return;
  }

  if (type === 'adults') {
    if (selectedRoom.RoomTypes !== 'Custom' && adults >= selectedRoom.totalAdults) {
      setErrorMessage(`You can't add more than ${selectedRoom.totalAdults} adults.`); 
      return;
    }
    setAdults(adults + 1);
  }

  if (type === 'infants') {
    if (selectedRoom.RoomTypes !== 'Custom' && infants >= selectedRoom.totalInfants) {
      setErrorMessage(`You can't add more than ${selectedRoom.totalInfants} infants.`);
      return;
    }
    setInfants(infants + 1);
  }

  setErrorMessage(''); // Clear the error message if the increment is successful
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
const handleMealPlanChange = (event) => {
  const selected = availableMealPlans.find((meal) => meal._id === event.target.value);
  setSelectedMealPlan(selected);
};

  const findPriceInEuro = (priceArray) => {
    return priceArray?.find((p) => p.currency === 'eur')?.value || 0;
  };
  const handleActivityChange = (event) => {
    const activityId = event.target.value;
    const activity = activityDetails.find(act => act.id === activityId);
    setSelectedActivity(activity || null);
  };

  const handleFlightChanges = (event) => {
    const selected = flightDetails.find((flight) => flight.id === event.target.value);
    setSelectedFlights(selected);
  };
  const handleTransferChange = (event) => {
    const selected = transferDetails.find((transfer) => transfer.id === event.target.value);
    setSelectedTransfer(selected);
  };
  const basePriceEuro = findPriceInEuro(price);
  const totalPrice = () => {
    let totalRoomPrice = 0;      // To store the total room price for all hotels
    let totalDays = 0;           // To track total days (in case it's needed separately)
    let infantsTotalPrice = 0;   // To store total price for infants across hotels
    const activityPrice = selectedActivity?.price || 0;  // Activity price
    const transferPrice = selectedTransfer?.Price || 0;  // Transfer price
    const mealPrice = selectedMealPlan?.Meal_Price || 0;
    const flightPrice = selectedFlights?.Price || 0;
    let insurancePrice = 0
    if(selectedInsurances)
    {
      selectedInsurances?.map((insurance)=>{
        insurancePrice = insurance?.InsurancePrice
      })

    }
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
                infantsTotalPrice += (hotel?.InfantPrice || 0) * infants ; // Infant price
            }
        });
    }

    // Ensure basePriceEuro is a valid number and calculate the final total
    const total = 
        Number(basePriceEuro || 0) +       // Base price in euros
        Number(totalRoomPrice || 0) +      // Total room price (summed across all hotels)
        Number(infantsTotalPrice || 0) +   // Total infants' price (summed across all hotels)
        Number(activityPrice || 0) +       // Activity price
        Number(transferPrice || 0) +       // Transfer price
        Number(mealPrice || 0)+
        Number(flightPrice||0)+
        Number(insurancePrice||0)-
        discount *adults
    console.log("PRICE",mealPrice,basePriceEuro,totalRoomPrice,infantsTotalPrice,activityPrice,transferPrice,flightPrice)
    // Return the total price, ensuring it's valid and not NaN
    return isNaN(total) ? 0 : total;
};

  
  // Usage of totalPrice function
  const finalPrice = totalPrice();
  const displayFinalPrice = typeof finalPrice === 'number' && !isNaN(finalPrice) ? finalPrice.toFixed(2) : '0.00';


  return (
    <Paper
     sx={{
        padding: '20px',
        maxWidth: '1200px',
        margin: '20px auto',
        borderRadius: '10px',
        backgroundColor: 'white', // Light background color
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Adding light shadow
      }}
    >

      {/* Top Section with Image Carousel and Calendar */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <SliderComponent images={packageData.image} />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateRangePickerComponent dateRange={dateRange} />
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', mt: 4 }}>

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
  {title}
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



        

        {/* Room Selection */}
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

<DetailsSection 
        packages={packages} hotelTypes={hotelTypes} 
        tripTypes={tripTypes}
        flightDetails={flightDetails}/>
<Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Additional Options */}
        <AdditionalOptions 
        selectedFlights={selectedFlights} flightDetails={flightDetails}  
        handleFlightChanges={handleFlightChanges} selectedActivity={selectedActivity} 
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
      handleTravelInsuranceChange={handleTravelInsuranceChange}
        />

        <Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Total Price */}
        <PriceDetails finalPrice={finalPrice} />
        <Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Proceed to Book Button */}
        <FloatingButtonWithPrice 
        finalPrice={finalPrice}
        packageData={packageData}
        adults={adults}
        infants={infants}
        selectedActivity={selectedActivity}
        selectedTransfer={selectedTransfer}
      />
      <Coupons setCouponCode={setCouponCode}
       setDiscount={setDiscount} 
       discount={discount} couponCode={couponCode}
       couponsApi={couponsApi}  // Pass the wrapped API function
       />
      <Button
  variant="contained"
  fullWidth
  sx={{
    background: 'linear-gradient(90deg, #004e8c 0%, #005b99 50%, #0070ba 100%)',
    color: '#FAF3E0',
    borderRadius: isMobile ? '30px' : '50px', // Slightly less rounded on mobile for compactness
    textTransform: 'none',
    fontWeight: 'bold',
    py: isMobile ? 1.5 : 2, // Reduced padding for mobile to fit smaller screens
    fontSize: isMobile ? '1rem' : '1.2rem', // Adjusted font size for better readability on small screens
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(90deg, #00336a 0%, #004c88 50%, #00508c 100%)',
      transform: 'scale(1.05)', // Adds an interactive hover effect
      boxShadow: '0px 8px 18px rgba(0, 0, 0, 0.2)',
    },
    ...(isMobile && {
      py: 1.5, // Slightly smaller padding for mobile devices
      fontSize: '1rem', // Adjusted font size for mobile readability
      minWidth: '90%', // Ensures button width fits nicely on mobile
    }),
  }}
  onClick={() =>
    navigate('/booking-details', {
      state: {
        packageData,
        finalPrice,
        adults,
        infants,
        selectedActivity,
        selectedTransfer,
      },
    })
  }
>
  Proceed to Book
</Button>



      </Box>
    </Paper>
  );
};

export default UmrahPackageCardDetails;
