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
                        <Routes>
                            <Route path="/" element={<Navigation/>}>
                                <Route path="login" element={<Login/>}/>
                                <Route path="home" element={<Home/>}>
                                    <Route path="dashboard" element={<Stats/>}/>
                                    <Route path="user" element={<Users/>}/>
                                    <Route path="waiver" element={<Waivers/>}/>
                                    <Route path="experience" element={<Experiences/>}/>
                                    <Route path="group" element={<Groups/>}/>
                                    <Route path="game-master" element={<GameMasters/>}/>
                                    <Route path="privacy-policy" element={<StaticDataEditor type={"privacy_policy"}/>}/>
                                    <Route path="package" element={<Package/>}>
                                        <Route path="list" element={<ListPackages/>}/>
                                        <Route path="add" element={<AddPackage/>}/>
                                        <Route path="update" element={<UpdatePackage/>}/>
                                    </Route>

                                    <Route path="reward" element={<Reward/>}>
                                        <Route path="list" element={<ListReward/>}/>
                                        <Route path="add" element={<AddReward/>}/>
                                    </Route>



                                </Route>
                            </Route>
                        </Routes>
                    </Router>
                </Provider>
            </ThemeProvider>
        </>
    );
}

export default App;
