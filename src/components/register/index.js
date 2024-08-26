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
import {validateAdmin} from "../../services";
import ResponsiveConfirmationDialog from "src/components/common/ResponsiveConfirmation";
import Button from "@mui/material/Button/Button";
import {saveToken, getToken} from "src/utils";
import {validateUserSliceReset} from "../../reducers";
import Paper from "@mui/material/Paper/Paper";

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
    email: {value: null, error: "Email cant be empty", showError: false},
    display_name: {value: null, error: "Display name cant be empty", showError: false},
    given_name: {value: null, error: "Given name cant be empty", showError: false},
    sur_name: {value: null, error: "Surname cant be empty", showError: false},
    password: {value: null, error: "Password cant be empty", showError: false},
    confirm_password: {value: null, error: "Confirm password cant be empty", showError: false},
    phone: {value: null, error: "Phone cant be empty", showError: false},

};

const Register = () => {
    const dispatch = useDispatch()
    const [confirmation, setConfirmation] = useState(initialConfirmation);


    const [user, setUser] = useState(initialLogin);
    const [count, setCount] = useState(0);
    const {data, loading, error} = useSelector((state) => state.validateUserReducer);

    const location = useLocation().pathname;
    let navigate = useNavigate();


    useEffect(() => {
        return function cleanup() {
            dispatch(validateUserSliceReset());
        };
    }, [])


    useEffect(() => {
        if (error) {
            setConfirmation({
                show: true,
                title: "Error",
                text: "Invalid email or password"
                ,
                data: {},
                isUpdate: false,
                buttonYes:
                    <Button autoFocus onClick={(e) => {
                        setConfirmation(initialConfirmation)
                    }}>ok</Button>,
                buttonNo: null
            });
            dispatch(validateUserSliceReset())
        } else if (data) {

            console.log("data = ", data);
            const user = data.data;

            saveToken(JSON.stringify(user.access_token));
            navigate('/home', {replace: true});
            dispatch(validateUserSliceReset())

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
            dispatch(validateAdmin(data));
        } else {
            setUser(validate.data);
            setCount(count + 1);
        }
    }


    return (
        <Grid container style={{width: "100%", position: "relative",background:"#F1F3F8",padding:"40px"}}>
            {(loading) && <Loader/>}
            {
                confirmation.show &&
                <ResponsiveConfirmationDialog
                    title={confirmation.title} text={confirmation.text}
                    buttons={confirmation.buttonYes}
                    otherButton={confirmation.buttonNo}
                />
            }


            <Grid item md={1} xs={0}></Grid>

            <Grid item xs={0} md={5} container alignItems={"center"}  justifyContent={"center"}
                  style={{zIndex: 1, height: "80vh"}}>
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
                            <CustomLabelHeaderLarge text={"Sign Up"} color={"black"} fontWeight={"bold"}/>
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


                        <Grid item xs={12} style={{marginTop: "20px"}}>

                            <Grid item>
                                <CustomLabelCardHeader text={"Display Name"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "10px"}}>
                                <CustomTextField label={""}
                                                 onChange={(e) => onChange(e, 'display_name')}
                                                 error={user.display_name.showError}
                                                 value={user.display_name.value}
                                                 placeholder={""}
                                                 helperText={user.display_name.showError ? user.display_name.error : ""}
                                />
                            </Grid>
                        </Grid>



                        <Grid item xs={12} style={{marginTop: "20px"}}>

                            <Grid item>
                                <CustomLabelCardHeader text={"Given Name"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "10px"}}>
                                <CustomTextField label={""}
                                                 onChange={(e) => onChange(e, 'given_name')}
                                                 error={user.given_name.showError}
                                                 value={user.given_name.value}
                                                 placeholder={""}
                                                 helperText={user.given_name.showError ? user.given_name.error : ""}
                                />
                            </Grid>
                        </Grid>




                        <Grid item xs={12} style={{marginTop: "20px"}}>

                            <Grid item>
                                <CustomLabelCardHeader text={"Surname"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "10px"}}>
                                <CustomTextField label={""}
                                                 onChange={(e) => onChange(e, 'sur_name')}
                                                 error={user.sur_name.showError}
                                                 value={user.sur_name.value}
                                                 placeholder={""}
                                                 helperText={user.sur_name.showError ? user.sur_name.error : ""}
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


                        <Grid item xs={12} style={{marginTop: "30px"}}>

                            <Grid item>
                                <CustomLabelCardHeader text={"Confirm Password"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "10px"}}>
                                <CustomTextField label={""}
                                                 onChange={(e) => onChange(e, 'confirm_password')}
                                                 error={user.confirm_password.showError}
                                                 value={user.confirm_password.value}
                                                 type={"confirm_password"}
                                                 placeholder={""}
                                                 helperText={user.confirm_password.showError ? user.confirm_password.error : ""}/>
                            </Grid>
                        </Grid>


                        <Grid item xs={12} style={{marginTop: "20px"}}>

                            <Grid item>
                                <CustomLabelCardHeader text={"Phone Number"} color={"black"} fontWeight={"bold"}/>
                            </Grid>

                            <Grid item style={{marginTop: "10px"}}>
                                <CustomTextField label={""}
                                                 onChange={(e) => onChange(e, 'phone')}
                                                 error={user.phone.showError}
                                                 value={user.phone.value}
                                                 placeholder={""}
                                                 helperText={user.phone.showError ? user.phone.error : ""}
                                />
                            </Grid>
                        </Grid>


                        <Grid item container justifyContent={"center"}>
                            <Grid item xs={8} style={{marginTop: "40px"}} onClick={(e)=>navigate('/home')}>
                                <CustomButtonLarge text={"Register"} background={"#37386C"}
                                                   borderRadius={25} />
                            </Grid>
                        </Grid>


                    </Grid>
                </Paper>

            </Grid>
        </Grid>
    )
}

export default Register;
