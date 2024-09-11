import React from 'react';
import { Grid } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AvatarLogin from "src/assets/images/avatar-login.png";
import UaeCurrencyIcon from "src/assets/images/uae-icon.png";
import EnglandIcon from "src/assets/images/england.png";
import LogoImage from "src/assets/images/logo.png";
import { useNavigate } from 'react-router-dom';
import { CustomLabelCurrency } from '../common/CustomLabel'; 
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        padding: '10px 20px',
        backgroundColor: '#004225',
        color: 'white',
        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
    logo: {
        maxWidth: '100%',
        height: 'auto',
    },
    icon: {
        width: 24,
        height: 24,
    },
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(1),
    },
    userAvatar: {
        width: 24,
        height: 24,
        cursor: 'pointer',
        marginLeft: theme.spacing(1),
    },
    dropdownIcon: {
        color: "white",
        marginLeft: theme.spacing(0.5),
    },
}));

const Header = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <Grid container spacing={2} alignItems="center" className={classes.headerContainer}>
            {/* Logo */}
            <Grid item xs="auto" style={{ flex: '1 1 auto' }}>
                <img src={LogoImage} alt="Logo" className={classes.logo} />
            </Grid>

            {/* Currency and Language Selection */}
            <Grid item container xs alignItems="center" justifyContent="flex-end" spacing={2}>
                <Grid item className={classes.iconContainer}>
                    <img src={UaeCurrencyIcon} alt="UAE Currency" className={classes.icon} />
                    <CustomLabelCurrency text="AED" fontWeight="bold" style={{ marginLeft: 4 }} />
                    <ArrowDropDownIcon className={classes.dropdownIcon} />
                </Grid>
                <Grid item className={classes.iconContainer}>
                    <img src={EnglandIcon} alt="England" className={classes.icon} />
                    <CustomLabelCurrency text="Eng" fontWeight="bold" style={{ marginLeft: 4 }} />
                    <ArrowDropDownIcon className={classes.dropdownIcon} />
                </Grid>
                {/* User Avatar */}
                <Grid item className={classes.iconContainer} onClick={() => navigate('/login')}>
                    <img src={AvatarLogin} alt="User Avatar" className={classes.userAvatar} />
                    <ArrowDropDownIcon className={classes.dropdownIcon} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Header;
