import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from '@mui/material';
import { jsx, css } from "@emotion/react"
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles"
import validateEmail from "../lib/validateEmail";

const LoginForm = () => {
    const theme = useTheme()
    const styles = {
      root: css`
        margin: 2rem auto;
        width: 30%;
        background-color: cyan
      `,
      link: css`
        color: black;
        text-decoration: none;
      `,
      title: css`
        margin: 10px auto;
        text-align: center
      `
    }
  
    const [isEmailValid, setEmailValid] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleEmailValidation = async (email) => {
      const validStatus = await validateEmail(email);
      setEmailValid(validStatus?.status);
    }
  
    return (
      <Box sx={styles.root}>
        <h2 style={{textAlign: "center", paddingTop: "30px"}}>Login here</h2>
        <form>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            padding: "20px",
            // backgroundColor: "white"
          }}>
            <TextField
              required
              id="outlined-required"
              label="Email(e.g. xxx@gmail.com)"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleEmailValidation(e.target.value);
                }
              }}
            />
            {
              isEmailValid ? 
              <TextField
              required
              id="outlined-required"
              label="Password(at least 6 characters)"
            /> : null
            }
          </Box>
          <Button sx={{
            float: "right"
          }}>Login</Button>
        </form>
      </Box>
    )
}

export default LoginForm;