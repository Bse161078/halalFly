import {useLocation, useNavigate, Outlet} from "react-router-dom"
import {useEffect} from "react";
import React from "react";
import {getAccessToken, getToken} from "../../utils";


const Navigation = () => {
    const location = useLocation().pathname;
    let navigate = useNavigate();


    const token = getAccessToken();

    useEffect(() => {
        // Only redirect to home if we're at the root path and there's no token
        if (location.pathname === "/" && !token) {
          navigate("/home", { replace: true });
        }
      }, [location, token, navigate]);


    return (
        <>
            <div style={{position: 'relative',width:"100vw",height:"100vh",background: "white"}}>
                <Outlet/>
            </div>
        </>
    )
}

export default Navigation;
