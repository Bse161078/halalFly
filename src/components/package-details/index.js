import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid/Grid";
import { useLocation } from 'react-router-dom';

import {
    CustomLabelCardHeader,
    CustomLabelCardHeaderSmall,
    CustomLabelCurrency,
    CustomLabelHeaderLarge, CustomLabelXSmall
} from "../common/CustomLabel";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import 'react-multi-carousel/lib/styles.css';
import LogoWithoutDesc from "src/assets/images/logo-without-desc.png";
import AvatarLogin from "src/assets/images/avatar-login.png";
import Paper from "@mui/material/Paper/Paper";
import SamplePlaceIcon from "src/assets/images/sample-place.jpg";
import {PickersDay} from "@mui/x-date-pickers/PickersDay";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField/TextField";
import {styled} from "@mui/material/styles";
import {StaticDatePicker, DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import KingBedIcon from '@mui/icons-material/KingBed';
import LuggageIcon from '@mui/icons-material/Luggage';
import CategoryIcon from '@mui/icons-material/Category';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LanguageIcon from '@mui/icons-material/Language';
import {CustomButtonLarge} from "../common/CustomButton";
import {
    useNavigate
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHotelTravelCardsApi,searchPackagesApi } from "src/services";
import { getHotelTravelCardsApiReset, searchPackagesApiReset, searchPackagesApiSliceReducer } from "src/reducers";
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: {max: 4000, min: 3000},
        items: 5
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 2.5
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
};

const PackageDetails = () => {

    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { data, loading, error } = useSelector((state) => state.getUserApiReducer);

    useEffect(() => {
        dispatch(getHotelTravelCardsApi());
        dispatch(searchPackagesApi({search:"Test"}))


        return () => {
            dispatch(getHotelTravelCardsApiReset());
            dispatch(searchPackagesApiReset());
        };
    }, [dispatch]);
      

    const { data: allTravelOptions, loading: allTravelOptionsLoading, error: allTravelOptionsError } = useSelector((state) => state.getHotelTravelCardsApiReducer);

    const {data: searchPackages, loading: searchPackagesLoading, error: searchPackagesError} = useSelector((state) => state.searchPackagesApiSliceReducer);
    const { packages} = location.state || {};

    const filteredTravelCard = allTravelOptions?.filter(item =>
        item.packages.some(packageItem => packageItem.PackageTypes === packages)
    );
    const packageTitle = Array.isArray(filteredTravelCard) && filteredTravelCard.length > 0 
    ? filteredTravelCard[0].title 
    : undefined;
    const travelCard = Array.isArray(filteredTravelCard) && filteredTravelCard.length > 0 
    ? filteredTravelCard[0] 
    : undefined;

    console.log("packages : ",packages,travelCard)

    const [availableDates, setAvailableDates] = useState([]);
    const availabilityRules = {
        London: {
            Standard: [6], // Saturdays
            Deluxe: [0, 6], // Sundays and Saturdays
            Premium: [1, 3, 5], // Mondays, Wednesdays, Fridays
        },
        Paris: {
            Standard: [2], // Tuesdays
            Deluxe: [2, 4], // Tuesdays and Thursdays
            Premium: [5, 6], // Fridays and Saturdays
        },
        // Add more cities and rules as needed
    };

    useEffect(() => {
        updateAvailableDates();

    }, []);



    const updateAvailableDates = () => {
        const dateFrom = travelCard?.packageDateRange[0]?.dateFrom;
        const dateTo = travelCard?.packageDateRange[0]?.dateTo;

        const dates = generateDateRange(dateFrom,dateTo);
        setAvailableDates(dates);
    };

    const generateDateRange = (startDate, endDate) => {
        let dates = [];
        let currDate = dayjs(startDate);
        const lastDate = dayjs(endDate);
      
        while (currDate.isBefore(lastDate) || currDate.isSame(lastDate, 'day')) {
          dates.push(currDate.format("YYYY-MM-DD"));
          currDate = currDate.add(1, 'day');
        }
      
        return dates;
      };


    const HighlightedDay = styled(PickersDay)(({theme}) => ({
        "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    }));


    const Day = (props) => {
        const {highlightedDays = [], day, outsideCurrentMonth, ...other} = props;

        const isSelected =
            !props.outsideCurrentMonth &&
            highlightedDays.includes(day.format("YYYY-MM-DD"));

        return (
            <HighlightedDay
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
                selected={isSelected}
            />
        );
    };


    return (
        <Grid container style={{ width: "100%", overflow: "hidden", background: "#FAF3E0" }}>
        {/* Header Section */}
        <Grid container justifyContent="center" style={{ padding: "20px", position: "relative", background: "#004225" }}>
          <Grid item xs={10} container>
            <Grid item>
              <CustomLabelHeaderLarge text={travelCard?.title || "No Title"} color="#FAF3E0" />
            </Grid>
            
            <Grid item xs={12} style={{ marginTop: "10px" }}>
              <Grid item container style={{ marginTop: "20px" }}>
                {travelCard?.cities?.length > 0 ? (
                  travelCard.cities.map((city, index) => (
                    <div
                      key={index}
                      style={{ padding: "5px 10px", background: "#FAF3E0", borderRadius: "10px", marginRight: "10px" }}
                    >
                      <CustomLabelCardHeaderSmall color="#004225" text={city.CityTypes || "No City Type"} fontWeight="bold" />
                    </div>
                  ))
                ) : (
                  <div style={{ color: "#FAF3E0" }}>No Cities Available</div>
                )}
          
                {travelCard?.packageDateRange?.length > 0 && (
                  <div style={{ padding: "5px 10px", background: "#FAF3E0", borderRadius: "10px" }}>
                    <CustomLabelCardHeaderSmall
                      color="#004225"
                      text={`${travelCard.packageDateRange[0].dateFrom || 'N/A'} to ${travelCard.packageDateRange[0].dateTo || 'N/A'}`}
                      fontWeight="bold"
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
  
        {/* Price Section */}
        <Grid container justifyContent="center" style={{ padding: "20px", position: "relative", background: "#004225" }}>
          <Grid item xs={10} container alignItems="center">
            <Grid item xs={12} container spacing={2}>
              {travelCard?.hotelTypes?.map((hotel, index) => (
                <Grid item xs={4} key={index} style={{ background: "#FAF3E0", padding: "10px", borderRadius: "10px" }}>
                  <CustomLabelCurrency
                    text={`${hotel.HotelNames} - ${hotel.HotelStars} Stars (Rating: ${hotel.HotelRatings})`}
                    fontWeight="bold"
                    color="#004225"
                  />
                </Grid>
              ))}
            </Grid>
      
            <Grid item xs={12} container justifyContent="flex-end" alignItems="center" style={{ marginTop: "20px" }}>
              <CustomLabelCurrency text={travelCard?.price?.[0]?.currency || "AED"} fontWeight="bold" color="#FAF3E0" />
              <span style={{ marginLeft: "10px" }} />
              <CustomLabelHeaderLarge
                color="#FAF3E0"
                text={travelCard?.price?.[0]?.value?.toString() || "0.00"}
                fontWeight="bold"
              />
              <Grid item container justifyContent="flex-end" alignItems="center">
                <CustomLabelCurrency text="Per person on twin sharing" fontWeight="bold" color="#FAF3E0" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
  
        {/* Main Content Section */}
        <Grid container justifyContent="center" style={{ padding: "20px", position: "relative", background: "#FAF3E0" }}>
          <Grid item xs={10} container justifyContent="space-between">
            <Grid item xs={8} container>
              <Grid container>
                <Grid item xs={7.5}>
                  <img
                    src={travelCard?.image?.[0]?.url || "placeholder.jpg"}
                    style={{ width: "100%", borderRadius: "10px" }}
                    alt="Main Image"
                  />
                </Grid>
                <Grid item xs={3.5} container style={{ marginLeft: "10px" }} direction="column">
                  <img
                    src={travelCard?.image?.[0]?.formats?.medium?.url || "placeholder.jpg"}
                    style={{ width: "100%", borderRadius: "10px" }}
                    alt="Medium Image"
                  />
                  <img
                    src={travelCard?.image?.[0]?.formats?.small?.url || "placeholder.jpg"}
                    style={{ width: "100%", borderRadius: "10px", marginTop: "25px" }}
                    alt="Small Image"
                  />
                </Grid>
              </Grid>
      
              <Grid item container xs={12} justifyContent="space-between" style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                  <CustomLabelCardHeader text="Features" color="#004225" fontWeight="bold" />
                </Grid>
      
                <Grid item container spacing={2} style={{ marginTop: "10px" }}>
                  <Grid item xs={4}>
                    <Grid container direction="column" alignItems="center">
                      <FlightIcon style={{ color: "#FAF3E0", padding: "15px", borderRadius: "50%", background: "#004225", width: "60px", height: "60px" }} />
                      <CustomLabelCardHeaderSmall
                        color="#004225"
                        text={travelCard?.flightIncluded ? "Flights Included" : "No Flights"}
                        fontWeight="bold"
                      />
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Grid container direction="column" alignItems="center">
                      <HotelIcon style={{ color: "#FAF3E0", padding: "15px", borderRadius: "50%", background: "#004225", width: "60px", height: "60px" }} />
                      <CustomLabelCardHeaderSmall
                        color="#004225"
                        text={travelCard?.hotelTypes?.map(hotel => hotel.HotelNames).join(", ") || "No Hotels"}
                        fontWeight="bold"
                      />
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Grid container direction="column" alignItems="center">
                      <KingBedIcon style={{ color: "#FAF3E0", padding: "15px", borderRadius: "50%", background: "#004225", width: "60px", height: "60px" }} />
                      <CustomLabelCardHeaderSmall
                        color="#004225"
                        text={travelCard?.roomTypes?.map(room => room.RoomTypes).join(", ") || "No Room Types"}
                        fontWeight="bold"
                      />
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Grid container direction="column" alignItems="center">
                      <LuggageIcon style={{ color: "#FAF3E0", padding: "15px", borderRadius: "50%", background: "#004225", width: "60px", height: "60px" }} />
                      <CustomLabelCardHeaderSmall
                        color="#004225"
                        text={travelCard?.tripTypes?.map(trip => trip.TripTypes).join(", ") || "No Trip Types"}
                        fontWeight="bold"
                      />
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Grid container direction="column" alignItems="center">
                      <CategoryIcon style={{ color: "#FAF3E0", padding: "15px", borderRadius: "50%", background: "#004225", width: "60px", height: "60px" }} />
                      <CustomLabelCardHeaderSmall
                        color="#004225"
                        text={travelCard?.packages?.map(pkg => pkg.PackageTypes).join(", ") || "No Packages"}
                        fontWeight="bold"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
  
              {/* Description Section */}
              <Grid item xs={12} style={{ marginTop: "20px" }}>
                <CustomLabelCardHeader text="Description" color="#004225" fontWeight="bold" />
                <CustomLabelCardHeaderSmall text={travelCard?.description || "No description available"} color="#004225" />
              </Grid>
            </Grid>
      
            <Grid item xs={4} style={{ background: "#FAF3E0" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  slots={{ day: Day }}
                  slotProps={{
                    day: {
                      highlightedDays: availableDates,
                    },
                  }}
                  label="Select Date"
                  shouldDisableDate={(date) => !availableDates.includes(dayjs(date).format("YYYY-MM-DD"))}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
      
              <Grid item container style={{ marginTop: "10px", padding: "10px" }}>
                <Grid item>
                  <CustomLabelXSmall
                    color="#004225"
                    text={travelCard?.pricingNote || "Note: The price displayed may change based on availability and occupancy"}
                    fontWeight="bold"
                  />
                </Grid>
                <Grid
                  item
                  container
                  style={{ marginTop: "10px" }}
                  onClick={() => window.open("https://buy.stripe.com/test_14k16v0WT0he21a9AG", "_self")}
                >
                  <CustomButtonLarge text="Buy Package" background="#004225" color="#FAF3E0" borderRadius={15} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
    )
}

export default PackageDetails;
