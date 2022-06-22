import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Box, Button, TextField, CircularProgress, Grid, InputLabel, InputAdornment, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import { jsx, css } from "@emotion/react"
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles"
import { validateEmail, register } from "../lib/services/auth-service";
import bgImage from '../lib/assets/play_bg.png';
import { INPUT_TYPES } from "../lib/constants/input-types";
import { validateEmailInput, validatePasswordInput } from "../lib/helpers/input-validator";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { firestore } from "../firebase/clientApp";

const REGISTER_STATUS = {
    INVALID_EMAIL: 0,
    REGISTER_SUCCESS: 1
}

const SignupForm = (props) => {
    const theme = useTheme()
    const styles = {
        root: css`
        margin: 2rem auto 0 auto;
        width: 60%;
        backgroundImage: "url(${bgImage.src})";
        backgroundRepeat: no-repeat;
        backgroundPosition: center;
        backgroundAttachment: scroll;
      `,
    }

    const router = useRouter();

    const [isRegistered, setRegistration] = useState(null);
    const [userProfile, setUserProfile] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        additional: ""
    });
    const [isValidInputs, setValidInputs] = useState({
        email: null,
        password: null,
        firstName: null,
        lastName: null
    })
    const [showPassword, setShowPassword] = useState(false);
    const [isAgreementChecked, setAgreementChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateRegistrationInputs = (name, value) => {
        switch (name) {
            case INPUT_TYPES.EMAIL:
                setValidInputs(input => ({ ...input, [name]: validateEmailInput(value) === true }));
                break;
            case INPUT_TYPES.PASSWORD:
                setValidInputs(input => ({ ...input, [name]: validatePasswordInput(value) === true }));
                break;
            case INPUT_TYPES.FIRST_NAME:
            case INPUT_TYPES.LAST_NAME:
                setValidInputs(input => ({ ...input, [name]: value !== "" }));
                break;
            default:
                break;
        }
    }

    useEffect(() => {
      if (isRegistered === REGISTER_STATUS.REGISTER_SUCCESS) {
        props.handleLoginOpen(true);
      }
    }, [isRegistered])

    const handleRegister = async () => {
        setLoading(true);
        const validStatus = await validateEmail(userProfile.email);
        if (validStatus && validStatus.status === true) {
            setLoading(false);
            setRegistration(0);
            return;
        } else {
            const resp = await register(userProfile);
            const {password, ...userInfo} = userProfile;
            // create a new user in firestore users collection
            await firestore.collection("users").doc().set(userInfo);
            if (resp) {
                setLoading(false);
                setRegistration(1);
            }
            return userInfo;
        }
    }

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(profile => ({ ...profile, [name]: value }));
        validateRegistrationInputs(name, value);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box>
            <Box sx={{ height: "50vh", backgroundImage: `url(${bgImage.src})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundAttachment: "scroll", backgroundColor: "#EBEBEB" }}></Box>
            <RegistrationStatusBanner status={isRegistered} />
            <Grid container justifyContent="space-between">
                <Grid item>
                    <h2 style={{ textAlign: "center", margin: "2rem 1.5rem auto 1.5rem" }}>Sign Up</h2>
                </Grid>
                <Grid item>
                    <p style={{ textAlign: "center", margin: "2rem 1.5rem auto 1.5rem" }}><a style={{ textDecoration: "underline" }} onClick={() => props.handleLoginOpen(true)}>Sign In </a> here</p>
                </Grid>
            </Grid>
            <form>
                <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2} sx={{
                    padding: "20px",
                }}>
                    <Grid item container direction="row" justifyContent="center" spacing={2}>
                        <Grid item xs="6">
                            <TextField
                                required
                                id="outlined-required"
                                name="firstName"
                                label="First Name"
                                onChange={handleProfileChange}
                                fullWidth
                                error={isValidInputs.firstName === false}
                            />
                        </Grid>
                        <Grid item xs="6">
                            <TextField
                                required
                                id="outlined-required"
                                name="lastName"
                                label="Last Name"
                                onChange={handleProfileChange}
                                fullWidth
                                error={isValidInputs.lastName === false}
                            />
                        </Grid>
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                        <TextField
                            required
                            id="outlined-required"
                            name="email"
                            label="Email(e.g. xxx@gmail.com)"
                            onChange={handleProfileChange}
                            fullWidth
                            error={isValidInputs.email === false}
                        />
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                        <TextField
                            required
                            id="outlined-adornment-password"
                            label="Password(at least 6 characters)"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleProfileChange}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>

                            }}
                            fullWidth
                            error={isValidInputs.password === false}
                        />
                    </Grid>
                    <Grid item xs="auto" >
                        <FormControlLabel control={<Checkbox checked={isAgreementChecked} onChange={(e) => setAgreementChecked(e.target.checked)} />} label="I agree to the Terms of Use" />
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{ margin: "0.5rem auto" }}
                        onClick={() => handleRegister()}
                        disabled={Object.values(isValidInputs).includes(false) || Object.values(isValidInputs).includes(null) || isAgreementChecked === false}
                    >{loading ? <CircularProgress sx={{ width: "60%", color: "white" }} /> : null}
                        Sign Up</Button>
                </Grid>
            </form>
        </Box>
    )
}

const RegistrationStatusBanner = ({ status }) => {
    switch (status) {
        case REGISTER_STATUS.INVALID_EMAIL:
            return (
                <p>Account already exists!</p>
            );
        case REGISTER_STATUS.REGISTER_SUCCESS:
            return (
                <p>Registration Successful!</p>
            );
        default:
            return null;
    }
}

export default SignupForm;