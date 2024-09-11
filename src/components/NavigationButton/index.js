import React from 'react';
import { Grid, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HotelIcon from '@mui/icons-material/Hotel';
import { CustomLabelCurrency } from '../common/CustomLabel'; // Adjust import path as needed
import { useNavigate } from 'react-router-dom';

const NavigationButton = ({ allHotels }) => {
    const navigate = useNavigate();

    const handleNavigation = (text) => {
        if (text === "Hotels") {
            navigate('/hotels', { state: { allHotels } });
        } else if (text === "Home") {
            navigate('/');
        } else if (text === "Umrah Packages") {
            window.location.hash = 'umrah-packages';
        }
    };

    const buttonData = [
        { text: "Home", icon: <HomeIcon style={{ color: "#004225" }} /> },
        { text: "Umrah Packages", icon: <Inventory2OutlinedIcon style={{ color: "#004225" }} /> },
        { text: "Hotels", icon: <HotelIcon style={{ color: "#004225" }} /> },
    ];

    return (
        <Grid container spacing={2} alignItems="center">
            {buttonData.map((item) => (
                <Grid item xs="auto" key={item.text}>
                    <Paper
                        style={{
                            padding: "10px 20px",
                            background: "#FAF3E0",
                            borderRadius: "10px",
                            border: '1px solid #004225',
                            opacity: 0.9,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={() => handleNavigation(item.text)}
                    >
                        {item.icon}
                        <CustomLabelCurrency text={item.text} fontWeight="bold" color="#004225" style={{ marginLeft: "8px" }} />
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default NavigationButton;
