import logo from './logo.svg';
import 'src/App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navigation from "src/components/navigation";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import Login from "src/components/login";
import Home from "src/components/home";
import {store} from "src/store/store";
import {Provider} from 'react-redux'
import 'src/assets/css/index.css'
import Stats from "./components/stats";
import Users from "./components/users";
import Waivers from "./components/waivers";
import Experiences from "./components/experiences";
import Groups from "./components/groups";
import GameMasters from "./components/game-masters";
import StaticDataEditor from "./components/static-data-editor";
import Package from "./components/package";
import ListPackages from "./components/package/ListPackages";
import AddPackage from "./components/package/Add";
import UpdatePackage from "./components/package/Update";
import Reward from "./components/reward";
import ListReward from "./components/reward/List";
import AddReward from "./components/reward/Add";
import PackageDetails from "./components/package-details";
import Register from "./components/register";
import { CssBaseline, Box } from "@mui/material";


const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 450,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});



function App() {
    return (
        <>
           <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          {/* MUI's Box for styling */}
          <Box sx={{ backgroundColor: '#FAF3E0', minHeight: '100vh', paddingBottom: '20px' }}>
            <CssBaseline /> {/* Ensures consistent padding/margin resets */}
            <Routes>
              <Route path="/" element={<Navigation />}>
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="package/:id/details" element={<PackageDetails />} />
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
