import {useLocation, useNavigate, Outlet} from "react-router-dom"
import {useEffect} from "react";
import React from "react";
import {getAccessToken, getToken} from "../../utils";
import Header from "../Header";
import Footer from "../Footer";


const Navigation = () => {
    const location = useLocation().pathname;
    let navigate = useNavigate();



    useEffect(() => {
        navigate(`/home`);

    }, []);


    return (
        <>
            <Header/>
            <div style={{position: 'relative',width:"100vw",height:"100vh",background: "white"}}>
                <Outlet/>
                <Footer/>
            </div>
        </>
    )
}

export default Navigation;
