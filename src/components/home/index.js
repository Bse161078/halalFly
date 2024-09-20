import React, {useEffect} from "react";
import Grid from "@mui/material/Grid/Grid";

import LogoImage from "src/assets/images/logo.png";
import UaeCurrencyIcon from "src/assets/images/uae-icon.png";
import EnglandIcon from "src/assets/images/england.png";
import {
    CustomLabelCardHeader,
    CustomLabelCardHeaderSmall,
    CustomLabelCurrency,
    CustomLabelHeaderLarge
} from "../common/CustomLabel";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AvatarLogin from "src/assets/images/avatar-login.png";
import HomeIcon from '@mui/icons-material/Home';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import Paper from "@mui/material/Paper/Paper";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SampleImage from "src/assets/images/sample-place.jpg";
import FlagIcon from '@mui/icons-material/Flag';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import Divider from "@mui/material/Divider/Divider";
import {CustomButtonLarge} from "../common/CustomButton";
import MinistryIcon from "src/assets/images/ministry-gray.svg";
import NusukIcon from "src/assets/images/nusuk-gray.svg";
import LogoLargeIcon from "src/assets/images/logo-large.png";
import SisaLogoIcon from "src/assets/images/sisa-logo.png";
import PaypalIcon from "src/assets/images/paypal.svg";
import MasterCardIcon from "src/assets/images/mastercard.svg";
import ApplePayIcon from "src/assets/images/applepay.svg";
import {useLocation, useNavigate, Outlet} from "react-router-dom"
import Filter from "../filter/Filter";
import {useDispatch, useSelector} from "react-redux";
import {
    createPaymentLinkApiReset,
    createPaymentLinkApiSliceReducer,
    getAllHotelsApiReset,
    getHotelTravelCardsApiReset,
    getHotelTravelOptionsApiReducer,
    getHotelTravelOptionsApiReset,
    getLandOptionsApiReducer, getLandOptionsApiReset,
    getTravelFormsApiReducer,
    getTravelFormsApiReset,
    getUserApiReducer,
    getUserApiReset,
    logUserApiReset,
    searchPackagesApiReset,
    searchPackagesApiSliceReducer
} from "../../reducers";
import {
    createPaymentLinkApi,
    getAllHotelsApi,
    getHotelTravelCardsApi,
    getHotelTravelOptionsApi, getLandOptionsApi, getTravelFormsApi,
    getUserApi,
    searchPackagesApi
} from "../../services";
import {removeAccessToken} from "../../utils";
import Loader from "../common/Loader";


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: {max: 4000, min: 3000},
        items: 5
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 2.9
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

const Home = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()


    const {data, loading, error} = useSelector((state) => state.getUserApiReducer);
    const {data: allHotels, loading: allHotelsLoading, error: allHotelsError} =
        useSelector((state) => state.getAllHotelsApiReducer);
    const {data: allTravelCards, loading: allTravelCardsLoading, error: allTravelCardsError} =
        useSelector((state) => state.getHotelTravelCardsApiReducer);
    const {data: allTravelOptions, loading: allTravelOptionsLoading, error: allTravelOptionsError} =
        useSelector((state) => state.getHotelTravelOptionsApiReducer);
    const {data: searchPackages, loading: searchPackagesLoading, error: searchPackagesError} =
        useSelector((state) => state.searchPackagesApiSliceReducer);
    const {data: createPaymentLink, loading: createPaymentLinkLoading, error: createPaymentLinkError} =
        useSelector((state) => state.createPaymentLinkApiSliceReducer);
    const {data: travelForms, loading: travelFormsLoading, error: travelFormsError} =
        useSelector((state) => state.getTravelFormsApiReducer);
    const {data: landOptions, loading: landOptionsLoading, error: landOptionsError} =
        useSelector((state) => state.getLandOptionsApiReducer);


    useEffect(() => {
        dispatch(getUserApi())
        dispatch(getAllHotelsApi())
        dispatch(getHotelTravelCardsApi())
        dispatch(getHotelTravelOptionsApi())
        dispatch(searchPackagesApi({search: "UmrahPrime"}))
        dispatch(createPaymentLinkApi({package: "Package1"}))
        dispatch(getTravelFormsApi())
        dispatch(getLandOptionsApi())

        return function cleanup() {
            dispatch(getUserApiReset());
            dispatch(getAllHotelsApiReset());
            dispatch(getHotelTravelCardsApiReset());
            dispatch(getHotelTravelOptionsApiReset());
            dispatch(searchPackagesApiReset());
            dispatch(createPaymentLinkApiReset());
            dispatch(getTravelFormsApiReset());
            dispatch(getLandOptionsApiReset());

        };
    }, []);


    useEffect(() => {
        if (error) {
            if (error === "Please authenticate") {
                removeAccessToken();
                navigate(`/login`);
                dispatch(getUserApiReset());

            }
        }
    }, [data, loading, error]);


    console.log("user profile = ", data);
    console.log("hotels = ", allHotels);
    console.log("travel cards = ", allTravelCards);
    console.log("travel options = ", allTravelOptions);
    console.log("search packages = ", searchPackages);
    console.log("open this link in current tab for payment = ", createPaymentLink?.url);
    console.log("travel forms = ", travelForms);
    console.log("land options = ", landOptions);


    return (
        <Grid container style={{width: "100%", overflow: "hidden"}}>
            {(loading || allHotelsLoading || allTravelCardsLoading || allTravelOptionsLoading
                || searchPackagesLoading || createPaymentLinkLoading || travelFormsLoading || landOptionsLoading) && <Loader/>}

            <Grid container style={{background: "#140442", height: "100vh", position: "absolute"}}></Grid>
            <Grid container style={{background: "#F1F3F8", top: "100vh", height: "100vh", position: "absolute"}}></Grid>


            <Grid container justifyContent={"center"} style={{top: 0, position: "relative"}}>
                <Grid container item xs={10} style={{marginTop: 10}} justifyContent={"space-between"}
                      alignItems={"center"}>
                    <Grid item xs={"auto"}>
                        <img src={LogoImage}/>
                    </Grid>
                    <Grid item xs container justifyContent={"flex-end"}>

                        <Grid item container xs={"auto"} alignItems={"center"}>
                            <Grid item>
                                <img src={UaeCurrencyIcon} style={{width: 24, height: 24}}/>
                            </Grid>
                            <Grid item style={{marginLeft: 5}}>
                                <CustomLabelCurrency text={"AED"} fontWeight={"bold"}/>
                            </Grid>
                            <Grid item style={{marginLeft: 0, marginTop: 2}}>
                                <ArrowDropDownIcon style={{color: "white"}}/>
                            </Grid>
                        </Grid>


                        <Grid item xs={"auto"} container alignItems={"center"} style={{marginLeft: "10px"}}>
                            <Grid item>
                                <img src={EnglandIcon} style={{width: 24, height: 24}}/>
                            </Grid>
                            <Grid item style={{marginLeft: 5}}>
                                <CustomLabelCurrency text={"Eng"} fontWeight={"bold"}/>
                            </Grid>
                            <Grid item style={{marginLeft: 0, marginTop: 2}}>
                                <ArrowDropDownIcon style={{color: "white"}}/>
                            </Grid>
                        </Grid>

                        <Grid item xs={"auto"} container alignItems={"center"} style={{marginLeft: "10px"}}
                              onClick={(e) => navigate('/login')}>
                            <Grid item style={{marginLeft: 5}}>
                                <img src={AvatarLogin} style={{width: 24, height: 24}}/>
                            </Grid>
                            <Grid item style={{marginLeft: 0, marginTop: 2}}>
                                <ArrowDropDownIcon style={{color: "white"}}/>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>


                <Grid item xs={10} container style={{marginTop: "30px"}}>
                    <Grid item xs={"auto"}>
                        <Paper style={{padding: "10px 10px", background: "#A46CEF", borderRadius: "10px"}}>
                            <Grid container alignItems={"center"}>
                                <Grid item>
                                    <HomeIcon style={{color: "white"}}/>
                                </Grid>
                                <Grid item style={{marginLeft: "5px"}}>
                                    <CustomLabelCurrency text={"Home"} fontWeight={"bold"}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={"auto"}>
                        <Paper style={{
                            padding: "10px 10px", background: "transparent", borderRadius: "10px", marginLeft: "20px",
                            border: '1px solid #A46CEF', opacity: 0.9
                        }}>
                            <Grid container alignItems={"center"}>
                                <Grid item>
                                    <Inventory2OutlinedIcon style={{color: "white"}}/>
                                </Grid>
                                <Grid item style={{marginLeft: "5px"}}>
                                    <CustomLabelCurrency text={"Umrah Packages"} fontWeight={"bold"}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>


                <Grid item container xs={10} style={{marginTop: "30px"}}>
                    <Grid item container>
                        <CustomLabelHeaderLarge text={"Let us take you .... there."} color={"white"}/>
                    </Grid>
                    <Grid item container>
                        <CustomLabelHeaderLarge text={"Embark on your journey with our affordable packages."}
                                                color={"white"}/>
                    </Grid>

                </Grid>


                <Grid item container xs={10} style={{marginTop: "30px"}}>
                    <Filter/>
                </Grid>


                <Grid item xs={10} container style={{marginTop: "50px", paddingBottom: "20px"}}>
                    <Carousel responsive={responsive}
                              containerClass="carousel-container"
                              itemClass="carousel-item"
                              infinite={true}
                              arrows={false}
                    >
                        <Paper style={{borderRadius: "10px"}}>
                            <Grid container>
                                <Grid item xs={12} style={{height: "80%"}}>
                                    <img src={SampleImage}
                                         style={{width: "100%", height: "100%", borderRadius: "10px"}}/>
                                </Grid>
                                <Grid item container style={{padding: "5px 10px"}}>
                                    <CustomLabelCardHeader color={"black"}
                                                           text={"Umrah Pilgrimage - Concludes in Madinah"}
                                                           fontWeight={"bold"}/>
                                </Grid>
                                <Grid item container style={{padding: "5px 10px"}}>
                                    <div style={{background: "#FFE8EE", padding: "3px 10px", borderRadius: 10}}>
                                        <Grid container alignItems={"center"}>
                                            <FlagIcon style={{color: "#FF678C"}}/>
                                            <CustomLabelCurrency text={"Popular"} fontWeight={"bold"}
                                                                 color={"#FF678C"}/>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item container style={{padding: "5px 10px"}}>
                                    <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Makkah 1N"}
                                                                fontWeight={"bold"}/>
                                    <span style={{marginLeft: 10}}></span>
                                    <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Madinah 1N"}
                                                                fontWeight={"bold"}/>
                                </Grid>


                                <Grid item container style={{padding: "5px 10px"}} spacing={2}>
                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <FlightIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Flights"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>


                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <DirectionsCarFilledIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Transfers"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>


                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <HotelIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Flights"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>


                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <LocalActivityIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Activities"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>

                                    <Divider style={{width: "100%", marginTop: "20px"}}/>


                                    <Grid item container style={{padding: "15px"}} justifyContent={"space-between"}>
                                        <Grid item xs={"auto"}>
                                            <Grid item container alignItems={"center"} spacing={1}>
                                                <Grid item>
                                                    <CustomLabelCardHeaderSmall color={"black"} text={"AED"}
                                                                                fontWeight={"bold"}/>
                                                </Grid>
                                                <Grid item>
                                                    <CustomLabelCardHeader color={"black"} text={"3162.53"}
                                                                           fontWeight={"bold"}/>
                                                </Grid>
                                            </Grid>
                                            <Grid item container>
                                                <CustomLabelCurrency color={"#A0A7B5"} text={"Starting from"}
                                                                     fontWeight={"bold"}/>
                                            </Grid>
                                            <Grid item container>
                                                <CustomLabelCurrency color={"#A0A7B5"}
                                                                     text={"Per person on twin sharing"}
                                                                     fontWeight={"bold"}/>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={5} item container alignItems={"flex-end"}
                                              onClick={(e) => navigate("/package/id/details")}>
                                            <CustomButtonLarge text={"View Detail"} background={"#37386C"}
                                                               borderRadius={15}/>
                                        </Grid>
                                    </Grid>

                                </Grid>

                            </Grid>
                        </Paper>


                        <Paper style={{borderRadius: "10px"}}>
                            <Grid container>
                                <Grid item xs={12} style={{height: "80%"}}>
                                    <img src={SampleImage}
                                         style={{width: "100%", height: "100%", borderRadius: "10px"}}/>
                                </Grid>
                                <Grid item container style={{padding: "5px 10px"}}>
                                    <CustomLabelCardHeader color={"black"}
                                                           text={"Umrah Pilgrimage - Concludes in Madinah"}
                                                           fontWeight={"bold"}/>
                                </Grid>
                                <Grid item container style={{padding: "5px 10px"}}>
                                    <div style={{background: "#FFE8EE", padding: "3px 10px", borderRadius: 10}}>
                                        <Grid container alignItems={"center"}>
                                            <FlagIcon style={{color: "#FF678C"}}/>
                                            <CustomLabelCurrency text={"Popular"} fontWeight={"bold"}
                                                                 color={"#FF678C"}/>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item container style={{padding: "5px 10px"}}>
                                    <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Makkah 1N"}
                                                                fontWeight={"bold"}/>
                                    <span style={{marginLeft: 10}}></span>
                                    <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Madinah 1N"}
                                                                fontWeight={"bold"}/>
                                </Grid>


                                <Grid item container style={{padding: "5px 10px"}} spacing={2}>
                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <FlightIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Flights"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>


                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <DirectionsCarFilledIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Transfers"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>


                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <HotelIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Flights"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>


                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <LocalActivityIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Activities"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>

                                    <Divider style={{width: "100%", marginTop: "20px"}}/>


                                    <Grid item container style={{padding: "15px"}} justifyContent={"space-between"}>
                                        <Grid item xs={"auto"}>
                                            <Grid item container alignItems={"center"} spacing={1}>
                                                <Grid item>
                                                    <CustomLabelCardHeaderSmall color={"black"} text={"AED"}
                                                                                fontWeight={"bold"}/>
                                                </Grid>
                                                <Grid item>
                                                    <CustomLabelCardHeader color={"black"} text={"3162.53"}
                                                                           fontWeight={"bold"}/>
                                                </Grid>
                                            </Grid>
                                            <Grid item container>
                                                <CustomLabelCurrency color={"#A0A7B5"} text={"Starting from"}
                                                                     fontWeight={"bold"}/>
                                            </Grid>
                                            <Grid item container>
                                                <CustomLabelCurrency color={"#A0A7B5"}
                                                                     text={"Per person on twin sharing"}
                                                                     fontWeight={"bold"}/>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={5} item container alignItems={"flex-end"}
                                              onClick={(e) => navigate("/package/id/details")}>
                                            <CustomButtonLarge text={"View Detail"} background={"#37386C"}
                                                               borderRadius={15}/>
                                        </Grid>
                                    </Grid>

                                </Grid>

                            </Grid>
                        </Paper>


                        <Paper style={{borderRadius: "10px"}}>
                            <Grid container>
                                <Grid item xs={12} style={{height: "80%"}}>
                                    <img src={SampleImage}
                                         style={{width: "100%", height: "100%", borderRadius: "10px"}}/>
                                </Grid>
                                <Grid item container style={{padding: "5px 10px"}}>
                                    <CustomLabelCardHeader color={"black"}
                                                           text={"Umrah Pilgrimage - Concludes in Madinah"}
                                                           fontWeight={"bold"}/>
                                </Grid>
                                <Grid item container style={{padding: "5px 10px"}}>
                                    <div style={{background: "#FFE8EE", padding: "3px 10px", borderRadius: 10}}>
                                        <Grid container alignItems={"center"}>
                                            <FlagIcon style={{color: "#FF678C"}}/>
                                            <CustomLabelCurrency text={"Popular"} fontWeight={"bold"}
                                                                 color={"#FF678C"}/>
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid item container style={{padding: "5px 10px"}}>
                                    <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Makkah 1N"}
                                                                fontWeight={"bold"}/>
                                    <span style={{marginLeft: 10}}></span>
                                    <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Madinah 1N"}
                                                                fontWeight={"bold"}/>
                                </Grid>


                                <Grid item container style={{padding: "5px 10px"}} spacing={2}>
                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <FlightIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Flights"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>


                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <DirectionsCarFilledIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Transfers"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>


                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <HotelIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Flights"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>


                                    <Grid item xs={"auto"} container alignItems={"center"}>
                                        <Grid item>
                                            <LocalActivityIcon style={{color: "#A0A7B5"}}/>
                                        </Grid>
                                        <Grid item style={{marginLeft: "5px"}}>
                                            <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"Activities"}
                                                                        fontWeight={"bold"}/>

                                        </Grid>
                                    </Grid>

                                    <Divider style={{width: "100%", marginTop: "20px"}}/>


                                    <Grid item container style={{padding: "15px"}} justifyContent={"space-between"}>
                                        <Grid item xs={"auto"}>
                                            <Grid item container alignItems={"center"} spacing={1}>
                                                <Grid item>
                                                    <CustomLabelCardHeaderSmall color={"black"} text={"AED"}
                                                                                fontWeight={"bold"}/>
                                                </Grid>
                                                <Grid item>
                                                    <CustomLabelCardHeader color={"black"} text={"3162.53"}
                                                                           fontWeight={"bold"}/>
                                                </Grid>
                                            </Grid>
                                            <Grid item container>
                                                <CustomLabelCurrency color={"#A0A7B5"} text={"Starting from"}
                                                                     fontWeight={"bold"}/>
                                            </Grid>
                                            <Grid item container>
                                                <CustomLabelCurrency color={"#A0A7B5"}
                                                                     text={"Per person on twin sharing"}
                                                                     fontWeight={"bold"}/>
                                            </Grid>
                                        </Grid>
                                        <Grid xs={5} item container alignItems={"flex-end"}
                                              onClick={(e) => navigate("/package/id/details")}>
                                            <CustomButtonLarge text={"View Detail"} background={"#37386C"}
                                                               borderRadius={15}/>
                                        </Grid>
                                    </Grid>

                                </Grid>

                            </Grid>
                        </Paper>

                    </Carousel>
                </Grid>

                <Grid item xs={10} container
                      style={{padding: "20px", marginTop: "20px", background: "#140442", borderRadius: "10px"}}
                      justifyContent={"space-between"}>
                    <Grid item xs={9}>
                        <CustomLabelCardHeader
                            text={"We are an accredited NUSUK partner with experience of servicing more than 4 Million Umrah pilgrims through our platforms."}
                            color={"white"}/>
                    </Grid>
                    <Grid item xs container justifyContent={"center"} alignItems={"center"} spacing={1}>
                        <Grid item container justifyContent={"center"}>
                            <CustomLabelCurrency text={"Accredited By NUSUK"} fontWeight={"bold"}/>
                        </Grid>
                        <Grid item>
                            <img src={MinistryIcon}/>
                        </Grid>
                        <Grid item style={{height: "60%"}}>
                            <Divider orientation="vertical" flexItem style={{height: "100%", background: "#F1F3F8"}}/>
                        </Grid>
                        <Grid item>
                            <img src={NusukIcon}/>
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item xs={12} container style={{background: "white", marginTop: "40px"}} justifyContent={"center"}>
                    <Grid item xs={10} container justifyContent={"space-between"} style={{padding: "40px 0px"}}>
                        <Grid item container xs={"auto"} direction={"column"}>
                            <Grid item>
                                <img src={LogoLargeIcon} style={{width: "180px"}}/>
                            </Grid>
                            <Grid item container spacing={1} style={{marginTop: "5px"}}>
                                <Grid item>
                                    <img src={MinistryIcon}/>
                                </Grid>
                                <Grid item style={{height: "100%"}}>
                                    <Divider orientation="vertical" flexItem
                                             style={{height: "100%", background: "#F1F3F8"}}/>
                                </Grid>
                                <Grid item>
                                    <img src={NusukIcon}/>
                                </Grid>
                            </Grid>
                            <Grid item style={{marginTop: "5px"}}>
                                <img src={SisaLogoIcon} style={{width: "70px"}}/>
                            </Grid>

                            <Grid item container spacing={1} alignItems={"center"} style={{marginTop: "5px"}}>
                                <Grid item>
                                    <img src={ApplePayIcon}/>
                                </Grid>
                                <Grid item style={{height: "100%"}}>
                                    <Divider orientation="vertical" flexItem
                                             style={{height: "100%", background: "#F1F3F8"}}/>
                                </Grid>
                                <Grid item>
                                    <img src={MasterCardIcon}/>
                                </Grid>
                                <Grid item style={{height: "100%"}}>
                                    <Divider orientation="vertical" flexItem
                                             style={{height: "100%", background: "#F1F3F8"}}/>
                                </Grid>
                                <Grid item>
                                    <img src={PaypalIcon}/>
                                </Grid>
                            </Grid>

                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCurrency text={"Contact Us"} color={"black"} fontWeight={"bold"}/>
                            </Grid>
                            <Grid item style={{marginTop: "5px"}} container>
                                <CustomLabelCurrency text={"Call Us: "} color={"black"}/>
                                <CustomLabelCurrency text={"+971 42457300"} color={"#494b90"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCurrency text={"Traveazy DMCC (Registered Office), Unit No."}
                                                     color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "0px"}}>
                                <CustomLabelCurrency text={"1503, Swiss Tower, Cluster-Y, JLT, Dubai UAE."}
                                                     color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "0px"}}>
                                <CustomLabelCurrency text={"P.O. Box no. 938533"} color={"black"} fontWeight={"bold"}/>
                            </Grid>
                        </Grid>

                        <Grid item container xs={"auto"} direction={"column"}>
                            <Grid item>
                                <CustomLabelCurrency text={"Quick Links"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCurrency text={"Home"} color={"#78829D"}/>
                            </Grid>


                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCurrency text={"Privacy Policy"} color={"#78829D"}/>
                            </Grid>


                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCurrency text={"FAQS"} color={"#78829D"}/>
                            </Grid>


                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCurrency text={"Contact Us"} color={"#78829D"}/>
                            </Grid>


                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCurrency text={"Terms Of Use"} color={"#78829D"}/>
                            </Grid>

                        </Grid>


                        <Grid item container xs={"auto"} direction={"column"}>
                            <Grid item>
                                <CustomLabelCurrency text={"Company"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCurrency text={"Blogs"} color={"#78829D"}/>
                            </Grid>


                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCurrency text={"About Us"} color={"#78829D"}/>
                            </Grid>


                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCurrency text={"Carrer"} color={"#78829D"}/>
                            </Grid>


                        </Grid>


                        <Grid item container xs={"auto"} direction={"column"}>
                            <Grid item>
                                <CustomLabelCurrency text={"Resources"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCurrency text={"Packages"} color={"#78829D"}/>
                            </Grid>


                        </Grid>


                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default Home;
