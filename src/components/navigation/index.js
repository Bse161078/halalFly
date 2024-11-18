import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import WhatsAppButton from "src/WhatsappButton";
import PlayNaat from '../PlayNaat/index';

const Navigation = () => {
    const location = useLocation().pathname;
    const navigate = useNavigate();
   
    useEffect(() => {
        if (location === "/") {
            navigate('/home');
        }
    }, [location, navigate]); // Dependency array ensures this runs when location or navigate changes
    useEffect(() => {
        // Scroll to the top when location changes
        window.scrollTo(0, 0);
    }, [location]);
    return (
        <>
            <div style={{ position: 'relative', width: "100vw", height: "100vh", background: "white" }}>
                {/* Conditionally pass homePage[0] or null to Header */}
                <Header />
                <Outlet />
                
                <WhatsAppButton />
                <PlayNaat/>
                <Footer />
            </div>
        </>
    );
}

export default Navigation;
