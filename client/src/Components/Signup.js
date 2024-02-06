import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#021536",
      light: "#ffffff",
    },
    secondary: {
      main: "#43d0f7",
      light: "#ffffff",
    },
  },
});

export default function SignUp() {
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isUsernameValid = username.length >= 8;
    const isPasswordValid = password.length >= 8;
    const doPasswordsMatch = password === confirmPassword;

    setEmailError(!isEmailValid);
    setUsernameError(!isUsernameValid);
    setPasswordError(!isPasswordValid);
    setConfirmPasswordError(!doPasswordsMatch);

    // If all fields are valid, submit the form
    if (
      isEmailValid &&
      isUsernameValid &&
      isPasswordValid &&
      doPasswordsMatch
    ) {
      const body = {
        username: username,
        email: email,
        password: password,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      };

      fetch("/auth/signup", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setServerResponse(data.message);
          setShow(true);
        })
        .catch((err) => console.log(err));
      navigate("/signin");
    } else {
      console.log("Form validation failed.");
    }
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="white">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              color="secondary"
              error={emailError}
              helperText={emailError && "Invalid email format"}
              InputLabelProps={{ style: { color: "#ffffff" } }}
              inputProps={{ style: { color: "#ffffff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Change outline color
                  },
                  "&:hover fieldset": {
                    borderColor: "secondary.main", // Change outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "secondary.main", // Change outline color when focused
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              color="secondary"
              error={usernameError}
              helperText={
                usernameError && "Username must be at least 8 characters"
              }
              InputLabelProps={{ style: { color: "#ffffff" } }}
              inputProps={{ style: { color: "#ffffff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Change outline color
                  },
                  "&:hover fieldset": {
                    borderColor: "secondary.main", // Change outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "secondary.main", // Change outline color when focused
                  },
                },
              }}
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              color="secondary"
              error={passwordError}
              helperText={
                passwordError && "Password must be at least 8 characters"
              }
              id="password"
              InputLabelProps={{ style: { color: "#ffffff" } }}
              inputProps={{ style: { color: "#ffffff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Change outline color
                  },
                  "&:hover fieldset": {
                    borderColor: "secondary.main", // Change outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "secondary.main", // Change outline color when focused
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirm Password"
              type="password"
              color="secondary"
              InputLabelProps={{ style: { color: "#ffffff" } }}
              error={confirmPasswordError}
              helperText={confirmPasswordError && "Passwords do not match"}
              inputProps={{ style: { color: "#ffffff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white", // Change outline color
                  },
                  "&:hover fieldset": {
                    borderColor: "secondary.main", // Change outline color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "secondary.main", // Change outline color when focused
                  },
                },
              }}
              id="confirmPassword"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label={<span style={{ color: "white" }}>Remember me</span>}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#43d0f7" }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
