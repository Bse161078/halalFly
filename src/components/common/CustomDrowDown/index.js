import TextField from "@mui/material/TextField/TextField";
import Grid from "@mui/material/Grid/Grid";
import React from "react";
import {makeStyles} from "@mui/styles";
import InputMask from "react-input-mask";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import FormControl from "@mui/material/FormControl/FormControl";
import CancelIcon from '@mui/icons-material/Cancel';

const useStyles = makeStyles(() => ({
    notchedOutline: {
        borderWidth: "0px",
        borderColor: "#F1F4F3 !important",
    },
    root: {
        "& .MuiInputBase-root": {
            background: "#F1F4F3",
            height: "40px",
            borderRadius: "5px"
        }
    },


    notchedOutlineSearch: {
        borderWidth: "2px",
        borderColor: "#F1F4F3 !important",
    },
    rootSearch: {
        "& .MuiInputBase-root": {
            height: "40px",
            borderRadius: "20px"
        }
    },
    paper: {
        maxHeight:"300px"
    },

}));

const CustomDropdown = (props) => {
    const {onClear}=props;
    const classes = useStyles();
    return (
        <FormControl fullWidth>
            <InputLabel style={{marginTop: "-8px"}}>{props.placeholder}</InputLabel>
            <Select
                MenuProps={{
                    classes: {
                        paper: classes.paper
                    }
                }}
                value={props.value}
                onChange={props.onChange}
                className={classes.root}
                style={{height: "40px", background: "#F1F4F3", borderRadius: 5, fontSize: 12, fontWeight: "bold"}}
                disabled={props.disabled}
                multiple={props.multiple}
                autoFocus={props.autoFocus}
                renderValue={props.multiple &&((selected) => {
                    return selected && Array.isArray(selected) && selected.join(",")
                })}
                sx={{

                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 0,
                    },
                    '& .MuiList-root':{
                        background:"Red"
                    }
                }}
                IconComponent={props.showClear && ((props) => <CancelIcon
                                                      style={{cursor: "pointer",zIndex:1,marginRight:5,}}
                                                      onClick={onClear}/>)}


            >
                {props.container}
            </Select>
            {props.showError && <FormHelperText
                style={{
                    fontSize: "0.75rem",
                    textAlign: "left",
                    color: "#d32f2f",
                    fontWeight: "400",
                }}>
                {props.error}</FormHelperText>}
        </FormControl>

    )
}


export {CustomDropdown};