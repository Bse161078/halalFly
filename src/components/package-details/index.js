import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid/Grid";

import LogoImage from "src/assets/images/logo.png";
import UaeCurrencyIcon from "src/assets/images/uae-icon.png";
import EnglandIcon from "src/assets/images/england.png";
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
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {StaticDatePicker, DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LanguageIcon from '@mui/icons-material/Language';
import {CustomButtonLarge} from "../common/CustomButton";

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


        const dates = generateRandomDates(2);
        setAvailableDates(dates);
    };

    const generateRandomDates = () => {
        let dates = [];
        let currentDate = new Date();
        let endDate = new Date("2024-12-31");

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Limit dates to 5 per month
        const limitedDates = dates.reduce((acc, date) => {
            const monthYear = `${date.getMonth()}-${date.getFullYear()}`;
            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            if (acc[monthYear].length < 5) {
                acc[monthYear].push(date.toISOString().split("T")[0]);
            }
            return acc;
        }, {});

        return Object.values(limitedDates).flat();
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
        <Grid container style={{width: "100%", overflow: "hidden"}}>

            {/*<Grid container style={{background: "#140442", height: "100vh", position: "absolute"}}></Grid>*/}
            {/*<Grid container style={{background: "#F1F3F8", top: "100vh", height: "100vh", position: "absolute"}}></Grid>*/}


            <Grid container justifyContent={"center"}
                  style={{top: 0, position: "relative", padding: "20px", background: "#140442"}}>
                <Grid container item xs={10} style={{marginTop: 10}} justifyContent={"space-between"}
                      alignItems={"center"}>
                    <Grid item xs={"auto"} container spacing={3} alignItems={"center"}>
                        <Grid item>
                            <img src={LogoWithoutDesc}/>
                        </Grid>
                        <Grid item>
                            <CustomLabelCurrency color={"White"}
                                                 text={"Home"}
                                                 fontWeight={"bold"}/>
                        </Grid>
                        <Grid item>
                            <CustomLabelCurrency color={"White"}
                                                 text={"Packages"}
                                                 fontWeight={"bold"}/>
                        </Grid>
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

                        <Grid item xs={"auto"} container alignItems={"center"} style={{marginLeft: "10px"}}>
                            <Grid item style={{marginLeft: 5}}>
                                <img src={AvatarLogin} style={{width: 24, height: 24}}/>
                            </Grid>
                            <Grid item style={{marginLeft: 0, marginTop: 2}}>
                                <ArrowDropDownIcon style={{color: "white"}}/>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>


            <Grid container justifyContent={"center"}
                  style={{padding: "20px", position: "relative", background: "#F1F3F8"}}>

                <Grid item xs={10} container>
                    <Grid item>
                        <CustomLabelHeaderLarge text={"Umrah Pilgrimage - Concludes in Madinah"}
                                                color={"black"}/>

                    </Grid>

                    <Grid item container style={{marginTop: "20px"}}>

                        <div style={{padding: "5px 10px", background: "#E6E1F2", borderRadius: "10px"}}>
                            <CustomLabelCardHeaderSmall color={"#494B90"} text={"Makkah 1N"}
                                                        fontWeight={"bold"}/>
                        </div>
                        <span style={{marginLeft: 10}}></span>
                        <div style={{padding: "5px 10px", background: "#E6E1F2", borderRadius: "10px"}}>
                            <CustomLabelCardHeaderSmall color={"#494B90"} text={"Madinah 1N"}
                                                        fontWeight={"bold"}/>
                        </div>

                        <span style={{marginLeft: 10}}></span>

                        <div style={{padding: "5px 10px", background: "#494B90", borderRadius: "10px"}}>
                            <CustomLabelCardHeaderSmall color={"white"} text={"2 Nights 3 Days"}
                                                        fontWeight={"bold"}/>
                        </div>
                    </Grid>

                </Grid>

            </Grid>


            <Grid container justifyContent={"center"}
                  style={{padding: "20px", position: "relative", background: "#140442"}}>

                <Grid item xs={10} container alignItems={"center"}>
                    <Grid item xs={2.5} style={{background: "#37386C", padding: "10px", borderRadius: "10px"}}>
                        <CustomLabelCurrency text={"2 Nights"} fontWeight={"bold"}/>
                    </Grid>
                    <Grid item xs={2.5}
                          style={{background: "#37386C", padding: "10px", borderRadius: "10px", marginLeft: "10px"}}>
                        <CustomLabelCurrency text={"3 Star Hotel"} fontWeight={"bold"}/>
                    </Grid>


                    <Grid item xs container>
                        <Grid item container justifyContent={"flex-end"} alignItems={"center"}>
                            <CustomLabelCurrency text={"AED"} fontWeight={"bold"}/>
                            <span style={{marginLeft: "10px"}}/>
                            <CustomLabelHeaderLarge color={"white"}
                                                    text={"2871.70"}
                                                    fontWeight={"bold"}/>
                            <Grid item container justifyContent={"flex-end"} alignItems={"center"}>
                                <CustomLabelCurrency text={"Per person on twin sharing"} fontWeight={"bold"}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>


            <Grid container justifyContent={"center"}
                  style={{padding: "20px", position: "relative", background: "#F1F3F8"}}>

                <Grid item xs={10} container justifyContent={"space-between"}>

                    <Grid item xs={8} container>

                        <Grid container>
                            <Grid item xs={7.5}>
                                <img src={SamplePlaceIcon} style={{width: "100%", borderRadius: "10px"}}/>
                            </Grid>
                            <Grid item xs={3.5} container style={{marginLeft: "10px"}} direction={"column"}>
                                <img src={SamplePlaceIcon} style={{width: "100%", borderRadius: "10px"}}/>
                                <img src={SamplePlaceIcon}
                                     style={{width: "100%", borderRadius: "10px", marginTop: "25px"}}/>
                            </Grid>
                        </Grid>

                        <Grid item container xs={11} justifyContent={"space-between"} style={{marginTop:-20}}>

                            <Grid item container>
                                <CustomLabelCardHeader text={"Features"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item>
                                <Grid container direction={"column"} alignItems={"center"}>
                                    <Grid item>
                                        <FlightIcon style={{color: "#37386C",padding:"10px",borderRadius:"50%",background:"#E6E1F2"}} />
                                    </Grid>
                                    <Grid item>
                                        <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"2 Flights"}
                                                                    fontWeight={"bold"}/>

                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid item>
                                <Grid container direction={"column"} alignItems={"center"}>
                                    <Grid item>
                                        <HotelIcon style={{color: "#37386C",padding:"10px",borderRadius:"50%",background:"#E6E1F2"}} />
                                    </Grid>
                                    <Grid item>
                                        <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"2 Hotels"}
                                                                    fontWeight={"bold"}/>

                                    </Grid>
                                </Grid>

                            </Grid>


                            <Grid item>
                                <Grid container direction={"column"} alignItems={"center"}>
                                    <Grid item>
                                        <DirectionsCarFilledIcon style={{color: "#37386C",padding:"10px",borderRadius:"50%",background:"#E6E1F2"}} />
                                    </Grid>
                                    <Grid item>
                                        <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"1 Transfers"}
                                                                    fontWeight={"bold"}/>

                                    </Grid>
                                </Grid>

                            </Grid>


                            <Grid item>
                                <Grid container direction={"column"} alignItems={"center"}>
                                    <Grid item>
                                        <LocalActivityIcon style={{color: "#37386C",padding:"10px",borderRadius:"50%",background:"#E6E1F2"}} />
                                    </Grid>
                                    <Grid item>
                                        <CustomLabelCardHeaderSmall color={"#A0A7B5"} text={"1 Activities"}
                                                                    fontWeight={"bold"}/>

                                    </Grid>
                                </Grid>

                            </Grid>


                        </Grid>

                    </Grid>
                    <Grid item xs={4} style={{background:"white"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDatePicker
                                slots={{
                                    day: Day,
                                }}
                                slotProps={{
                                    day: {
                                        highlightedDays: availableDates,
                                    },
                                }}
                                label="Select Date"

                                shouldDisableDate={(date) => !availableDates.includes(dayjs(date).format("YYYY-MM-DD"))}
                                renderInput={(params) => <TextField {...params} />}/>
                        </LocalizationProvider>

                        <Grid item container style={{marginTop:"10px",padding:"10px"}}>
                            <Grid item>
                                <CustomLabelXSmall color={"#FFAF46"} text={"Note: The price displayed may change based on availability and occupancy\n"}
                                                            fontWeight={"bold"}/>
                            </Grid>
                            <Grid item container style={{marginTop:"10px"}}
                                  onClick={(e)=>window.open("https://buy.stripe.com/test_14k16v0WT0he21a9AG","_self")}

                            >
                                <CustomButtonLarge text={"Buy Package"} background={"#37386C"}
                                                   borderRadius={15}
                                />

                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>

            </Grid>

        </Grid>
    )
}

export default PackageDetails;
