import {useLocation, useNavigate, Outlet} from "react-router-dom"
import {useEffect, useState} from "react";
import React from "react";
import BackgroundImage from "src/assets/images/background-waive-pro.jpg";
import HeaderLogo from "src/assets/images/logo-reg.png";
import Grid from "@mui/material/Grid/Grid";
import {CustomLabelCardHeader, CustomLabelHeaderLarge} from "src/components/common/CustomLabel";
import {
    CustomLabelCardHeaderSmall,
    CustomLabelCurrency,
    CustomLabelHeader,
    CustomLabelNormal13
} from "../common/CustomLabel";
import {CustomTextField} from "../common/text";
import {CustomButtonLarge} from "../common/CustomButton";
import {validateUserInput, transformValidateObject} from "src/utils";
import Loader from "../common/Loader";
import {useDispatch, useSelector} from "react-redux";
import ResponsiveConfirmationDialog from "src/components/common/ResponsiveConfirmation";
import Button from "@mui/material/Button/Button";
import {saveToken, getToken} from "src/utils";
import Paper from "@mui/material/Paper/Paper";
import {logUserApiReset} from "../../reducers";
import {logUserApi} from "../../services";

const initialConfirmation = {
    show: false,
    title: "",
    text: "",
    data: null,
    isUpdate: false,
    buttonYes: null,
    buttonNo: null
}

const initialLogin = {
    email: {value: null, error: "Phone cant be empty", showError: false},
    password: {value: null, error: "Password cant be empty", showError: false},
};

const Login = () => {
    const dispatch = useDispatch()
    const [confirmation, setConfirmation] = useState(initialConfirmation);


    const [user, setUser] = useState(initialLogin);
    const [count, setCount] = useState(0);
    const {data, loading, error} = useSelector((state) => state.logUserApiReducer);

    const location = useLocation().pathname;
    let navigate = useNavigate();


    useEffect(() => {
        return function cleanup() {
            dispatch(logUserApiReset());
        };
    }, [])


    useEffect(() => {
        if (error) {
            setConfirmation({
                show: true,
                title: "Error",
                text: error
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo: null
            });
            dispatch(logUserApiReset())
        } else if (data) {

            const user = data.data;

            saveToken(JSON.stringify(user.access_token));
            navigate('/home', {replace: true});
            //dispatch(logUserApiReset())

        }
    }, [data, loading, error]);

    const onChange = (e, type) => {
        let data;
        data = {...user, [type]: {...user[type], value: e.target.value}};
        setUser(data);
        setCount(count + 1);
    }


    const handleValidateUser = (e) => {
        const validate = validateUserInput(user);
        if (validate.isValid) {
            const data = transformValidateObject(validate.data)
            dispatch(logUserApi(data));
        } else {
            setUser(validate.data);
            setCount(count + 1);
        }
    }


    return (
        <Grid container style={{width: "100%", height: "99%", position: "relative"}}>
            {(loading) && <Loader/>}
            {
                confirmation.show &&
                <ResponsiveConfirmationDialog
                    title={confirmation.title} text={confirmation.text}
                    buttons={confirmation.buttonYes}
                    otherButton={confirmation.buttonNo}
                />
            }

            <Grid container style={{background: "#F1F3F8", top: "0", height: "100vh", position: "absolute"}}></Grid>

            <Grid item md={1} xs={0}></Grid>

            <Grid item xs={0} md={5} container alignItems={"center"} justifyContent={"center"}
                  style={{zIndex: 1, height: "80%"}}>
                <Grid container justifyContent={"center"}>
                    <Grid item>
                        <img src={HeaderLogo}/>
                    </Grid>


                    <Grid item xs={6} container>
                        <CustomLabelCurrency
                            text={"Convenience, Peace of mind, Affordability, Expertise in one place, stay connected."}
                            fontWeight={"bold"}
                            textAlign={"center"}
                            color={"black"}/>
                    </Grid>
                </Grid>

            </Grid>
            <Grid item xs={0} md={1}></Grid>


            <Grid item xs={12} md={4.5} container justifyContent={"center"} sx={{height: {xs: "auto", md: "100%",}}}
                  alignItems={"center"} style={{zIndex: 1}}>

                <Paper style={{width: "100%", background: "white", borderRadius: "30px", padding: "40px"}}>
                    <Grid item xs={12} container alignItems={"center"} justifyContent={'center'}>
                        <Grid item xs={12} container justifyContent={"center"}>
                            <CustomLabelHeaderLarge text={"Sign In"} color={"black"} fontWeight={"bold"}/>
                        </Grid>
                        <Grid item xs={12} style={{marginTop: "20px"}}>

                            <Grid item>
                                <CustomLabelCardHeader text={"Email Address"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "10px"}}>
                                <CustomTextField label={""}
                                                 onChange={(e) => onChange(e, 'email')}
                                                 error={user.email.showError}
                                                 value={user.email.value}
                                                 placeholder={""}
                                                 helperText={user.email.showError ? user.email.error : ""}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{marginTop: "30px"}}>

                            <Grid item>
                                <CustomLabelCardHeader text={"Password"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "10px"}}>
                                <CustomTextField label={""}
                                                 onChange={(e) => onChange(e, 'password')}
                                                 error={user.password.showError}
                                                 value={user.password.value}
                                                 type={"password"}
                                                 placeholder={""}
                                                 helperText={user.password.showError ? user.password.error : ""}/>
                            </Grid>
                        </Grid>
                        <Grid item container justifyContent={"center"}>
                            <Grid item xs={8} style={{marginTop: "40px"}} onClick={handleValidateUser}>
                                <CustomButtonLarge text={"Sign In"} background={"#37386C"}
                                                   borderRadius={25} />
                            </Grid>
                        </Grid>


                        <Grid item container justifyContent={"center"}>
                            <Grid item style={{marginTop: "20px"}}>
                                <CustomLabelCardHeaderSmall text={"Don't have an acount?"} color={"black"}
                                                   fontWeight={"bold"} >
                                    <span style={{marginLeft:"3px",color:"#37386C"}} onClick={(e)=>navigate('/register')}>Sign up now</span>
                                </CustomLabelCardHeaderSmall>

                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>

            </Grid>
        </Grid>
    )
}

export default Login;
