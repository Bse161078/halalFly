import React, { useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHotelsApiReset,
  getHotelTravelCardsApiReset,
  getStaticHomeApiReset,
} from "../../reducers";
import {
  getAllHotelsApi,
  getHotelTravelCardsApi,
  getStaticHomeApi,
} from "../../services";
import LoadingScreen from "../LoadingScreen";
import Filter from "../filter/index";
import UmrahHajjCarousel from "../UmrahPackages/UmrahPackages";
import HeaderAndFilterSection from "../HeaderAndFilterSection";
import LandPackages from "../LandPackages/LandPackages";
import FAQs from "../FAQs";
import Servides from "../OurServices";
import WhatsAppButton from "src/WhatsappButton";
import { useMediaQuery, useTheme } from "@mui/material";
import { Suspense } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: allHotels, loading: allHotelsLoading } = useSelector(
    (state) => state.getAllHotelsApiReducer
  );
  const { data: allUmrahPackages, loading: allUmrahPackagesLoading } =
    useSelector((state) => state.getHotelTravelCardsApiReducer);
  const { data: homePage, loading: homePageLoading } = useSelector(
    (state) => state.getStaticHomeApiReducer
  );

  useEffect(() => {
    dispatch(getAllHotelsApi());
    dispatch(getHotelTravelCardsApi());
    dispatch(getStaticHomeApi());

    return () => {
      dispatch(getAllHotelsApiReset());
      dispatch(getHotelTravelCardsApiReset());
      dispatch(getStaticHomeApiReset());
    };
  }, [dispatch]);

  // Safeguard against missing data
  const mainImageUrl = homePage?.[0]?.MainImage?.[0]?.url || "";
  const mainText = homePage?.[0]?.MainText || "";
  const umrahIconUrl = homePage?.[0]?.UmrahPackageIcon?.url || "";
  const landPackageIconUrl = homePage?.[0]?.LandPackageIcon?.url || "";

  // Memoize props for Filter component (Move this above the conditional return)
  const filterProps = useMemo(
    () => ({
      umrahIcon: umrahIconUrl,
      landPackageIcon: landPackageIconUrl,
      allUmrahPackages,
      allLandPackages: allHotels,
    }),
    [umrahIconUrl, landPackageIconUrl, allUmrahPackages, allHotels]
  );

  // Combine all loading states
  // const isLoading = allHotelsLoading || allUmrahPackagesLoading || homePageLoading;
  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <Grid container sx={{ width: "100%", overflow: "hidden", position: "relative" }}>
      {/* Hero Section */}
      <Grid
        container
        sx={{
          backgroundImage: `linear-gradient(to right, rgba(12, 12, 12, 0.8), rgba(0, 78, 140, 0.8)),
          url(${mainImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: isMobile ? "70vh" : "100vh",
          width: "100%",
          color: "#D5B782",
          textAlign: "center",
          padding: { xs: 2, sm: 3, md: 5 },
        }}
        alignItems="center"
      >
        <Grid item xs={12}>
          <HeaderAndFilterSection mainText={mainText} />
        </Grid>
      </Grid>

      {/* Filter Section */}
      <Grid
        item
        container
        xs={12}
        md={10}
        justifyContent="center"
        sx={{
          marginTop: { xs: -20, sm: -7, md: -10 },
          marginX: "auto",
          paddingX: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Filter {...filterProps} />
      </Grid>

      {/* Our Services Section */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: { xs: 4, sm: 6, md: 8 },
          textAlign: "center",
          color: "#D5B782",
        }}
      >
        <Grid item xs={12} md={10}>
          <Servides homePage={homePage?.[0] || {}} />
        </Grid>
      </Grid>

      {/* Features and Packages Section */}
      <Grid
        container
        sx={{
          background: "#FFFFFF",
          padding: { xs: 4, sm: 6, md: 8 },
          textAlign: "center",
          color: "#0C0C0C",
        }}
      >
        <Grid item xs={12}>
          <UmrahHajjCarousel homePage={homePage?.[0] || {}} packages={allUmrahPackages} />
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 4 }}>
          <LandPackages homePage={homePage?.[0] || {}} hotels={allHotels} />
        </Grid>
      </Grid>

      {/* FAQs Section */}
      <Suspense fallback={<LoadingScreen />}>
        <Grid
          container
          sx={{
            padding: { xs: 4, sm: 6, md: 8 },
            textAlign: "center",
          }}
        >
          <FAQs homePage={homePage?.[0] || {}} />
        </Grid>
      </Suspense>

    </Grid>
  );
};

export default Home;
