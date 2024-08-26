import React from "react";
import {makeStyles} from "@mui/styles";
import TextField from "@mui/material/TextField/TextField";
import MuiPhoneNumber from "mui-phone-number";


const useStyles = makeStyles(() => ({

    root: {
        color:"white",
        "& .MuiInputBase-root": {
            background: "transparent",
            borderRadius:"20px",
        },

        "& .MuiInputLabel-standard": {
            color: "black",
            fontSize:"21px",
            padding:"2px"

        },
    },
    rootWhite: {
        color:"black",
        "& .MuiInputBase-root": {
            background: "transparent",

        },

        "& .MuiInputLabel-standard": {
            color: "black",
            fontSize:"18px"
        },
    },
    rootWhiteFilled: {
        color:"black",
        "& .MuiInputBase-root": {
            background: "transparent",

        },

        "& .MuiInputLabel-standard": {
            color: "black",
            fontSize:"18px"
        },
    },
    underline: {
        '&:after': {
            borderBottom: `1.5px solid #424242`,
        },
        '&:before': {
            borderBottom: `1.5px solid #424242`,
        },
        '&:hover': {
            borderBottom: `1px #424242`,
        },
        '&:focused': {
            borderBottom: `1px solid #424242`,
        },

    },
    withoutUnderline: {
        '&:after': {
            borderBottom: `0px solid #424242`,
        },
        '&:before': {
            borderBottom: `0px solid #424242`,
        },
        '&:hover': {
            borderBottom: `0px #424242`,
        },
        '&:focused': {
            borderBottom: `0px solid #424242`,
        },

    }

}));





const CustomTextField = (props) => {
    const classes = useStyles();

    return (
        <TextField
            fullWidth
            onChange={props.onChange}
            className={classes.root}
            label={props.label}
            value={props.value && (props.value).length > 0 ? props.value : ''}
            type={props.type}
            helperText={props.helperText}
            error={props.error}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
            autoComplete="new-password"
            inputRef={props.params && props.params.inputRef}
            InputProps={{
                 sx:{color:"black"},classes: {underline: classes.underline}, ...props.otherInputProps
            }}


        />
    )
}



const CustomTextMultipleField = (props) => {
    const classes = useStyles();

    return (
        <TextField
            fullWidth
            variant={"standard"}
            onChange={props.onChange}
            className={classes.root}
            label={props.label}
            value={props.value && (props.value).length > 0 ? props.value : ''}
            type={props.type}
            helperText={props.helperText}
            error={props.error}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
            autoComplete="new-password"
            inputRef={props.params && props.params.inputRef}
            rows={3}
            multiline={true}
            InputProps={{
                sx:{color:"black"},classes: {underline: classes.underline}, ...props.otherInputProps
            }}


        />
    )
}


const CustomTextFieldWhite = (props) => {
    const classes = useStyles();

    return (
        <TextField
            fullWidth
            variant={"standard"}
            onChange={props.onChange}
            className={classes.rootWhite}
            label={props.label}
            value={props.value && (props.value).length > 0 ? props.value : ''}
            type={props.type}
            helperText={props.helperText}
            error={props.error}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
            placeholder={props.placeholder}
            autoComplete='off'
            inputRef={props.params && props.params.inputRef}
            InputProps={{
                sx:{color:"black",background:"red"},disableUnderline: true,classes: {underline: classes.withoutUnderline}, ...props.otherInputProps
            }}


        />
    )
}



const CustomTextFilled = (props) => {
    const classes = useStyles();

    return (
        <TextField
            fullWidth
            variant={"standard"}
            onChange={props.onChange}
            className={classes.rootWhiteFilled}
            label={props.label}
            value={props.value && (props.value).length > 0 ? props.value : ''}
            type={props.type}
            helperText={props.helperText}
            error={props.error}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
            placeholder={props.placeholder}
            autoComplete='off'
            inputRef={props.params && props.params.inputRef}
            InputProps={{
                sx:{color:"black",background:"white"},disableUnderline: true,classes: {underline: classes.withoutUnderline}, ...props.otherInputProps
            }}


        />
    )
}




const CustomPhoneNumber = (props) => {
    const classes = useStyles();

    return (



        <MuiPhoneNumber
            fullWidth
            onChange={props.onChange}
            className={classes.root}
            label={props.label}
            value={props.value && (props.value).length > 0 ? props.value : ''}
            type={props.type}
            helperText={props.helperText}
            error={props.error}
            disabled={props.disabled}
            autoFocus={props.autoFocus}
            autoComplete="new-password"
            inputRef={props.params && props.params.inputRef}
            InputProps={{
                sx:{color:"black"},classes: {underline: classes.underline}, ...props.otherInputProps
            }}

            defaultCountry={'us'}

        />
    )
}


export {CustomTextField,CustomTextFieldWhite,CustomTextFilled,CustomTextMultipleField,CustomPhoneNumber};
