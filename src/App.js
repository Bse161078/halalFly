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
                                <Route path="home" element={<Home/>}/>
                            </Route>
                        </Routes>
                    </Router>
                </Provider>
            </ThemeProvider>
        </>
    );
}

export default App;
