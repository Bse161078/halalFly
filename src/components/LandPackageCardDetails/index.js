import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, Divider, IconButton, useTheme, useMediaQuery, MenuItem, Select, FormControl } from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { LocalizationProvider, StaticDatePicker, PickersDay } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Slider from 'react-slick';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CategoryIcon from '@mui/icons-material/Category';
import { CheckCircleOutline } from '@mui/icons-material';
import CardTravelIcon from '@mui/icons-material/CardTravel'; 
import ImageCarousel from './ImageCarousel';
import DatePicker from './DatePicker';
import RoomAndOccupantsSelection from './RoomAndOccupantsSelection';
import DetailsSection from './DetailsSection';
import AdditionalOptions from './AdditionalOption';

const LandPackageCardDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageData, filterAdults, filterInfants, filterHotel, filterRoom,selectedDateRange } = location.state || {};
  const [selectedMealPlan, setSelectedMealPlan] = useState('');
  const [availableMealPlans, setAvailableMealPlans] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedRoom, setSelectedRoom] = useState(filterRoom || null);
  const [adults, setAdults] = useState(filterAdults || 1);
  const [infants, setInfants] = useState(filterInfants || 0);
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [selectedTransfer, setSelectedTransfer] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [activityInsurance, setActivityInsurance] = useState(null); // null, 'yes', 'no'
  const [transferInsurance, setTransferInsurance] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    setAdults(filterAdults ? filterAdults : 1);
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
    cities,
    tripTypes,
    packages,
    Exclusion,
    Inclusions,
  } = packageData;
  const findPriceInEuro = (priceArray) => {
    return priceArray?.find((p) => p.currency === 'eur')?.value || 0;
  };

  const basePriceEuro = findPriceInEuro(PackagePrice);

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
    const activityPrice = selectedActivity?.price || 0;  // Activity price
    const transferPrice = selectedTransfer?.Price || 0;  // Transfer price
    const mealPrice = selectedMealPlan?.Meal_Price || 0;
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
        Number(mealPrice || 0);
    // Return the total price, ensuring it's valid and not NaN
    console.log("PRICE",mealPrice,basePriceEuro,totalRoomPrice,infantsTotalPrice,activityPrice,transferPrice)

    return isNaN(total) ? 0 : total;
};

  
  // Usage of totalPrice function
  const finalPrice = totalPrice();
  const displayFinalPrice = typeof finalPrice === 'number' && !isNaN(finalPrice) ? finalPrice.toFixed(2) : '0.00';

  
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
        <Divider sx={{ my: 2 }} />

        {/* Title and Description */}
        <Typography variant="h2" color="#004e8c" fontWeight="bold" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
        <DetailsSection cities={cities} hotelTypes={hotelTypes} tripTypes={tripTypes} packages={packages} Exclusion={Exclusion} Inclusions={Inclusions} />

        </Grid>
      </Box>

        <Divider sx={{ my: 2 }} />

        {/* Activity and Transfer Selection */}
        
         {/* Additional Options */}
         <AdditionalOptions
        selectedActivity={selectedActivity} 
        selectedTransfer={selectedTransfer} activityDetails={activityDetails} 
        transferDetails={transferDetails} handleTransferChange={handleTransferChange} 
        handleActivityChange={handleActivityChange} activityInsurance={activityInsurance} 
        handleActivityInsuranceChange={handleActivityInsuranceChange} transferInsurance={transferInsurance}
        handleTransferInsuranceChange={handleTransferInsuranceChange} 
        />


        <Divider sx={{ my: 2 }} />
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
        <Divider sx={{ my: 2 }} />

        {/* Total Price */}
        <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ fontWeight: 'bold', color: '#004e8c', textAlign: 'center' }}
          >
            Total Price: <span style={{ color: '#ff8c42', fontSize: '2rem' }}>€{displayFinalPrice}</span>
          </Typography>

          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ mt: 2, fontStyle: 'italic', textAlign: "center", color: '#666', fontSize: '0.9rem' }}
          >
            *Price may vary based on availability.
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

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

export default LandPackageCardDetails;
