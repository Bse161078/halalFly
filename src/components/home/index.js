import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHotelsApiReset,
  getHotelTravelOptionsApiReset,
  getUserApiReset,
  getLandOptionsApiReset,
  getHotelTravelCardsApiReset,
  getFormOptionsApiReset,
} from "../../reducers";
import {
  getAllHotelsApi,
  getFormOptionsApi,
  getHotelTravelOptionsApi,
  getUserApi,
  getLandOptions,
  getHotelTravelCardsApi,
} from "../../services";
import { removeAccessToken } from "../../utils";
import Loader from "../common/Loader";
import Filter from "../filter/index";
import { CircularProgress,Typography,Box } from "@mui/material";
import UmrahHajjCarousel from "../UmrahPackages/UmrahPackages";
import PartnerInfo from "../PartnerInfo/Index";
import NavigationButton from "../NavigationButton";
import HeaderAndFilterSection from "../HeaderAndFilterSection";
import LandPackages from "../LandPackages/LandPackages";
import WhatsAppButton from "src/WhatsappButton";
import FAQs from "../FAQs";  // Import the FAQs component
import OurServices from "../OurServices";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.getUserApiReducer);
  const { data: allHotels, loading: allHotelsLoading } = useSelector((state) => state.getAllHotelsApiReducer);
  const { data: allUmrahPackages, loading: allUmrahPackagesLoading } = useSelector((state) => state.getHotelTravelCardsApiReducer);
  const umrahPackages = allUmrahPackages?.map((umrah) => ({
    packageType: umrah?.packages?.PackageTypes,   // Get PackageTypes
    hotelInfo: umrah?.hotelTypes?.map((hotelType) => ({
      hotel: hotelType?.HotelNames,   // Get the hotel name
      totalDays: hotelType?.totalDays // Get totalDays from hotelTypes
    }))
  }));
  const landPackages = allHotels?.map((landpkg) => ({
    packageType: landpkg?.packages?.LandPackages,   // Get PackageTypes
    hotelInfo: landpkg?.hotelTypes?.map((hotelType) => ({
      hotel: hotelType?.HotelNames,   // Get the hotel name
      totalDays: hotelType?.totalDays // Get totalDays from hotelTypes
    }))
  }));
  useEffect(() => {
    dispatch(getUserApi());
    dispatch(getAllHotelsApi());
    dispatch(getHotelTravelOptionsApi());
    dispatch(getLandOptions());
    dispatch(getHotelTravelCardsApi());
    dispatch(getFormOptionsApi());

    return () => {
      dispatch(getUserApiReset());
      dispatch(getAllHotelsApiReset());
      dispatch(getHotelTravelOptionsApiReset());
      dispatch(getLandOptionsApiReset());
      dispatch(getHotelTravelCardsApiReset());
      dispatch(getFormOptionsApiReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error === "Please authenticate") {
      removeAccessToken();
      navigate(`/login`);
      dispatch(getUserApiReset());
    }
  }, [error, dispatch, navigate]);



return (
  <Grid container sx={{ width: "100%", overflow: "hidden", position: "relative" }}>
    <WhatsAppButton />
    {(loading || allHotelsLoading || allUmrahPackagesLoading) && <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark transparent background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Ensures loader stays on top
      }}
    >
      <CircularProgress
        size={80}
        sx={{
          color: '#FF8C42', // Use Orange for the loader
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: '#FAF3E0', // Light text
          marginTop: 2,
          fontWeight: 'bold',
        }}
      >
        Loading, please wait...
      </Typography>
    </Box>}

    {/* Hero Section */}
    <Grid
      container
      sx={{
        background: "linear-gradient(to right, #0C0C0C, #004e8c)", // Updated to black and dark blue gradient
        minHeight: "100vh",
        width: "100%",
        color: "#D5B782", // Gold text color for hero section
        position: "relative",
        padding: { xs: 2, sm: 3, md: 5 },
        textAlign: "center",
      }}
      alignItems="center"
    >
      <Grid item xs={12}>
        <NavigationButton umrahPackages={umrahPackages} landPackages={landPackages} />
      </Grid>

      <Grid item xs={12}>
        <HeaderAndFilterSection />
      </Grid>

      <Grid item container xs={10} justifyContent="center" sx={{ marginTop: 4, marginLeft: 14 }}>
        <Filter allUmrahPackages={allUmrahPackages} allLandPackages={allHotels} />
      </Grid>
    </Grid>

    {/* Our Services */}
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: { xs: 4, sm: 6, md: 8 },
        textAlign: "center",
        color: "#D5B782", // Gold text color for services
      }}
    >
      <Grid item xs={12} md={10}>
        <OurServices />
      </Grid>
    </Grid>

    {/* Features and Packages Section */}
    <Grid
      container
      sx={{
        background: "#FFFFFF", // Keep white background for clarity
        padding: { xs: 4, sm: 6, md: 8 },
        textAlign: "center",
        color: "#0C0C0C", // Use black text for clarity on white background
      }}
    >
      <Grid item xs={12}>
        <UmrahHajjCarousel packages={allUmrahPackages} />
      </Grid>

      <Grid item xs={12} sx={{ marginTop: 4 }}>
        <LandPackages hotels={allHotels} />
      </Grid>
    </Grid>

    {/* FAQs Section */}
    <Grid
      container
      sx={{
        padding: { xs: 4, sm: 6, md: 8 },
        textAlign: "center",
      }}
    >
      <FAQs />
    </Grid>

    {/* Footer Section */}
    
  </Grid>
  );
};

export default Home;
