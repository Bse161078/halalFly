import React from "react";
import { makeStyles } from "@mui/styles";
import {
  FormControl,
  Select,
  FormHelperText,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  MenuItem,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles(() => ({
  paper: {
    maxHeight: "300px",
  },
}));


const CustomDropdown = (props) => {
  const { onClear } = props;
  const classes = useStyles();

  return (
    <FormControl fullWidth>
      <Select
        MenuProps={{
          classes: {
            paper: classes.paper,
          },
        }}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        style={{
          height: "40px",
          background: "white",
          borderRadius: 5,
          fontSize: 12,
          fontWeight: "bold",
        }}
        disabled={props.disabled}
        multiple={props.multiple}
        autoFocus={props.autoFocus}
        renderValue={
          props.multiple &&
          ((selected) =>
            selected && Array.isArray(selected) && selected.join(","))
        }
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #004e8c", // Custom border color
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#004e8c !important", // Consistent color on focus
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#004e8c !important", // Consistent color on hover
          },
          "& .MuiSelect-select": {
            color: "#004e8c",
            fontSize: props.isMobile ? "0.8rem" : "1rem",
          },
          border: "1px solid #004e8c", // Consistent outer border
          borderRadius: "0px",
        }}
        IconComponent={
          props.showClear &&
          ((props) => (
            <CancelIcon
              style={{ cursor: "pointer", zIndex: 1, marginRight: 5 }}
              onClick={onClear}
            />
          ))
        }
      >
        {props.container}
      </Select>
      {props.showError && (
        <FormHelperText
          style={{
            fontSize: "0.75rem",
            textAlign: "left",
            color: "#d32f2f",
            fontWeight: "400",
          }}
        >
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export { CustomDropdown };



const CustomAccordionDropdown = (props) => {
  const { label, value, name, onChange, options, placeholder, showClear, onClear, showError, error } = props;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${name}-content`}
        id={`${name}-header`}
        sx={{
          "& .MuiAccordionSummary-content": {
            color: "#004e8c",
            fontWeight: "bold",
          },
        }}
      >
        <Typography>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth>
          <Select
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            style={{
              height: "40px",
              background: "white",
              borderRadius: 5,
              fontSize: 12,
              fontWeight: "bold",
            }}
            multiple={props.multiple}
            autoFocus={props.autoFocus}
            renderValue={
              props.multiple &&
              ((selected) =>
                selected && Array.isArray(selected) && selected.join(","))
            }
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #004e8c",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#004e8c !important",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#004e8c !important",
              },
              "& .MuiSelect-select": {
                color: "#004e8c",
                fontSize: props.isMobile ? "0.8rem" : "1rem",
              },
              border: "1px solid #004e8c",
              borderRadius: "0px",
            }}
            IconComponent={
              showClear &&
              ((props) => (
                <CancelIcon
                  style={{ cursor: "pointer", zIndex: 1, marginRight: 5 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                />
              ))
            }
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {showError && (
            <FormHelperText
              style={{
                fontSize: "0.75rem",
                textAlign: "left",
                color: "#d32f2f",
                fontWeight: "400",
              }}
            >
              {error}
            </FormHelperText>
          )}
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export { CustomAccordionDropdown };
