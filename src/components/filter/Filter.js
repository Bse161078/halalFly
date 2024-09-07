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
import { CustomDropdown } from "../common/CustomDrowDown";
import { CustomLabel } from "../common/CustomLabel";

function Filter() {
    const [selection, setSelection] = useState({
        first: "",
        city: "",
        package: "",
        room: "",
        date: null,
    });

    const [availableDates, setAvailableDates] = useState([]);

    const availabilityRules = {
        London: {
            Standard: [6], // Saturdays
            Deluxe: [0, 6], // Sundays and Saturdays
            Premium: [1, 3, 5], // Mondays, Wednesdays, Fridays
        },
        Paris: {
            Standard: [2], // Tuesdays
            Deluxe: [2, 4], // Tuesdays and Thursdays
            Premium: [5, 6], // Fridays and Saturdays
        },
    };

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
            const days = availabilityRules[selectedCity]?.[selectedPackage];
            if (!days) {
                setAvailableDates([]);
                return;
            }

            const dates = generateRandomDates(days);
            setAvailableDates(dates);
        }
    };

    const generateRandomDates = (days) => {
        let dates = [];
        let currentDate = new Date();
        let endDate = new Date("2024-12-31");

        while (currentDate <= endDate) {
            if (days.includes(currentDate.getDay())) {
                dates.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Limit dates to 5 per month
        const limitedDates = dates.reduce((acc, date) => {
            const monthYear = `${date.getMonth()}-${date.getFullYear()}`;
            if (!acc[monthYear]) {
                acc[monthYear] = [];
            }
            if (acc[monthYear].length < 5) {
                acc[monthYear].push(date.toISOString().split("T")[0]);
            }
            return acc;
        }, {});

        return Object.values(limitedDates).flat();
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
    }));

    const Day = (props) => {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected =
            !props.outsideCurrentMonth &&
            highlightedDays.includes(day.format("YYYY-MM-DD"));

        return (
            <HighlightedDay
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
                selected={isSelected}
            />
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
                disabled={disabled} // Disable if the condition for previous step is not met
            />
        );
    };

    return (
        <Grid container justifyContent={"space-between"} style={{ width: "100%" }}>
            <Grid container justifyContent={"space-between"}>
                <Grid item xs={2}>
                    {renderSelect("First Selection", "first", ["Umrah", "Hajj", "Umrah Ramadan"], 1, false)}
                </Grid>

                <Grid item xs={2}>
                    {renderSelect("City", "city", ["London", "Paris", "Berlin", "Rome"], 2, !selection.first)}
                </Grid>

                <Grid item xs={2}>
                    {renderSelect("Package", "package", ["Standard", "Deluxe", "Premium"], 3, !selection.city)}
                </Grid>

                <Grid item xs={2}>
                    {renderSelect("Room Option", "room", ["Single", "Double", "Triple", "Quad"], 4, !selection.package)}
                </Grid>

                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            slots={{
                                day: Day,
                            }}
                            slotProps={{
                                day: {
                                    highlightedDays: availableDates,
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
                            }}
                            shouldDisableDate={(date) =>
                                !availableDates.includes(dayjs(date).format("YYYY-MM-DD"))
                            }
                            disabled={!selection.room} // Disable until the room is selected
                            renderInput={(params) => (
                                <TextField
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
