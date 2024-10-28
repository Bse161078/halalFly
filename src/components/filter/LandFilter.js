import React, { useState, useEffect } from "react";
import { Box,useMediaQuery,useTheme,Grid, MenuItem, TextField, Tooltip, IconButton, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CustomDropdown } from "../common/CustomDrowDown";
import { CustomLabel } from "../common/CustomLabel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from 'react-router-dom';

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: '#004e8c',
  color: '#FFFFFF',
  },
  "&:hover": {
    backgroundColor: '#003b6e'
  },
}));

const inputStyle = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #004e8c',
  borderRadius: '5px'
  // Add your custom input styling here
};

function LandPackageFilter({ travelData }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [selection, setSelection] = useState({
    tripType: "",
    city: "",
    package: "",
    room: "",
    date: null,
    adults: 1,
    infants: 0,
  });
  const [tripTypes, setTripTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [packages, setPackages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [maxAdults, setMaxAdults] = useState(0);
  const [maxInfants, setMaxInfants] = useState(0);
  const [adultsError, setAdultsError] = useState(false);
  const [infantsError, setInfantsError] = useState(false);

  useEffect(() => {
    if (Array.isArray(travelData) && travelData.length > 0) {
      const allTripTypes = new Set();
      travelData.forEach((item) => {
        item.tripTypes?.forEach((type) => allTripTypes.add(type.TripTypes));
      });
      setTripTypes(Array.from(allTripTypes));
    }
  }, [travelData]);

  const handleSelection = (name, value) => {
    const newSelection = { ...selection, [name]: value };

    if (name === "tripType") {
      newSelection.city = "";
      newSelection.package = "";
      newSelection.room = "";
      newSelection.date = null;
      filterCities(value);
    }

    if (name === "city") {
      newSelection.package = "";
      newSelection.room = "";
      newSelection.date = null;
      filterPackages(newSelection.tripType, value);
    }

    if (name === "package") {
      newSelection.room = "";
      newSelection.date = null;
      filterRooms(newSelection.tripType, newSelection.city, value);
    }

    if (name === "room") {
      newSelection.date = null;

      // Find the selected room details
      const roomDetails = travelData
        .find(
          (item) =>
            item.tripTypes.some((type) => type.TripTypes === selection.tripType) &&
            item.cities.some((cityItem) => cityItem.cityTypes === selection.city) &&
            item.packages.LandPackages === selection.package
        )
        ?.hotelTypes.flatMap((hotel) => hotel.hotelRoomPrice)
        .find((room) => room.RoomTypes === value);

      // Automatically set the total number of adults and infants based on the selected room
      if (roomDetails) {
        newSelection.adults = roomDetails.totalAdults || 1;
        newSelection.infants = roomDetails.totalInfants || 0;
        setMaxAdults(roomDetails.totalAdults || 0);
        setMaxInfants(roomDetails.totalInfants || 0);
      }

      filterDates(newSelection.tripType, newSelection.city, newSelection.package, value);
    }

    setSelection(newSelection);
  };

  const filterCities = (tripType) => {
    const filteredCities = new Set();
    travelData
      .filter((item) => item.tripTypes.some((type) => type.TripTypes === tripType))
      .forEach((item) => {
        item.cities?.forEach((city) => filteredCities.add(city.cityTypes));
      });
    setCities(Array.from(filteredCities));
    setPackages([]);
    setRooms([]);
    setAvailableDates([]);
  };

  const filterPackages = (tripType, city) => {
    const filteredPackages = new Set();
    travelData?.filter(
      (item) =>
        item.tripTypes.some((type) => type.TripTypes === tripType) &&
        item.cities.some((cityItem) => cityItem.cityTypes === city)
    ).forEach((item) => {
      filteredPackages.add(item.packages.LandPackages);
    });
    setPackages(Array.from(filteredPackages));
    setRooms([]);
    setAvailableDates([]);
  };

  const filterRooms = (tripType, city, packageType) => {
    const filteredRooms = new Set();
    travelData?.filter(
      (item) =>
        item?.tripTypes?.some((type) => type.TripTypes === tripType) &&
        item?.cities?.some((cityItem) => cityItem.cityTypes === city) &&
        item?.packages?.LandPackages === packageType
    ).forEach((item) => {
      item?.hotelTypes?.forEach((hotel) => {
        hotel?.hotelRoomPrice?.forEach((room) => filteredRooms?.add(room.RoomTypes));
      });
    });
    setRooms(Array.from(filteredRooms));
    setAvailableDates([]);
  };

  const filterDates = (tripType, city, packageType, roomType) => {
    const filteredDates = [];
    travelData?.filter(
      (item) =>
        item.tripTypes.some((type) => type.TripTypes === tripType) &&
        item.cities.some((cityItem) => cityItem.cityTypes === city) &&
        item.packages.LandPackages === packageType &&
        item.hotelTypes.some((hotel) =>
          hotel.hotelRoomPrice.some((room) => room.RoomTypes === roomType)
        )
    ).forEach((item) => {
      item.date_from_to?.forEach((date) => {
        const priceInEuro = item.PackagePrice.find((p) => p.currency === "Euro");
        filteredDates.push({
          date: date.dateFrom,
          price: date.price?date.price:priceInEuro ? priceInEuro.value : 0,
          packageId: item._id,
        });
      });
    });
    setAvailableDates(filteredDates);

  };

  const handleAdultsChange = (increment) => {
    setSelection((prev) => {
      const newAdults = prev.adults + increment;
      const error = newAdults > maxAdults;
      setAdultsError(error);
      return {
        ...prev,
        adults: error ? prev.adults : Math.max(1, newAdults), // Prevent increment if it exceeds the max limit
      };
    });
  };

  const handleInfantsChange = (increment) => {
    setSelection((prev) => {
      const newInfants = prev.infants + increment;
      const error = newInfants > maxInfants;
      setInfantsError(error);
      return {
        ...prev,
        infants: error ? prev.infants : Math.max(0, newInfants), // Prevent increment if it exceeds the max limit
      };
    });
  };

  const renderSelect = (label, name, options, disabled) => (
    <CustomDropdown
      sx={{ inputStyle, ...(adultsError || infantsError ? { borderColor: "red" } : {}) }}
      value={selection[name]}
      name={name}
      container={options?.map((option) => (
        <MenuItem key={option} value={option}>
          <CustomLabel text={option} />
        </MenuItem>
      ))}
      placeholder={label}
      onChange={(e) => handleSelection(name, e.target.value)}
      disabled={disabled}
    />
  );

  return (
    <Box sx={{ padding: isMobile ? "0rem" : "2rem", width: "100%" }}>

    <Grid
        container
        spacing={isMobile ? 0 : 2}
        justifyContent="center"
        sx={{
          width: "100%",
          maxWidth: isMobile ? "100%" : "80%",
          margin: "auto",
          padding: isMobile ? "1rem" : "2rem",
        }}
      >        <Grid item xs={12} sm={6} md={3}>
      <Typography sx={{ fontSize:isMobile?'0.7rem':'',color: "#004e8c", fontWeight: "bold" }}>Trip Type</Typography>
        {renderSelect("Trip Type", "tripType", tripTypes, false)}
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <Typography sx={{fontSize:isMobile?'0.7rem':'', color: selection.tripType ? "#004e8c" : "#A0B6D4", fontWeight: "bold" }}>City</Typography>
        {renderSelect("City", "city", cities, !selection.tripType)}
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <Typography sx={{ fontSize:isMobile?'0.7rem':'',color: selection.city ? "#004e8c" : "#A0B6D4", fontWeight: "bold" }}>Package</Typography>
        {renderSelect("Package", "package", packages, !selection.city)}
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      <Typography sx={{fontSize:isMobile?'0.7rem':'', color: selection.package ? "#004e8c" : "#A0B6D4", fontWeight: "bold" }}>Room Type</Typography>
        <CustomDropdown
          value={selection.room}
          name="room"
          container={[
            ...rooms.map((room) => (
              <MenuItem key={room} value={room}>
                <CustomLabel text={room} />
              </MenuItem>
            )),
            <MenuItem key="adults-children-infants">
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Typography variant="body2">Adults</Typography>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdultsChange(-1);
                    }}
                    size="small"
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body2" display="inline" sx={{ mx: 1 }}>
                    {selection.adults}
                  </Typography>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdultsChange(1);
                    }}
                    size="small"
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                  {adultsError && (
                    <Typography variant="caption" color="error">
                      Max: {maxAdults}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">Infants</Typography>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInfantsChange(-1);
                    }}
                    size="small"
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body2" display="inline" sx={{ mx: 1 }}>
                    {selection.infants}
                  </Typography>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInfantsChange(1);
                    }}
                    size="small"
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                  {infantsError && (
                    <Typography variant="caption" color="error">
                      Max: {maxInfants}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </MenuItem>,
          ]}
          placeholder="Room Type"
          onChange={(e) => handleSelection("room", e.target.value)}
          disabled={!selection.package}
        />
      </Grid>
      {/* Other components like DatePicker */}
      <Grid item xs={12} sm={6} md={3}>
      <Typography sx={{ fontSize:isMobile?'0.7rem':'',color: selection.room ? "#004e8c" : "#A0B6D4", fontWeight: "bold" }}>Date</Typography>
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    sx={{
      background: "#FAF3E0",
      borderRadius: "5px",
      color: "#004225",
      width: "100%",
    }}
    slots={{ day: (props) => {
      const { day, outsideCurrentMonth, ...other } = props;
      const dateObj = availableDates.find((d) => dayjs(d.date).isSame(day, "day"));
      const isSelected = !outsideCurrentMonth && dateObj !== undefined;

      return (
        <Tooltip
          title={dateObj ? `${dateObj.price}` : "Price not available"}
          arrow
          placement="top"
        >
          <HighlightedDay
            {...other}
            outsideCurrentMonth={outsideCurrentMonth}
            day={day}
            selected={isSelected}
            sx={{
              ...(isSelected && {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }),
            }}
          />
        </Tooltip>
      );
    }}}
    value={selection.date}
    onChange={(newValue) => {
      handleSelection("date", newValue);

      if (Array.isArray(travelData) && travelData.length > 0) {
        const filteredPackageData = travelData.find((item) =>
          item.tripTypes?.some((type) => type.TripTypes === selection.tripType) &&
          item.cities?.some((cityItem) => cityItem.cityTypes === selection.city) &&
          item.packages?.LandPackages === selection.package
        );
      
        if (newValue && filteredPackageData) {
          let totalPrice = 0;
          let isValid = true; // To check if the total adults and infants are within the limit
      
          // 1. Calculate basePrice
          const basePrice = filteredPackageData.PackagePrice.find((price) => price.currency === "Euro")?.value || 0;
          totalPrice += basePrice;
      
          // 2. Calculate roomPrices
          let selectedHotel = null;
          let selectedRoom = null;
      
          filteredPackageData.hotelTypes.forEach((hotel) => {
            const roomDetails = hotel.hotelRoomPrice.find((room) => room.RoomTypes === selection.room);
            if (roomDetails) {
              selectedHotel = hotel; // Store the selected hotel
              selectedRoom = roomDetails; // Store the selected room
      
              // Check if the selected adults and infants are within the limit
              if (selection.adults > roomDetails.totalAdults || selection.infants > roomDetails.totalInfants) {
                isValid = false;
              }
              totalPrice += roomDetails.RoomPrice * hotel.totalDays;
            }
          });
      
          if (!isValid) {
            console.error("Selected number of adults or infants exceeds the room's capacity.");
            return; // Stop the process if the selection is invalid
          }
      
          // 3. Set default values for activity and transfer prices
          const defaultActivityPrice = filteredPackageData.activityDetails[0]?.price || 0;
          const defaultTransferPrice = filteredPackageData.transferDetails[0]?.Price || 0;
          totalPrice += defaultActivityPrice + defaultTransferPrice;
      
          // 4. Find the selected date range based on newValue
          const selectedDateRange = filteredPackageData.date_from_to?.find((dateRange) =>
            dayjs(newValue).isBetween(dayjs(dateRange.dateFrom), dayjs(dateRange.dateTo), null, "[]")
          );
      
          if (!selectedDateRange) {
            console.error("No matching date range found for the selected date.");
            return;
          }
          
          // Navigate to the package details page, passing the selected date range, activity, and transfer prices
          navigate(`/land-package/${filteredPackageData.id}/details`, {
            state: {
              packageData: filteredPackageData,
              selectedDate: newValue,
              filterAdults: selection.adults,
              filterInfants: selection.infants,
              totalPrice: totalPrice,
              defaultActivityPrice: defaultActivityPrice,
              defaultTransferPrice: defaultTransferPrice,
              filterRoom: selectedRoom, // Pass the selected room
              filterHotel: selectedHotel, // Pass the selected hotel
              selectedDateRange: selectedDateRange, // Pass the selected date range (with dateFrom, dateTo, and price)
              price: availableDates.find((d) => dayjs(d.date).isSame(newValue, "day"))?.price || 0,
            },
          });
        } else {
          console.error("No matching package found for the selected filters.");
        }
      } else {
        console.error("travelData is not properly structured.");
      }
      
      
      
    }}
    shouldDisableDate={(date) => !availableDates.some((d) => dayjs(d.date).isSame(date, "day"))}
    disabled={!selection.room}
    renderInput={(params) => (
      <TextField
        fullWidth
        style={{
          height: "40px",
          background: "#FFFFFF",
          color: "#004225",
          borderRadius: "5px",
        }}
        {...params}
      />
    )}
  />
</LocalizationProvider>
</Grid>
    </Grid>
    </Box>
  );
}

export default LandPackageFilter;

