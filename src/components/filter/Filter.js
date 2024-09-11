import React, { useState, useEffect } from "react";
import {
    Box,
    MenuItem,
    TextField,
    Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled } from "@mui/material/styles";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Tooltip from '@mui/material/Tooltip';
import { CustomDropdown } from "../common/CustomDrowDown";
import { CustomLabel } from "../common/CustomLabel";

function Filter({ allTravelOptions }) {
    const [selection, setSelection] = useState({
        first: "",
        city: "",
        package: "",
        room: "",
        date: null,
    });

    const [tripTypes, setTripTypes] = useState([]);
    const [cities, setCities] = useState([]);
    const [packages, setPackages] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);

    useEffect(() => {
        if (allTravelOptions?.length > 0) {
            const uniqueTripTypes = [...new Set(allTravelOptions.map(option => option.tripTypes))].filter(Boolean);
            const uniqueCities = [...new Set(allTravelOptions.map(option => option.city))].filter(Boolean);
            const uniquePackages = [...new Set(allTravelOptions.map(option => option.package))].filter(Boolean);
            const uniqueRooms = [...new Set(allTravelOptions.map(option => option.roomType))].filter(Boolean);

            setTripTypes(uniqueTripTypes);
            setCities(uniqueCities);
            setPackages(uniquePackages);
            setRooms(uniqueRooms);
        }
    }, [allTravelOptions]);

    useEffect(() => {
        if (selection.city && selection.package) {
            updateAvailableDates();
        }
    }, [selection.city, selection.package]);

    useEffect(() => {
        if (selection.room) {
            updateAdultsBasedOnRoom();
        }
    }, [selection.room]);

    const handleSelection = (e, step) => {
        setSelection({ ...selection, [e.target.name]: e.target.value });
    };

    const updateAvailableDates = () => {
        const selectedCity = selection.city;
        const selectedPackage = selection.package;

        if (selectedCity && selectedPackage) {
            const dateSpots = allTravelOptions?.filter(option => option.city === selectedCity && option.package === selectedPackage)
                .flatMap(option => 
                    option.departureDate.map(dateObj => ({
                        date: dateObj.date,
                        spots: dateObj.availableSpots || 0
                    }))
                );

            const uniqueDateSpots = [...new Map(dateSpots.map(d => [d.date, d])).values()];
            setAvailableDates(uniqueDateSpots);
        }
    };

    const updateAdultsBasedOnRoom = () => {
        let adults = "";
        switch (selection.room) {
            case "Single":
                adults = 1;
                break;
            case "Double":
                adults = 2;
                break;
            case "Triple":
                adults = 3;
                break;
            case "Quad":
                adults = "";
                break;
            default:
                adults = "";
        }
        setSelection((prev) => ({ ...prev, adults }));
    };

    const HighlightedDay = styled(PickersDay)(({ theme }) => ({
        "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
        },
    }));

    const Day = (props) => {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
        const dateObj = availableDates.find(d => dayjs(d.date).isSame(day, 'day'));
        const isSelected =
            !props.outsideCurrentMonth &&
            highlightedDays.includes(day.format("YYYY-MM-DD"));

        return (
            <Tooltip
                title={dateObj && dateObj.spots > 0 ? `${dateObj.spots} spots available` : "0 spots available"}
                arrow
                placement="top"
            >
                <HighlightedDay
                    {...other}
                    outsideCurrentMonth={outsideCurrentMonth}
                    day={day}
                    selected={isSelected}
                >
                    {/* Optional: Add any additional styling or content here */}
                </HighlightedDay>
            </Tooltip>
        );
    };

    const renderSelect = (label, name, options, step, disabled) => {
        return (
            <CustomDropdown
                value={selection[name]}
                name={name}
                container={options.map((list) => (
                    <MenuItem key={list} value={list}>
                        <CustomLabel text={list} />
                    </MenuItem>
                ))}
                placeholder={label}
                onChange={(e) => handleSelection(e, step + 1)}
                disabled={disabled}
            />
        );
    };

    return (
        <Grid container spacing={2} justifyContent="center" sx={{ width: "100%", padding: { xs: 1, sm: 2, md: 3 } }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={2}>
                    {renderSelect("Trip Type", "first", tripTypes, 1, false)}
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    {renderSelect("City", "city", cities, 2, !selection.first)}
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    {renderSelect("Package", "package", packages, 3, !selection.city)}
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    {renderSelect("Room Option", "room", rooms, 4, !selection.package)}
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            slots={{
                                day: Day,
                            }}
                            slotProps={{
                                day: {
                                    highlightedDays: availableDates.map(d => d.date),
                                },
                            }}
                            value={selection.date}
                            onChange={(newValue) =>
                                handleSelection({
                                    target: {
                                        name: "date",
                                        value: newValue?.toISOString().split("T")[0],
                                    },
                                }, 5)
                            }
                            sx={{
                                background: "#FAF3E0",
                                borderRadius: "5px",
                                color: "#004225",
                                width: '100%', // Ensure full width on smaller screens
                            }}
                            shouldDisableDate={(date) =>
                                !availableDates.some(d => dayjs(d.date).isSame(date, 'day'))
                            }
                            disabled={!selection.room}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    style={{
                                        height: "40px",
                                        background: "#FFFFFF",
                                        color: "#004225",
                                        borderRadius: "5px",
                                    }}
                                    {...params}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Filter;
