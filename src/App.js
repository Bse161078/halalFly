import logo from './logo.svg';
import 'src/App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import Navigation from "src/components/navigation";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import Login from "src/components/login";
import Home from "src/components/home";
import {store} from "src/store/store";
import {Provider} from 'react-redux'
import 'src/assets/css/index.css'

import PackageDetails from "./components/package-details";
import Register from "./components/register";
import { CssBaseline, Box } from "@mui/material";
import HotelList from './components/LandPackages/LandPackages';
import ContactUsForm from './components/ContactUs/contactUs';
import LandPackageCardDetails from './components/LandPackageCardDetails'
import UmrahPackageDetails from './components/UmrahPackageCardDetails';
import BookingForm from './components/BookingDetails';
import BusinessCollaborationForm from './components/BuisnessCollaborationForm'

const theme = createTheme({
    palette: {
        primary: {
            main: '#004E8C', // Dark blue for the header and footer
        },
        secondary: {
            main: '#FAF3E0', // Light beige for the background sections
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 450,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    typography: {
        fontFamily: 'Inter-Regular', // Assuming 'Inter-Regular' is used in the Figma design
    },
});




function App() {
    return (
        <>
           <ThemeProvider theme={theme}>
            
      <Provider store={store}>
        <Router>
          {/* MUI's Box for styling */}
          <Box sx={{ backgroundColor: 'white', minHeight: '100vh', paddingBottom: '20px' }}>
            <CssBaseline /> {/* Ensures consistent padding/margin resets */}
            <Routes>
              <Route path="/" element={<Navigation />}>
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="package/:id/details" element={<PackageDetails />} />
                <Route path="hotels" element={<HotelList />} />
                <Route path="get-in-touch" element={<ContactUsForm />} />
                <Route path="land-package/:packageId/details" element={<LandPackageCardDetails />} />
                <Route path="umrah-package/:packageId/details" element={<UmrahPackageDetails />} />
                <Route path="booking-details" element={<BookingForm />} />
                <Route path="business-collaboration" element={<BusinessCollaborationForm />} />

              </Route>
            </Routes>
          </Box>
        </Router>
      </Provider>
    </ThemeProvider>
        </>
    );
}

export default App;