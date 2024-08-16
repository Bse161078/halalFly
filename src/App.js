import React, {useState, useEffect} from "react";
import {
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    Grid,
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3'
import {styled} from "@mui/material/styles";
import {PickersDay} from "@mui/x-date-pickers/PickersDay";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function App() {
    const [selection, setSelection] = useState({
        first: "",
        city: "",
        package: "",
        room: "",
        adults: "",
        date: null,
    });

    const [activeStep, setActiveStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
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
        // Add more cities and rules as needed
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
        setSelection({...selection, [e.target.name]: e.target.value});
        setActiveStep(step);
    };

    const updateAvailableDates = () => {
        const selectedCity = selection.city;
        const selectedPackage = selection.package;

        if (selectedCity && selectedPackage) {
            console.log(`Selected City: ${selectedCity}, Selected Package: ${selectedPackage}`);

            const days = availabilityRules[selectedCity]?.[selectedPackage];
            if (!days) {
                console.error("No available dates found for the selected city and package combination.");
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
                adults = ""; // Leave it to user input
                break;
            default:
                adults = "";
        }
        setSelection((prev) => ({...prev, adults}));
    };

    const handleSearch = () => {
        setSubmitted(true);
    };

    const HighlightedDay = styled(PickersDay)(({theme}) => ({
        "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    }));


    const Day = (props) => {
        const {highlightedDays = [], day, outsideCurrentMonth, ...other} = props;

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

    const renderSelect = (label, name, options, step) => (
        <FormControl sx={{minWidth: 200, marginRight: 2}}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={selection[name]}
                name={name}
                onChange={(e) => handleSelection(e, step + 1)}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );

    console.log(availableDates)

    return (
        <Box sx={{padding: "20px"}}>
            <Typography variant="h4" gutterBottom>
                Travel Booking Form
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    {renderSelect("First Selection", "first", ["Umrah", "Hajj", "Umrah Ramadan"], 1)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    {renderSelect("City", "city", ["London", "Paris", "Berlin", "Rome"], 2)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    {renderSelect("Package", "package", ["Standard", "Deluxe", "Premium"], 3)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    {renderSelect("Room Option", "room", ["Single", "Double", "Triple", "Quad"], 4)}
                </Grid>

                {selection.room && (
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            label="Adults"
                            type="number"
                            name="adults"
                            value={selection.adults}
                            onChange={(e) => handleSelection(e, 4)}
                            InputProps={{
                                inputProps: {
                                    min: 1,
                                    max: selection.room === "Quad" ? 4 : selection.room === "Triple" ? 3 : selection.room === "Double" ? 2 : 1
                                }
                            }}
                            sx={{minWidth: 100, marginRight: 2}}
                        />
                    </Grid>
                )}

                <Grid item xs={12} sm={6} md={4}>
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
                            label="Select Date"
                            value={selection.date}
                            onChange={(newValue) => handleSelection({
                                target: {
                                    name: "date",
                                    value: newValue?.toISOString().split("T")[0]
                                }
                            }, 5)}
                            shouldDisableDate={(date) => !availableDates.includes(dayjs(date).format("YYYY-MM-DD"))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        disabled={activeStep < 5}
                        sx={{mt: 2}}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>




            {submitted && (
                <Box sx={{marginTop: "20px"}}>
                    <Typography variant="h6">Selected Options:</Typography>
                    <Typography>First Selection: {selection.first}</Typography>
                    <Typography>City: {selection.city}</Typography>
                    <Typography>Package: {selection.package}</Typography>
                    <Typography>Room: {selection.room}</Typography>
                    <Typography>Adults: {selection.adults}</Typography>
                    <Typography>Date: {selection.date}</Typography>
                </Box>
            )}
        </Box>
    );
}

export default App;
