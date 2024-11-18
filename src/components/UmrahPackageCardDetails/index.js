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
  const [adults, setAdults] = useState(filterAdults || 0);
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
 const [selectedRoomsId,setSelectedRoomsId] = useState([]);
  const [couponId,setCoupodId] = useState('')
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
  const dispatch = useDispatch();
  const previousLocation = location.pathname;
  const couponsApi = async (couponCode) => {
    try {
      // Dispatch the API call with the coupon code in the required format
      const response = await dispatch(validateCouponApi({ coupon: couponCode }));
      // Check if the response contains a valid coupon and discount
      setCoupodId(response?.payload?._id)
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
    flightDetails,
    NeedInsurance,
    NeedTransfer,
    NeedActivity
  } = packageData;

  // Iterate through all hotelTypes to find matching room types
  

  useEffect(() => {
    if (packageData?.packageDateRange[0]) {
      setDateRange({
        start: dayjs(selectedDateRange?.length>0?selectedDateRange?.dateFrom:packageData?.packageDateRange[0].dateFrom),
        end: dayjs(selectedDateRange?.dateTo?selectedDateRange?.dateTo:packageData?.packageDateRange[0].dateTo),
      });
    }
    setAdults(filterAdults ? filterAdults : 0);

  }, [packageData]);

  if (!packageData) {
    return <Typography>Loading...</Typography>;
  }  
  const handleRoomChange = (room) => {
    const selectedRooms = [];
  
    hotelTypes.forEach((hotel) => {
      const matchingRoom = hotel.hotelRoomPrice.find(
        (hotelRoom) => hotelRoom.RoomTypes === room?.RoomTypes
      );
  
      if (matchingRoom) {
        selectedRooms.push(matchingRoom.id);
      }
    });
  
    // Update states
    setSelectedRoomsId(selectedRooms);
    setSelectedRoom(room);
  
    setErrorMessage(''); // Reset the error message
  
    // Combine meal plans
    const combinedMealPlans = packageData?.hotelTypes.reduce((acc, hotel) => {
      return [...acc, ...(hotel?.mealPlans || [])];
    }, []);
    setAvailableMealPlans(combinedMealPlans);
  
    // Adjust adults and infants based on room type
    if (room.RoomTypes === 'Quad') {
      setAdults(1);
      setInfants(0);
    } else {
      setAdults(room.totalAdults || 1);
      setInfants(room.totalInfants || 0);
    }
  };
  
  // Log the updated states after they change
 
  
  
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
    const activityPrice = selectedActivity?.price*adults || 0;  // Activity price
    const transferPrice = selectedTransfer?.Price*adults || 0;  // Transfer price
    const mealPrice = selectedMealPlan?.Meal_Price*adults || 0;
    const flightPrice = selectedFlights?.Price*adults || 0;
    let insurancePrice = 0
    if(selectedInsurances)
    {
      selectedInsurances?.map((insurance)=>{
        insurancePrice += insurance?.InsurancePrice
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
            }
        });
    }
    const totalDiscount = (discount || 0) * adults;
    infantsTotalPrice = (packageData?.InfantPrice || 0) * infants ; // Infant price

    // Ensure basePriceEuro is a valid number and calculate the final total
    const total = 
        Number(basePriceEuro || 0) +       // Base price in euros
        Number(totalRoomPrice || 0) +      // Total room price (summed across all hotels)
        Number(infantsTotalPrice || 0) +   // Total infants' price (summed across all hotels)
        Number(activityPrice || 0) +       // Activity price
        Number(transferPrice || 0) +       // Transfer price
        Number(mealPrice || 0)+
        Number(insurancePrice||0)-
        Number(totalDiscount ||0)

    console.log("mealPrice",mealPrice,"basePriceEuro",basePriceEuro,
      "totalRoomPrice",totalRoomPrice,"infantsTotalPrice",infantsTotalPrice,
      "activityPrice",activityPrice,"transferPrice",transferPrice,"insurancePrice",insurancePrice,"couponCode",couponCode)
    // Return the total price, ensuring it's valid and not NaN
    return isNaN(total) ? 0 : total;
};

  
  // Usage of totalPrice function
  const finalPrice = totalPrice();
  const selectedInsuranceIds = selectedInsurances?.map((insurance) => insurance.id);
  const selectedMealPlanId = selectedMealPlan?.id;
  const selectedActivityId = selectedActivity?.id;
  const selectedTransferId = selectedTransfer?.id
  return (
    <Paper
     sx={{
        padding: '20px',
        maxWidth: '1700px',
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
    Weiter zur Buchung - Gesamt: €{totalPrice}
  </Button>}
</Box>


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
      NeedInsurance = {NeedInsurance}
      NeedTransfer={NeedTransfer}
      NeedActivity={NeedActivity}
      travelInsurance={travelInsurance}
      handleTravelInsuranceChange={handleTravelInsuranceChange}
        />

        <Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Total Price */}
        <PriceDetails finalPrice={finalPrice} />
        <Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Proceed to Book Button */}
        {adults>0&&<FloatingButtonWithPrice 
        finalPrice={finalPrice}
        packageData={packageData}
        adults={adults}
        infants={infants}
        selectedRoomsId={selectedRoomsId}
        selectedRoom={selectedRoom}
        couponCode={couponCode}
        selectedInsuranceIds={selectedInsuranceIds}
        selectedMealPlanId={selectedMealPlan}
        selectedTransferId={selectedTransferId}
        selectedActivityId={selectedActivityId}
        previousLocation={previousLocation}
      />}
      <Coupons setCouponCode={setCouponCode}
       setDiscount={setDiscount} 
       discount={discount} couponCode={couponCode}
       couponsApi={couponsApi}  // Pass the wrapped API function
       />
  





      </Box>
    </Paper>
  );
};

export default UmrahPackageCardDetails;
