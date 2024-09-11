import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
    useLocation,
    useNavigate
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllHotelsApiReset,
    getHotelTravelOptionsApiReset,
    getUserApiReset
} from "../../reducers";
import { getAllHotelsApi, getHotelTravelOptionsApi, getUserApi } from "../../services";
import { removeAccessToken } from "../../utils";
import Loader from "../common/Loader";
import Footer from "../Footer";
import Filter from "../filter/Filter";
import UmrahHajjCarousel from "../hotelCarousel/hotelCarousel";

// Importing Icons and Images
import HomeIcon from '@mui/icons-material/Home';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HotelIcon from '@mui/icons-material/Hotel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AvatarLogin from "src/assets/images/avatar-login.png";
import UaeCurrencyIcon from "src/assets/images/uae-icon.png";
import EnglandIcon from "src/assets/images/england.png";
import LogoImage from "src/assets/images/logo.png";
import PartnerInfo from "../PartnerInfo/Index";
import Header from "../Header";
// Custom Labels and Buttons
import { CustomLabelCurrency, CustomLabelHeaderLarge, CustomLabelCardHeader } from "../common/CustomLabel";
import HeaderAndFilterSection from "../HeaderAndFilterSection";
import NavigationButton from "../NavigationButton";

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.getUserApiReducer);
    const { data: allHotels, loading: allHotelsLoading, error: allHotelsError } = useSelector((state) => state.getAllHotelsApiReducer);
    const { data: allTravelOptions, loading: allTravelOptionsLoading, error: allTravelOptionsError } = useSelector((state) => state.getHotelTravelOptionsApiReducer);

    useEffect(() => {
        dispatch(getUserApi());
        dispatch(getAllHotelsApi());
        dispatch(getHotelTravelOptionsApi());

        return () => {
            dispatch(getUserApiReset());
            dispatch(getAllHotelsApiReset());
            dispatch(getHotelTravelOptionsApiReset());
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
        <Grid container style={{ width: "100%", overflow: "hidden" }}>
            {(loading || allHotelsLoading || allTravelOptionsLoading) && <Loader />}

            <Grid container style={{ background: "#004225", minHeight: "100vh", position: "absolute" }}></Grid>
            <Grid container style={{ background: "#FAF3E0", top: "100vh", minHeight: "100vh", position: "absolute" }}></Grid>

            <Grid container justifyContent="center" style={{ position: "relative" }}>
                <Grid container item xs={10} justifyContent="space-between" alignItems="center" style={{ marginTop: 10 }}>
                    <Header/>
                </Grid>

                {/* Navigation Buttons */}
                <Grid item xs={10} container style={{ marginTop: 30 }}>
                 <NavigationButton allHotels={allHotels} />
                </Grid>

                {/* Header and Filter Section */}
                <Grid item container xs={10} style={{ marginTop: 30 }}>
                    <HeaderAndFilterSection />
                </Grid>

                <Grid item container xs={10} style={{ marginTop: 30 }}>
                    <Filter allTravelOptions={allTravelOptions} />
                </Grid>

                {/* Carousel Section */}
                <Grid container spacing={2} sx={{ marginTop: 10 }}>
                    <Grid item xs={12} sx={{ height: 'auto', marginBottom: 4, overflow: 'visible', position: 'relative' }}>
                        <UmrahHajjCarousel />
                    </Grid>

                    {/* Partner Information */}
                    <Grid container sx={{ padding: "20px", background: "#004225", borderRadius: "10px", color: "white", marginTop: 2, zIndex: 1 }} justifyContent="space-between">
                        <PartnerInfo />
                    </Grid>
                </Grid>

                {/* Footer Section */}
                <Grid item xs={12} container style={{ background: "#FAF3E0", marginTop: "40px", padding: "20px" }} justifyContent="center">
                    <Footer />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Home;
