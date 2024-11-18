import React, { useState, useEffect } from "react";
import {
  Box,
  useMediaQuery,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
  IconButton,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled, useTheme } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CustomDropdown } from "../common/CustomDrowDown";
import { CustomLabel } from "../common/CustomLabel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import Translation_german from "../Translation/translation_german";
import { LinearProgress } from "@mui/material";

const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#004e8c",
    color: "#FFFFFF",
  },
  "&:hover": {
    backgroundColor: "#003b6e",
  },
}));

function Filter({ travelData }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const inputStyle = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #004e8c",
    borderRadius: isMobile ? "2px" : "5px",
    width: isMobile ? "80%" : "100%",
    fontSize: isMobile ? "0.7rem" : "1rem",
    marginLeft: isMobile ? "0" : "0", // Reduced or removed margin on mobile
  };
  const navigate = useNavigate();
  const [selection, setSelection] = useState({
    tripType: "",
    city: "",
    package: "",
    room: "",
    date: null,
    adults: 0,
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
  const [errorMessage, setErrorMessage] = useState(null); // New state for error messages

  const calculateProgress = () => {
    const fields = ["tripType", "city", "package", "room", "date"];
    const completedFields = fields.filter((field) => selection[field]);
    return (completedFields.length / fields.length) * 100; // Returns percentage completion
  };
  
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
  
    if (name === Translation_german.TRIP_TYPE_LABEL) {
      newSelection.tripType = value; // Update tripType here
      newSelection.city = "";
      newSelection.package = "";
      newSelection.room = "";
      newSelection.date = null;
      filterCities(value); // Correct value passed
    }
  
    if (name === Translation_german.CITY_LABEL) {
      newSelection.city = value;
      newSelection.package = "";
      newSelection.room = "";
      newSelection.date = null;
      filterPackages(newSelection.tripType, value);
    }
  
    if (name === Translation_german.PACKAGE_LABEL) {
      newSelection.package = value;
      newSelection.room = "";
      newSelection.date = null;
      filterRooms(newSelection.tripType, newSelection.city, value);
    }
  
    if (name === Translation_german.ROOM_TYPE_LABEL) {
      newSelection.room = value;
      newSelection.date = null;
  
      // Find the selected room details
      const roomDetails = travelData
        .find(
          (item) =>
            item.tripTypes.some((type) => type.TripTypes === selection.tripType) &&
            item.cities.some((cityItem) => cityItem.CityTypes === selection.city) &&
            item.packages.PackageTypes === selection.package
        )
        ?.hotelTypes.flatMap((hotel) => hotel.hotelRoomPrice)
        .find((room) => room.RoomTypes === value);
      // Automatically set the total number of adults and infants based on the selected room
      if (roomDetails && value === "Quad") {
        newSelection.adults = 1; // Set 1 adult initially for Quad
        newSelection.infants = 0; // Set 0 infants initially for Quad
        setMaxAdults(roomDetails.totalAdults || 0); // Set max adults based on room capacity
        setMaxInfants(roomDetails.totalInfants || 0); // Set max infants based on room capacity
      }
      else if (roomDetails) {
        newSelection.adults = roomDetails.totalAdults || 1;
        newSelection.infants = roomDetails.totalInfants || 0;
        setMaxAdults(roomDetails.totalAdults || 0);
        setMaxInfants(roomDetails.totalInfants || 0);
      }

      filterDates(newSelection.tripType, newSelection.city, newSelection.package, value);
    }
  
    setSelection(newSelection);
    setErrorMessage(null);
  };
  

  const filterCities = (tripType) => {
    const filteredCities = new Set();
    travelData
      .filter((item) => item.tripTypes.some((type) => type.TripTypes === tripType))
      .forEach((item) => {
        item.cities?.forEach((city) => filteredCities.add(city.CityTypes));
      });
    setCities(Array.from(filteredCities));
    setPackages([]);
    setRooms([]);
    setAvailableDates([]);
  };

  const filterPackages = (tripType, city) => {
    const filteredPackages = new Set();
    travelData
      ?.filter(
        (item) =>
          item.tripTypes.some((type) => type.TripTypes === tripType) &&
          item.cities.some((cityItem) => cityItem.CityTypes === city)
      )
      .forEach((item) => {
        filteredPackages.add(item.packages.PackageTypes);
      });
    setPackages(Array.from(filteredPackages));
    setRooms([]);
    setAvailableDates([]);
  };

  const renderRoomTypeSelectorWithAdultsInfants = (label, name, rooms, selection, handleSelection, handleAdultsChange, handleInfantsChange, maxAdults, maxInfants, adultsError, infantsError) => (
    <Box>
      {/* Room Type Selector as Pills */}
      <ToggleButtonGroup
        value={selection.room}
        exclusive
        onChange={(e, newValue) => handleSelection(Translation_german.ROOM_TYPE_LABEL, e.target.value)}
        disabled={!selection.package}
        aria-label={label}
        sx={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr', // Two columns on mobile, single row otherwise
          gap: 1,
          "& .MuiToggleButton-root": {
            borderRadius: "20px", // Pill shape
            padding: "6px 16px",
            textTransform: "capitalize",
            borderColor: "#FF8C42",
            color: "#333333",
            fontWeight: "bold",
            "&.Mui-selected": {
              backgroundColor: "#FF8C42",
              color: "#FFFFFF",
            },
          },
        }}
      >
        {rooms.map((room) => (
          <ToggleButton key={room} value={room} aria-label={room}>
            {room}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
  
      {/* Adults and Infants Controls */}
      <Grid container spacing={1} alignItems="center" sx={{ mt: 4 }}>
        <Grid item xs={4}>
          <Typography variant="body2">
            {Translation_german.ADULTS_LABEL}
          </Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleAdultsChange(-1);
            }}
            size="small"
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" display="inline" sx={{ mt: 1 }}>
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
              {Translation_german.MAX_ADULTS_ERROR} {maxAdults}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Typography variant="body2"  >
            {Translation_german.INFANTS_LABEL}
          </Typography>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleInfantsChange(-1);
            }}
            size="small"
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" display="inline" sx={{ mt: 4 }}>
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
              {Translation_german.MAX_INFANTS_ERROR} {maxInfants}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
  

  const filterRooms = (tripType, city, packageType) => {
    const filteredRooms = new Set();
    travelData
      ?.filter(
        (item) =>
          item?.tripTypes?.some((type) => type.TripTypes === tripType) &&
          item?.cities?.some((cityItem) => cityItem.CityTypes === city) &&
          item?.packages?.PackageTypes === packageType
      )
      .forEach((item) => {
        item?.hotelTypes?.forEach((hotel) => {
          hotel?.hotelRoomPrice?.forEach((room) => filteredRooms?.add(room.RoomTypes));
        });
      });
    setRooms(Array.from(filteredRooms));
    setAvailableDates([]);
  };

  const filterDates = (tripType, city, packageType, roomType) => {
    const filteredDates = [];
    travelData
      ?.filter(
        (item) =>
          item.tripTypes.some((type) => type.TripTypes === tripType) &&
          item.cities.some((cityItem) => cityItem.CityTypes === city) &&
          item.packages.PackageTypes === packageType &&
          item.hotelTypes.some((hotel) =>
            hotel.hotelRoomPrice.some((room) => room.RoomTypes === roomType)
          )
      )
      .forEach((item) => {
        item?.packageDateRange?.forEach((date) => {
          const priceInEuro = item.price.find((p) => p.currency === "Euro");
          filteredDates.push({
            date: date.dateFrom,
            price: date.price ? date.price : priceInEuro ? priceInEuro.value : 0,
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
    sx={{
      width: isMobile ? "100%" : "100%",
      marginLeft: isMobile ? 3 : 0,
      "& .MuiSelect-select": {
        color: "#004e8c",
        fontSize: isMobile ? "0.8rem" : "1rem",
      },
    }}
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
      <Typography variant="body2" color="textSecondary" align="center">
      {`Buchungsauswahl: ${Math.round(calculateProgress())}% abgeschlossen`}
      </Typography>
  <LinearProgress
    variant="determinate"
    value={calculateProgress()}
    sx={{
      height: 8,
      borderRadius: 4,
      backgroundColor: "#e0e0e0",
      "& .MuiLinearProgress-bar": { backgroundColor: "#004e8c" },
    }}
  />
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
      >
        {errorMessage && (
          <Grid item xs={12}>
            <Typography variant="body2" color="error" align="center">
              {errorMessage}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            sx={{
              fontSize: isMobile ? "0.7rem" : "",
              color: "#004e8c",
              fontWeight: "bold",
            }}
          >
            {Translation_german.TRIP_TYPE_LABEL}
          </Typography>
          {renderSelect("", Translation_german.TRIP_TYPE_LABEL, tripTypes, false)}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            sx={{
              fontSize: isMobile ? "0.7rem" : "",
              color: selection.tripType ? "#004e8c" : "#A0B6D4",
              fontWeight: "bold",
            }}
          >
            {Translation_german.CITY_LABEL}
          </Typography>
          {renderSelect("", Translation_german.CITY_LABEL, cities, !selection.tripType)}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            sx={{
              fontSize: isMobile ? "0.7rem" : "",
              color: selection.city ? "#004e8c" : "#A0B6D4",
              fontWeight: "bold",
            }}
          >
            {Translation_german.PACKAGE_LABEL}
          </Typography>
          {renderSelect("", Translation_german.PACKAGE_LABEL, packages, !selection.city)}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            sx={{
              fontSize: isMobile ? "0.7rem" : "",
              color: selection.package ? "#004e8c" : "#A0B6D4",
              fontWeight: "bold",
            }}
          >
            {Translation_german.ROOM_TYPE_LABEL}
          </Typography>
          {renderRoomTypeSelectorWithAdultsInfants(
  Translation_german.ROOM_TYPE_LABEL, 
  "room", 
  rooms, 
  selection, 
  handleSelection, 
  handleAdultsChange, 
  handleInfantsChange, 
  maxAdults, 
  maxInfants, 
  adultsError, 
  infantsError
)}

        </Grid>
        {/* Other components like DatePicker */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            sx={{
              marginTop: !selection.room||isMobile ?0:-10,
              fontSize: isMobile ? "0.7rem" : "",
              color: selection.room ? "#004e8c" : "#A0B6D4",
              fontWeight: "bold",
              marginLeft: isMobile ? 4 : 0,
            }}
          >
            {Translation_german.DATE_LABEL}
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{
                background: "#FAF3E0",
                borderRadius: "5px",
                color: "#004225",
                width: isMobile ? "60%" : "100%",
                marginLeft: isMobile ? 4 : 0,
              }}
              slots={{
                day: (props) => {
                  const { day, outsideCurrentMonth, ...other } = props;
                  const dateObj = availableDates.find((d) =>
                    dayjs(d.date).isSame(day, "day")
                  );
                  const isSelected = !outsideCurrentMonth && dateObj !== undefined;

                  return (
                    <Tooltip
                      title={dateObj ? `${dateObj.price}` : Translation_german.PRICE_NOT_AVAILABLE}
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
                },
              }}
              value={selection.date}
              onChange={(value) => {
                setSelection((prev) => ({ ...prev, date: value }));
                handleSelection("date", value);
                if (Array.isArray(travelData) && travelData.length > 0) {
                  const filteredPackageData = travelData.find(
                    (item) =>
                      item.tripTypes?.some((type) => type.TripTypes === selection.tripType) &&
                      item.cities?.some((cityItem) => cityItem.CityTypes === selection.city) &&
                      item.packages?.PackageTypes === selection.package
                  );
                  if (value && filteredPackageData) {
                    let totalPrice = 0;
                    let isValid = true; // To check if the total adults and infants are within the limit

                    // 1. Calculate basePrice
                    const basePrice =
                      filteredPackageData.price.find((price) => price.currency === "Euro")?.value ||
                      0;
                    totalPrice += basePrice;

                    // 2. Calculate roomPrices
                    let selectedHotel = null;
                    let selectedRoom = null;

                    filteredPackageData.hotelTypes.forEach((hotel) => {
                      const roomDetails = hotel.hotelRoomPrice.find(
                        (room) => room.RoomTypes === selection.room
                      );
                      if (roomDetails) {
                        selectedHotel = hotel; // Store the selected hotel
                        selectedRoom = roomDetails; // Store the selected room

                        // Check if the selected adults and infants are within the limit
                        if (
                          selection.adults > roomDetails.totalAdults ||
                          selection.infants > roomDetails.totalInfants
                        ) {
                          isValid = false;
                        }
                        totalPrice += roomDetails.RoomPrice * hotel.totalDays;
                      }
                    });
                    const selectedDateRange = filteredPackageData.packageDateRange?.find(
                      (dateRange) =>
                        dayjs(value).isBetween(
                          dayjs(dateRange.dateFrom),
                          dayjs(dateRange.dateTo),
                          null,
                          "[]"
                        )
                    );
                    if (!selectedDateRange) {
                      setErrorMessage(Translation_german.DATE_RANGE_ERROR);
                      return;
                    }

                    if (!isValid) {
                      setErrorMessage(Translation_german.ROOM_CAPACITY_ERROR);
                      return; // Stop the process if the selection is invalid
                    }

                    // 3. Set default values for activity and transfer prices
                    const defaultActivityPrice = filteredPackageData.activityDetails[0]?.price || 0;
                    const defaultTransferPrice = filteredPackageData.transferDetails[0]?.Price || 0;
                    const defaultFlightPrice =
                      filteredPackageData?.flightDetails[0]?.Price || 0;
                    totalPrice += defaultActivityPrice + defaultTransferPrice + defaultFlightPrice;

                    // Navigate to the package details page, passing default activity and transfer prices
                    navigate(`/umrah-package/${filteredPackageData.id}/details`, {
                      state: {
                        packageData: filteredPackageData,
                        selectedDate: value,
                        filterAdults: selection.adults,
                        filterInfants: selection.infants,
                        totalPrice: totalPrice,
                        defaultActivityPrice: defaultActivityPrice,
                        defaultTransferPrice: defaultTransferPrice,
                        filterRoom: selectedRoom, // Pass the selected room
                        filterHotel: selectedHotel, // Pass the selected hotel
                        selectedDateRange: selectedDateRange,
                        price:
                          availableDates.find((d) => dayjs(d.date).isSame(value, "day"))?.price ||
                          0,
                      },
                    });
                  } else {
                    setErrorMessage(Translation_german.PACKAGE_NOT_FOUND_ERROR);
                  }
                } else {
                  setErrorMessage(Translation_german.TRAVEL_DATA_ERROR);
                }
              }}
              shouldDisableDate={(date) =>
                !availableDates.some((d) => dayjs(d.date).isSame(date, "day"))
              }
              disabled={!selection.room}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  style={{
                    height: isMobile ? "30px" : "40px",
                    background: "#FFFFFF",
                    color: "#004225",
                    borderRadius: isMobile ? "2px" : "5px",
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

export default Filter;
