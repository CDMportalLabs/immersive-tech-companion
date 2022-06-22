import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Box, Button, TextField, CircularProgress, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { css } from "@emotion/react"
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import { validateEmail, authenticate, register } from "../lib/services/auth-service";
import Cookies from 'js-cookie';
import bgImage from '../lib/assets/play_bg.png';

// TODO: ADD Component for guest checkout

const LOGIN_STATUS = {
  INVALID_CRED: 0,
  LOGGED_IN: 1
}

const LoginForm = (props) => {
  const theme = useTheme()
  const styles = {
    root: css`
        margin: 2rem auto 0 auto;
        width: 60%;
        background-color: ${theme.palette.primary.light}
      `
  }

  const router = useRouter();

  const [isLoggedIn, setLoggedIn] = useState(null);
  const [userCredential, setUserCredential] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [isRememberMeChecked, setRememberMeChecked] = useState(false);

  useEffect(async () => {
    const customerToken = Cookies.get("customerToken");
    //console.log(customerToken);
    if (!!customerToken) {
      setLoggedIn(LOGIN_STATUS.LOGGED_IN);
    }
  }, [])

  // useEffect(() => {
  //   if (isLoggedIn === LOGIN_STATUS.LOGGED_IN) {
  //     router.push("/profile");
  //   }
  // }, [isLoggedIn])

  const handleLogin = async () => {
    setLoading(true);
    const authStatus = await authenticate(userCredential, isRememberMeChecked);
    setLoggedIn(authStatus?.status);
    setLoading(false);
  }

  const handleLogOut = () => {
    Cookies.remove("customerToken");
    setLoggedIn(null);
  }

  const handleCredentialChange = (e) => {
    const { name, value } = e.target;
    setUserCredential(credential => ({ ...credential, [name]: value }));
  }

  return (
    <Box>
      <Box sx={{ height: "50vh", backgroundImage: `url(${bgImage.src})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundAttachment: "scroll", backgroundColor: "#EBEBEB" }}></Box>
      <LoginStatusBanner status={isLoggedIn} />
      <Grid container justifyContent="space-between">
        <Grid item>
          <h2 style={{ textAlign: "center", margin: "2rem 1.5rem auto 1.5rem" }}>Sign In</h2>
        </Grid>
        <Grid item>
          <p style={{ textAlign: "center", margin: "2rem 1.5rem auto 1.5rem" }}><a style={{ textDecoration: "underline" }} onClick={() => props.handleLoginOpen(false)}>Sign Up </a> here</p>
        </Grid>
      </Grid>
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
            name="email"
            label="Email(e.g. xxx@gmail.com)"
            onChange={handleCredentialChange}
            fullWidth
          />
          <TextField
            required
            id="outlined-required"
            name="password"
            label="Password(at least 6 characters)"
            onChange={handleCredentialChange}
            fullWidth
          />
          <FormControlLabel control={<Checkbox checked={isRememberMeChecked} onChange={(e) => setRememberMeChecked(e.target.checked)} />} label="Remember me" />
          {
            isLoggedIn !== LOGIN_STATUS.LOGGED_IN ? <Button sx={styles.loginButton}
              onClick={handleLogin}
            >{loading ? <CircularProgress sx={{ width: "60%" }} /> : null}
              Login</Button>
              :
              <Button sx={styles.logOutButton}
                onClick={handleLogOut}
              >Logout</Button>
          }
        </Box>
      </form>
    </Box>
  )
}

const LoginStatusBanner = ({ status }) => {
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
      >{props.loading ? <CircularProgress sx={{ width: "60%" }} /> : null}
        Login</Button>
    )
  } else {
    return (
      <Button sx={styles.loginButton}
        onClick={() => props.handleRegister()}
      >{props.loading ? <CircularProgress sx={{ width: "60%" }} /> : null}
        Register</Button>
    )
  }
}

export default LoginForm;