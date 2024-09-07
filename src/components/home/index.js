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
import MyCarousel from "../Mycarousel/myCarousel";


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


    useEffect(() => {

    }, [])

    return (
        <Grid container style={{width: "100%",overflow:"hidden"}}>

<Grid container style={{background: "#004225", height: "100vh", position: "absolute"}}></Grid>
<Grid container style={{background: "#FAF3E0", top: "100vh", height: "100vh", position: "absolute"}}></Grid>

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

                        <Grid item xs={"auto"} container alignItems={"center"} style={{marginLeft: "10px"}} onClick={(e)=>navigate('/login')}>
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
  {/* Home Button */}
  <Grid item xs={"auto"}>
    <Paper style={{
        padding: "10px 10px", 
        background: "#FAF3E0",  // Soft beige background
        borderRadius: "10px", 
        border: '1px solid #004225' // Dark green border
    }}>
      <Grid container alignItems={"center"}>
        <Grid item>
          <HomeIcon style={{color: "#004225"}}/> {/* Dark green icon color */}
        </Grid>
        <Grid item style={{marginLeft: "5px"}}>
          <CustomLabelCurrency text={"Home"} fontWeight={"bold"} color="black" style={{color: "#004225"}}/> {/* Dark green text color */}
        </Grid>
      </Grid>
    </Paper>
  </Grid>

  {/* Umrah Packages Button */}
  <Grid item xs={"auto"}>
    <Paper style={{
        padding: "10px 10px", 
        background: "#FAF3E0",  // Soft beige background
        borderRadius: "10px", 
        marginLeft: "20px",
        border: '1px solid #004225', // Dark green border
        opacity: 0.9
    }}>
      <Grid container alignItems={"center"}>
        <Grid item>
          <Inventory2OutlinedIcon style={{color: "#004225"}}/> {/* Dark green icon color */}
        </Grid>
        <Grid item style={{marginLeft: "5px"}}>
          <CustomLabelCurrency text={"Umrah Packages"} color="black" fontWeight={"bold"} style={{color: "#004225"}}/> {/* Dark green text color */}
        </Grid>
      </Grid>
    </Paper>
  </Grid>

  {/* Hotels Button */}
  <Grid item xs={"auto"}>
    <Paper style={{
        padding: "10px 10px", 
        background: "#FAF3E0",  // Soft beige background
        borderRadius: "10px", 
        marginLeft: "20px",
        border: '1px solid #004225', // Dark green border
        opacity: 0.9
    }}>
      <Grid container onClick={() => navigate('/hotels')}  alignItems={"center"}>
        <Grid item>
          <HotelIcon style={{color: "#004225"}}/> {/* Dark green icon for hotels */}
        </Grid>
        <Grid item style={{marginLeft: "5px"}}>
          <CustomLabelCurrency text={"Hotels"}   color="black" fontWeight={"bold"} style={{color: "#004225"}}  /> {/* Dark green text */}
        </Grid>
      </Grid>
    </Paper>
  </Grid>
</Grid>



                <Grid item container xs={10} style={{marginTop: "30px"}}>
                    <Grid item container>
                        <CustomLabelHeaderLarge text={"Begin your spiritual journey with us."} color={"white"}/>
                    </Grid>
                    <Grid item container>
                        <CustomLabelHeaderLarge text={"Discover our affordable Umrah packages and let us guide you every step of the way."}
                                                color={"white"}/>
                    </Grid>

                </Grid>


                <Grid item container xs={10} style={{marginTop:"30px"}}>
                    <Filter/>
                </Grid>


                <Grid container spacing={2} sx={{ marginTop: "50px" }}>
  
  {/* Carousel Container */}
  <Grid item xs={12} sx={{ height: 'auto', marginBottom: '40px', overflow: 'visible', position: 'relative' }}> 
    <MyCarousel />
  </Grid>

  {/* NUSUK Partner Information */}
  <Grid 
    container 
    sx={{
      padding: "20px",
      background: "#004225",
      borderRadius: "10px",
      color: "white",
      marginTop: '20px',  // Adds spacing between the carousel and this section
      zIndex: 1  // Ensures it does not overlap with the carousel
    }}
    justifyContent="space-between"
  >
    <Grid item xs={12} md={9} sx={{ marginBottom: { xs: '20px', md: 0 } }}>
      <CustomLabelCardHeader
        text="We are an accredited NUSUK partner with experience of servicing more than 4 Million Umrah pilgrims through our platforms."
        color="white"
      />
    </Grid>

    {/* Right Side - Ministry and Nusuk Icons */}
    <Grid 
      item 
      xs={12} 
      md={3} 
      container 
      justifyContent="center" 
      alignItems="center" 
      spacing={1}
      sx={{ gap: { xs: 2, md: 1 } }}
    >
      <Grid item container justifyContent="center">
        <CustomLabelCurrency text="Accredited By NUSUK" fontWeight="bold" color="white" />
      </Grid>

      <Grid item>
        <img src={MinistryIcon} alt="Ministry Icon" style={{ maxWidth: '100%', height: 'auto' }} />
      </Grid>

      <Grid item>
        <Divider orientation="vertical" flexItem sx={{ height: { xs: '40%', md: '60%' }, background: "#F1F3F8" }} />
      </Grid>

      <Grid item>
        <img src={NusukIcon} alt="Nusuk Icon" style={{ maxWidth: '100%', height: 'auto' }} />
      </Grid>
    </Grid>
  </Grid>
</Grid>






                <Grid item xs={12} container style={{background: "#FAF3E0", marginTop: "40px"}} justifyContent={"center"}>
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

                            <Grid item style={{marginTop:"20px"}}>
                                <CustomLabelCurrency text={"Home"} color={"#78829D"} />
                            </Grid>


                            <Grid item style={{marginTop:"20px"}}>
                                <CustomLabelCurrency text={"Privacy Policy"} color={"#78829D"} />
                            </Grid>


                            <Grid item style={{marginTop:"20px"}}>
                                <CustomLabelCurrency text={"FAQS"} color={"#78829D"} />
                            </Grid>


                            <Grid item style={{marginTop:"20px"}}>
                                <CustomLabelCurrency text={"Contact Us"} color={"#78829D"} />
                            </Grid>


                            <Grid item style={{marginTop:"20px"}}>
                                <CustomLabelCurrency text={"Terms Of Use"} color={"#78829D"} />
                            </Grid>

                        </Grid>


                        <Grid item container xs={"auto"} direction={"column"}>
                            <Grid item>
                                <CustomLabelCurrency text={"Company"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop:"20px"}}>
                                <CustomLabelCurrency text={"Blogs"} color={"#78829D"} />
                            </Grid>


                            <Grid item style={{marginTop:"20px"}}>
                                <CustomLabelCurrency text={"About Us"} color={"#78829D"} />
                            </Grid>


                            <Grid item style={{marginTop:"20px"}}>
                                <CustomLabelCurrency text={"Carrer"} color={"#78829D"} />
                            </Grid>


                        </Grid>



                        <Grid item container xs={"auto"} direction={"column"}>
                            <Grid item>
                                <CustomLabelCurrency text={"Resources"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop:"20px"}}>
                                <CustomLabelCurrency text={"Packages"} color={"#78829D"} />
                            </Grid>


                        </Grid>



                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default Home;
