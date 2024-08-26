import Typography from "@mui/material/Typography/Typography";
import Grid from "@mui/material/Grid/Grid";
import React from "react";



const CustomLabelHeaderLogin = (props) => {
    return (
        <Typography
            sx={{
                fontSize: {xs:"1.2em",md:"1.2em",lg:"2em"},
                color: props.color?props.color:'black',
                fontFamily: 'Inter-Regular',
                fontWeight:props.fontWeight
            }}>
            {props.text}
        </Typography>
    )
}

const CustomLabelHeader = (props) => {
    return (
        <Typography
            sx={{
                fontSize: {xs:"0.5rem",sm:"0.8rem",md:"1.2rem",lg:"1.2rem"},
                color: props.color?props.color:'black',
                fontFamily: 'Inter-Regular',
                fontWeight:props.fontWeight
            }}>
            {props.text}
        </Typography>
    )
}

const CustomLabelHeaderLarge = (props) => {
    return (
        <Typography
            sx={{
                fontSize: {xs:"1.5rem",sm:"3rem",md:"2rem",lg:"2rem"},
                color: props.color?props.color:'black',
                fontFamily: 'Inter-Regular',
                fontWeight: "bold",
                lineHeight:props.lineHeight?props.lineHeight:"normal"
            }}>
            {props.text}
        </Typography>
    )
}



const CustomLabelTimer = (props) => {
    return (
        <Typography
            sx={{
                fontSize:{xs:"12px",md:"18px"}
            }}
            style={{
                color: '#333333',
                fontWeight: "bold",
                textDecoration: "underline",
                fontFamily: 'Inter-Regular',
                marginLeft: 6,
                marginBottom: 5,
            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelNormal20 = (props) => {
    return (
        <Typography
            style={{
                fontSize: "20px",
                color: '#333333',
                fontFamily: 'Inter-Regular',
                marginLeft: 10,
                marginBottom: 5,
                fontWeight:props.fontWeight
            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelNormal13 = (props) => {
    return (
        <Typography
            sx={{
                fontSize:{xs:"10px",sm:"13px",md:"15px",lg:"18px"},
            }}
            style={{
                color: props.color ? props.color : '#BABABA',
                fontFamily: 'Inter-Regular',
                marginLeft: props.widthoutMargin ? 0 : 10,
                fontWeight: props.fontWeight && props.fontWeight
            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelNormalBold20 = (props) => {
    return (
        <Typography
            sx={{
                fontSize: {xs:"10px",sm:"12px",md:"20px"},
            }}
            style={{
                color: props.color ? props.color : '#333333',
                fontFamily: 'Inter-Regular',
                lineHeight:"normal",
                marginLeft: props.widthoutMargin?0:10,
                marginBottom: 5,
                fontWeight:props.fontWeight?props.fontWeight:"bold",
                cursor: "pointer",
                background:props.background,
                textAlign:props.textAlign,
                letterSpacing:props.letterSpacing?props.letterSpacing:"normal"
            }}>
            {props.text}
        </Typography>
    )
}



const CustomLabelPop20 = (props) => {
    return (
        <Typography
            sx={{
                fontSize: {xs:"12px",md:"18px"},
            }}
            style={{
                width:"100%",
                color: props.color ? props.color : '#333333',
                fontFamily: 'Inter-Regular',
                marginLeft: props.widthoutMargin?0:10,
                fontWeight: "bold",
                cursor: "pointer",
                background:props.background
            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelNormalBold26 = (props) => {
    return (
        <Typography
            sx={{
                fontSize: {xs:"13px",sm:"15px",md:"22px",lg:"26px"},
            }}
            style={{
                color: props.color?props.color:'black',
                fontFamily: 'Inter-Regular',
                fontWeight: "bold",
                cursor: "pointer",
            }}>
            {props.text}
        </Typography>
    )
}



const CustomLabelNormalBoldStats26 = (props) => {
    return (
        <Typography
            sx={{
                fontSize: {xs:"11px",sm:"15px",md:"16px",lg:"18px"},
            }}
            style={{
                color: props.color?props.color:'black',
                fontFamily: 'Inter-Regular',
                fontWeight: "bold",
                cursor: "pointer",
            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelNormal26 = (props) => {
    return (
        <Typography
            sx={{
                fontSize: {xs:"13px",sm:"18px",md:"22px",lg:"26px"},
            }}
            style={{
                color: props.color?props.color:'black',
                fontFamily: 'Inter-Regular',
                cursor: "pointer",
                fontWeight: props.fontWeight,
                textAlign: props.textAlign
            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelNormalBold22 = (props) => {
    return (
        <Typography
            sx={{
                fontSize:{xs:"15px",sm:"18px",md:"18px",lg:"22px"}
            }}
            style={{
                color: props.color ? props.color : 'black',
                fontFamily: 'Inter-Regular',
                fontWeight: "bold",
                cursor: "pointer",
                textAlign: "center",
                padding:props.isTimer && "10px 0px 10px 0px"
            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelNormal22 = (props) => {
    return (
        <Typography
            sx={{
                fontSize: {xs:"15px",sm:"18px",md:"22px"},
            }}
            style={{
                color: 'black',
                fontFamily: 'Inter-Regular',
                cursor: "pointer",
                textAlign: "center"
            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelNormalBold11 = (props) => {
    return (
        <Typography
            style={{
                fontSize: "11px",
                color: props.color?props.color:'black',
                fontFamily: 'Inter-Regular',
                fontWeight: "bold",
                cursor: "pointer",
                width: "95%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",

            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelNormal11 = (props) => {
    return (
        <Typography
            style={{
                fontSize: "11px",
                color: props.color?props.color:'black',
                fontFamily: 'Inter-Regular',
                cursor: "pointer",
                width: "90%",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",

            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelStepperActive = (props) => {
    return (
        <Typography
            style={{
                fontSize: "22px",
                color: 'white',
                fontFamily: 'Inter-Regular',
                fontWeight: "bold",
                cursor: "pointer",
                textAlign: "center",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",

            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelStepperNotActive = (props) => {
    return (
        <Typography
            style={{
                fontSize: "22px",
                color: '#959595',
                fontFamily: 'Inter-Regular',
                cursor: "pointer",
                textAlign: "center",
                fontWeight: "bold",
            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelNormal18Register = (props) => {
    return (
        <Typography
            style={{
                fontSize: "18px",
                padding: "0px 5px 0px 5px",
                width: "95%",
                color: '#333333',
                height: "40px",
                textAlign: "center",
                background: "#F0F4F5",
                fontFamily: 'Inter-Regular',
                fontWeight: props.weight,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                visibility: props.hide && "hidden"
            }}>
            {props.text}{props.showMandatory && <span style={{color: "red", fontSize: "14px"}}>*</span>}
        </Typography>
    )
}


const CustomLabelHeader1 = (props) => {
    return (
        <Typography
            sx={{
                fontSize: {xs:"1em",sm:"1.7em"},
            }}
            style={{
                color: props.color?props.color:'black',
                fontFamily: 'Inter-Regular',
                fontWeight: "bold",
                cursor: "pointer",
                textAlign: props.textAlign ? props.textAlign : "left"

            }}>
            {props.text}
        </Typography>
    )
}

const CustomLabel = (props) => {
    return (
        <Typography
            style={{
                fontSize: "1.2em",
                color: 'black',
                fontFamily: 'Inter-Regular',
                cursor: "pointer",
                textAlign: "left"

            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelNormal15 = (props) => {
    return (
        <Typography
            style={{
                fontSize: "15px",
                color: props.color?props.color:'#333333',
                fontFamily: 'Inter-Regular',
                opacity: 0.8,
            }}>
            {props.text}
        </Typography>
    )
}


const CustomLabelReview = (props) => {
    return (
        <>
            <Grid item xs={props.showAnchor ? 10 : 12}>
                <Typography
                    style={{
                        fontSize: "15px",
                        color: '#333333',
                        fontFamily: 'Inter-Regular',
                        marginLeft: props.selectedLanguage && props.selectedLanguage === "eng" && 10,
                        marginRight: props.selectedLanguage && props.selectedLanguage === "urdu" && 10,
                        marginBottom: 5,
                        textAlign: props.selectedLanguage==='urdu'?'right':'left',
                        wordWrap: 'break-word',
                        visibility: props.hide && "hidden",
                        fontWeight:"bold",
                        opacity:1
                    }}>
                    {props.text}
                </Typography>
            </Grid>

        </>
    )
}


const CustomLabelReviewValue = (props) => {
    return (
        <>
            <Grid item xs={props.showAnchor ? 10 : 12}>
                <Typography
                    style={{
                        fontSize: "15px",
                        color: 'black',
                        fontFamily: 'Inter-Regular',
                        marginLeft: props.selectedLanguage && props.selectedLanguage === "eng" && 15,
                        marginRight: props.selectedLanguage && props.selectedLanguage === "urdu" && 15,
                        textAlign: props.selectedLanguage==='urdu'?'right':'left',
                        wordWrap: 'break-word',
                        visibility: props.hide && "hidden",
                        fontWeight:"bold",
                        width:"95%",
                    }}>
                    {props.text}
                </Typography>
            </Grid>
        </>
    )
}


const CustomLabelNormalLanding11 = (props) => {
    return (
        <Typography
            sx={{
                fontSize:{xs:"10px",sm:"15px"}
            }}
            style={{
                color: props.color?props.color:'white',
                fontFamily: 'Inter-Regular',
                cursor: "pointer",
                fontWeight:props.fontWeight?props.fontWeight:"normal",
                lineHeight:"normal"
            }}>
            {props.text}
            {props.children}
        </Typography>
    )
}



const CustomLabelNormalLanding18 = (props) => {
    return (
        <Typography
            style={{
                fontSize: "18px",
                color: 'white',
                fontFamily: 'Inter-Regular',
                cursor: "pointer",
                fontWeight:props.fontWeight && props.fontWeight,
                lineHeight:"normal"
            }}>
            {props.text}
        </Typography>
    )
}









const CustomLabelCurrency = (props) => {
    return (
        <Typography
            sx={{
                fontSize:{xs:"10px",sm:"14px"}
            }}
            style={{
                color: props.color?props.color:'white',
                fontFamily: 'Inter-Regular',
                cursor: "pointer",
                fontWeight:props.fontWeight?props.fontWeight:"normal",
                textAlign:props.textAlign
            }}>
            {props.text}
            {props.children}
        </Typography>
    )
}


const CustomLabelCardHeader = (props) => {
    return (
        <Typography
            sx={{
                fontSize:{xs:"1rem",sm:"1.3rem"}
            }}
            style={{
                color: props.color?props.color:'white',
                fontFamily: 'Inter-Regular',
                cursor: "pointer",
                fontWeight:props.fontWeight?props.fontWeight:"normal",
            }}>
            {props.text}
            {props.children}
        </Typography>
    )
}




const CustomLabelCardHeaderSmall = (props) => {
    return (
        <Typography
            sx={{
                fontSize:{xs:"12px",sm:"14px"}
            }}
            style={{
                color: props.color?props.color:'white',
                fontFamily: 'Inter-Regular',
                cursor: "pointer",
                fontWeight:props.fontWeight?props.fontWeight:"normal",
            }}>
            {props.text}
            {props.children}
        </Typography>
    )
}



const CustomLabelXSmall = (props) => {
    return (
        <Typography
            sx={{
                fontSize:{xs:"10px",sm:"10px"}
            }}
            style={{
                color: props.color?props.color:'white',
                fontFamily: 'Inter-Regular',
                cursor: "pointer",
                fontWeight:props.fontWeight?props.fontWeight:"normal",
            }}>
            {props.text}
            {props.children}
        </Typography>
    )
}

export {
    CustomLabelHeader,
    CustomLabelNormal20,
    CustomLabelNormal13,
    CustomLabelNormalBold20,
    CustomLabelTimer,
    CustomLabelNormalBold26,
    CustomLabelNormal26,
    CustomLabelNormalBold22,
    CustomLabelNormal22,
    CustomLabelNormalBold11,
    CustomLabelNormal11,
    CustomLabelStepperActive,
    CustomLabelStepperNotActive,
    CustomLabelHeaderLarge,
    CustomLabelNormal18Register,
    CustomLabelHeader1,
    CustomLabel,
    CustomLabelNormal15,
    CustomLabelReview,
    CustomLabelPop20,
    CustomLabelNormalLanding11,
    CustomLabelNormalLanding18,
    CustomLabelHeaderLogin,
    CustomLabelNormalBoldStats26,
    CustomLabelReviewValue,
    CustomLabelCurrency,
    CustomLabelCardHeader,
    CustomLabelCardHeaderSmall,
    CustomLabelXSmall
}
