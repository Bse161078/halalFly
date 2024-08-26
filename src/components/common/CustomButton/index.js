import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import Grid from "@mui/material/Grid/Grid";
import React from "react";


const CustomButtonLarge = (props) => {
    return (
        <Button
            disabled={props.disabled}
            sx={{padding:{xs:"10px",sm:"15px"}}}
            style={{
                background: props.background || '#187de4', width: "100%",opacity:props.disabled?0.8:1,
                 borderRadius: props.borderRadius || 40, fontSize: 13, fontWeight: 'bold',
                fontFamily: 'SF UI Text Regular', textTransform: 'none',

            }}
            variant="contained"

        >
            <Typography
                sx={{
                    fontSize: {xs:"0.8em",sm:"1em",md:"1.2em"},
                }}
                style={{
                    color: 'white',
                    fontFamily: 'SF UI Text Bold',
                }}>
                {props.text}
            </Typography></Button>)
}


const CustomButtonBlack = (props) => {
    return (
        <Button
            disabled={props.disabled}

            style={{
                opacity:props.disabled?0.5:1,
                background: 'white', width: "100%",
                padding: 15, borderRadius: 40, fontSize: 13, fontWeight: 'bold',
                border:"3px solid black", fontFamily: 'SF UI Text Regular', textTransform: 'none'
            }}
            variant="contained"
        >
            <Typography
                style={{
                    color: 'black',
                    fontFamily: 'SF UI Text Bold',
                    marginLeft: 10
                }}>
                {props.text}
            </Typography></Button>)
}




const CustomButtonSquare = (props) => {
    return (
        <Button
            disabled={props.disabled}
            style={{
                background: '#0DA151', width: "100%",border:"1px solid #63BEEE",
                padding: 12, borderRadius: 5, fontSize: 13, fontWeight: 'bold',
                fontFamily: 'SF UI Text Regular', textTransform: 'none',
            }}
            variant="contained"

        >
            <Typography
                sx={{
                    fontSize: {xs:"0.8em",sm:"1em",md:"1.2em"},
                }}
                style={{
                    color: 'white',
                    fontFamily: 'SF UI Text Bold',
                }}>
                {props.text}
            </Typography></Button>)
}



const CustomButtonSquareWhite = (props) => {
    return (
        <Button
            disabled={props.disabled}
            style={{
                background: 'white', width: "100%",border:"1px solid #0DA151",
                padding: 12, borderRadius: 5, fontSize: 13, fontWeight: 'bold',
                fontFamily: 'SF UI Text Regular', textTransform: 'none'
            }}
            variant="contained"

        >
            <Typography
                sx={{
                    fontSize: {xs:"0.8em",sm:"1em",md:"1.2em"},
                }}
                style={{
                    color: 'black',
                    fontFamily: 'SF UI Text Bold',
                }}>
                {props.text}
            </Typography></Button>)
}



const CustomButtonSquareSmall = (props) => {
    return (
        <Button
            disabled={props.disabled}
            sx={{
                padding:{xs:"10px",md:"10px"}
            }}
            style={{
                background: props.color || '#0DA151',
                 borderRadius: 10, fontSize: 13, fontWeight: 'bold',
                fontFamily: 'SF UI Text Regular', textTransform: 'none'
            }}
            variant="contained"

        >
            <Typography
                sx={{
                    fontSize:{xs:12,md:12}
                }}
                style={{
                    color: 'white',
                    fontFamily: 'SF UI Text Regular',
                    fontWeight:"bold",
                }}>
                {props.text}
            </Typography>
            {props.children}
        </Button>)
}

export {CustomButtonLarge, CustomButtonBlack,CustomButtonSquare,CustomButtonSquareWhite,CustomButtonSquareSmall}
