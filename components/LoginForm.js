import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { css } from "@emotion/react"
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles"
import { validateEmail, authenticate, register } from "../lib/services/auth-service";
import Cookies from 'js-cookie';

// TODO: ADD Component for guest checkout

const LOGIN_STATUS = {
  INVALID_CRED: 0,
  LOGGED_IN: 1
}

const LoginForm = () => {
  const theme = useTheme()
  const styles = {
    root: css`
        margin: 2rem auto 0 auto;
        width: 30%;
        background-color: ${theme.palette.primary.light}
      `
  }

  const router = useRouter();

  const [isEmailValid, setEmailValid] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: "",
    additional: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const customerToken = Cookies.get("customerToken");
    //console.log(customerToken);
    if (!!customerToken ) {
      setLoggedIn(LOGIN_STATUS.LOGGED_IN);
    }
  }, [])

  // useEffect(() => {
  //   if (isLoggedIn === LOGIN_STATUS.LOGGED_IN) {
  //     router.push("/booking");
  //   }
  // }, [isLoggedIn])

  const handleEmailValidation = async (email) => {
    const validStatus = await validateEmail(email);
    setEmailValid(validStatus?.status);
  }

  const handleLogin = async () => {
    setLoading(true);
    const authStatus = await authenticate(email, password);
    setLoggedIn(authStatus?.status);
    setLoading(false);
  }

  const handleLogOut = () => {
    Cookies.remove("customerToken");
    setLoggedIn(null);
  }

  const handleRegister = async () => {
    setLoading(true);
    const userInfo = await register(email, password, userProfile);
    if (userInfo) {
      setLoading(false);
      setEmailValid(true);
    }
    return userInfo;
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(profile => ({ ...profile, [name]: value }));
  }

  return (
    <Box sx={styles.root}>
      <LoginStatusBanner status={isLoggedIn}/>
      <h2 style={{ textAlign: "center", paddingTop: "30px" }}>Login here</h2>
      <form>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}>
          <TextField
            required
            id="outlined-required"
            label="Email(e.g. xxx@gmail.com)"
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleEmailValidation(e.target.value);
              }
            }}
          />
          {
            isEmailValid == null ? null :
            <TextField
            required
            id="outlined-required"
            label="Password(at least 6 characters)"
            onChange={(e) => setPassword(e.target.value)}
        />
          }
          {
            isEmailValid !== false ? null :
              <TextField
              required
              id="outlined-required"
              name="name"
              label="Full Name"
              onChange={handleProfileChange}
            />
          }
          <ButtonComponent loginStatus={isLoggedIn} isEmailValid={isEmailValid} handleLogOut={handleLogOut} handleLogin={handleLogin} handleRegister={handleRegister} loading={loading}/>
        </Box>
      </form>
    </Box>
  )
}

const LoginStatusBanner = ({status}) => {
  switch (status) {
    case LOGIN_STATUS.INVALID_CRED:
      return (
        <p>Invalid credentials</p>
      );
    case LOGIN_STATUS.LOGGED_IN:
      return (
        <p>You are logged in!</p>
      );
    default:
      return null;
  }
}

const ButtonComponent = (props) => {
  const theme = useTheme()
  const styles = {
    loginButton: css`
        color: black
    `,
    logOutButton: css`
        color: black;
        background-color: ${theme.palette.error.light}
    `
  }

  if (props.isEmailValid !== false) {
    if (props.loginStatus === LOGIN_STATUS.LOGGED_IN) return (
      <Button sx={styles.logOutButton}
      onClick={() => props.handleLogOut()}
    >Logout</Button>
    );
    else return (
      <Button sx={styles.loginButton}
      onClick={() => props.handleLogin()}
    >{props.loading ? <CircularProgress sx={{width: "60%"}}/> : null}
      Login</Button>
    )
  } else {
    return (
      <Button sx={styles.loginButton}
      onClick={() => props.handleRegister()}
    >{props.loading ? <CircularProgress sx={{width: "60%"}}/> : null}
      Register</Button>
    )
  }
}

export default LoginForm;