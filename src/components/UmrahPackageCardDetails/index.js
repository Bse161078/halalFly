import React, { useState, useEffect } from 'react';
import { Box, Typography,Button, Grid, Paper, Divider, useTheme, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import SliderComponent from './SliderComponent';
import DateRangePickerComponent from './DateRangeComponent';
import RoomAndOccupantsSelection from './RoomAndOccupantsSelection';
import AdditionalOptions from './AdditionalOption';
import PriceDetails from './PriceDetails';
import DetailsSection from './DetailsSection';

const UmrahPackageCardDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageData, filterAdults, filterInfants, filterHotel, filterRoom,selectedDateRange } = location.state || {};
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedHotel, setSelectedHotel] = useState(filterHotel || null);
  const [selectedRoom, setSelectedRoom] = useState(filterRoom || null);
  const [adults, setAdults] = useState(filterAdults || 1);
  const [infants, setInfants] = useState(filterInfants || 0);
  const [selectedActivity, setSelectedActivity] = useState(packageData?.activityDetails?.[0] || null);
  const [selectedTransfer, setSelectedTransfer] = useState(packageData?.transferDetails?.[0] || null);
  const [selectedFlights,setSelectedFlights] = useState(packageData?.flightDetails?.[0] || null);
  const [selectedMealPlan, setSelectedMealPlan] = useState('');
  const [availableMealPlans, setAvailableMealPlans] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
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
    if (packageData?.packageDateRange?.[0]) {
      setDateRange({
        start: dayjs(selectedDateRange?.dateFrom?selectedDateRange?.dateFrom:packageData?.packageDateRange?.[0].dateFrom),
        end: dayjs(selectedDateRange?.dateTo?selectedDateRange?.dateTo:packageData?.packageDateRange?.[0].dateTo),
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
    return priceArray?.find((p) => p.currency === 'Euro')?.value || 0;
  };
  const handleActivityChange = (event) => {
    const selected = activityDetails.find((activity) => activity.id === event.target.value);
    setSelectedActivity(selected);
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
  console.log("transferoptions",transferDetails)
  const totalPrice = () => {
    let totalRoomPrice = 0;      // To store the total room price for all hotels
    let totalDays = 0;           // To track total days (in case it's needed separately)
    let infantsTotalPrice = 0;   // To store total price for infants across hotels
    const activityPrice = selectedActivity?.price || 0;  // Activity price
    const transferPrice = selectedTransfer?.Price || 0;  // Transfer price
    const mealPrice = selectedMealPlan?.Meal_Price || 0;
    const flightPrice = selectedFlights.Price || 0;
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
        Number(flightPrice||0);
    console.log("PRICE",selectedMealPlan,mealPrice,basePriceEuro,totalRoomPrice,infantsTotalPrice,activityPrice,transferPrice)
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
        <Typography variant="h2" sx={{ color: '#004e8c', fontWeight: 'bold' }} gutterBottom>
  {title}
</Typography>

<Typography variant="body1" sx={{ mb: 2, color: '#FF8C42' }}>
  {description}
</Typography>

<Divider sx={{ my: 2, borderColor: '#004e8c' }} />



        <DetailsSection cities={cities} hotelTypes={hotelTypes} tripTypes={tripTypes} packages={packages}/>
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

<Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Additional Options */}
        <AdditionalOptions selectedFlights={selectedFlights} flightDetails={flightDetails}  handleFlightChanges={handleFlightChanges} selectedActivity={selectedActivity} selectedTransfer={selectedTransfer} activityDetails={activityDetails} transferDetails={transferDetails} handleTransferChange={handleTransferChange} handleActivityChange={handleActivityChange}/>

        <Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Total Price */}
        <PriceDetails finalPrice={finalPrice} />
        <Divider sx={{ my: 2, borderColor: '#004e8c' }} />

        {/* Proceed to Book Button */}
        <Button
      variant="contained"
      fullWidth
      sx={{
        background: 'linear-gradient(90deg, #004e8c 0%, #0070ba 100%)', // Gradient effect for more visual appeal
        color: '#FAF3E0',
        borderRadius: '50px', // Increased border-radius for a more rounded button
        textTransform: 'none',
        fontWeight: 'bold',
        py: isMobile ? 2.5 : 2, // Adjusted padding for better spacing on mobile and desktop
        fontSize: isMobile ? '1.4rem' : '1.2rem', // Slightly larger text for better readability
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)', // Adding shadow for depth
        transition: 'all 0.3s ease', // Smooth transition effect
        '&:hover': {
          background: 'linear-gradient(90deg, #00336a 0%, #00508c 100%)', // Slightly darker gradient on hover
          transform: 'scale(1.05)', // Button grows slightly on hover for interaction feedback
        },
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
