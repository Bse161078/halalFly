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
  validateCouponApiReset,
  getStaticHomeApiReset
} from "../../reducers";
import {
  getAllHotelsApi,
  getFormOptionsApi,
  getHotelTravelOptionsApi,
  getUserApi,
  getLandOptions,
  getHotelTravelCardsApi,
  validateCouponApi,
  getStaticHomeApi
} from "../../services";
import { removeAccessToken } from "../../utils";
import LoadingScreen from "../LoadingScreen";
import Filter from "../filter/index";
import { CircularProgress,Typography,Box } from "@mui/material";
import UmrahHajjCarousel from "../UmrahPackages/UmrahPackages";
import PartnerInfo from "../PartnerInfo/Index";
import NavigationButton from "../NavigationButton";
import HeaderAndFilterSection from "../HeaderAndFilterSection";
import LandPackages from "../LandPackages/LandPackages";
import WhatsAppButton from "src/WhatsappButton";
import FAQs from "../FAQs";  // Import the FAQs component
import Servides from "../OurServices";
import {useMediaQuery, useTheme } from '@mui/material';
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const {data:homePage, loading: homePageLoading} = useSelector((state)=> state.getStaticHomeApiReducer);
console.log("homepage",homePage)
  useEffect(() => {
    dispatch(getAllHotelsApi());
    dispatch(getHotelTravelOptionsApi());
    dispatch(getLandOptions());
    dispatch(getHotelTravelCardsApi());
    dispatch(getFormOptionsApi());
    dispatch(getStaticHomeApi());

  

    return () => {
      dispatch(getAllHotelsApiReset());
      dispatch(getHotelTravelOptionsApiReset());
      dispatch(getLandOptionsApiReset());
      dispatch(getHotelTravelCardsApiReset());
      dispatch(getFormOptionsApiReset());
      dispatch(getStaticHomeApiReset());
    };
  }, [dispatch]);

  useEffect(() => {
    
  }, [ dispatch, navigate]);
 
 
 


return (
  <Grid container sx={{ width: "100%",
   overflow: "hidden", position: "relative" }}>
    <WhatsAppButton />
    {(allHotelsLoading || allUmrahPackagesLoading && homePageLoading) && 
    <LoadingScreen/>}

    {/* Hero Section */}
    <Grid
      container
      sx={{
        backgroundImage: `linear-gradient(to right, rgba(12, 12, 12, 0.8), rgba(0, 78, 140, 0.8)), url(${homePage?.length>0 ?homePage[0]?.MainImage[0].url:""})`,
        backgroundSize: 'cover', // Ensures the image covers the whole section
        backgroundPosition: 'center', // Centers the background image
        backgroundRepeat: 'no-repeat',
        minHeight: isMobile?'70vh':'100vh',
        width: '100%',
        color: '#D5B782', // Gold text color for hero section
        position: 'relative',
        padding: { xs: 2, sm: 3, md: 5 },
        textAlign: 'center',
      }}
      alignItems="center"
    >
      <Grid item xs={12}>
        <NavigationButton umrahPackages={umrahPackages} landPackages={landPackages} />
      </Grid>

      <Grid item xs={12} sx={{marginTop:isMobile?-50:0}}>
        <HeaderAndFilterSection mainText={homePage?.length>0?homePage[0].MainText:""} />
      </Grid>

      
    </Grid>
    <Grid
        item
        container
        xs={12} // Use full width on mobile for better alignment
        md={10} // Adjust to a narrower width on larger screens
        justifyContent="center"
        sx={{
          marginTop: { xs: -20, sm: -7, md: -10 }, // Responsive margin for different screen sizes
          marginX: { xs: 2, sm: 5, md: 10 }, // Horizontal margin, responsive for all screens
          paddingX: { xs: 1, sm: 2, md: 3 }, // Responsive horizontal padding for spacing
        }}
      >
        <Filter umrahIcon = {homePage?.length>0&&homePage[0].UmrahPackageIcon.url}
        landPackageIcon = {homePage?.length>0&& homePage[0].LandPackageIcon.url} 
        allUmrahPackages={allUmrahPackages} allLandPackages={allHotels} />
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
        <Servides services= {homePage?.length>0? homePage[0].OurServices:[] } />
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
      <FAQs faqs={homePage?.length>0?homePage[0].FAQS:[]} />
    </Grid>

    {/* Footer Section */}
    
  </Grid>
  );
};

export default Home;
