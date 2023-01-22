import {useLocation, useNavigate, Outlet} from "react-router-dom"
import {useEffect} from "react";
import React from "react";
import {getAccessToken, getToken} from "../../utils";


const Navigation = () => {
    const location = useLocation().pathname;
    let navigate = useNavigate();


    const token = getAccessToken();

    useEffect(() => {
        if (token && token.length > 0) {
            navigate(`/home`,{replace:true});
        } else {
            navigate(`/login`,{replace:true});
        }
    }, []);


    return (
        <>
            <div style={{position: 'relative',width:"100vw",height:"100vh",background: "white"}}>
                <Outlet/>
            </div>
        </>
    )
}

export default Navigation;