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
import { login } from "../auth";
import { useNavigate } from "react-router-dom";
import { Router } from "react-router-dom";

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

export default function SignIn() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [id, setid] = useState(() => {
    // Retrieve value from local storage, or default to 0 if not found
    const storedid = localStorage.getItem("id");
    return storedid ? parseInt(storedid) : 0;
  });

  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    event.preventDefault();
    if (!username) {
      setUsernameError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }
    const dataPass = {
      username: data.get("username"),
      password: data.get("password"),
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataPass),
    };

    fetch("/auth/login", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.access_token);
        localStorage.setItem("id", data.id.toString());

        if (data.access_token != undefined) {
          login(data.access_token);
          console.log("Succesful");
          navigate("/tasks");
        } else {
          alert("Invalid username or password");
        }
      });

    setUsername(data.get("username"));
    setPassword(data.get("password"));
    console.log({
      email: data.get("username"),
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
            Login
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
              id="username"
              label="Username"
              name="username"
              InputLabelProps={{ style: { color: "#ffffff" } }}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError(false); // Reset error state on change
              }}
              error={usernameError} // Set error state for validation
              helperText={usernameError && "Username is required"}
              color="secondary"
              autoComplete="username"
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
              name="password"
              label="Password"
              type="password"
              color="secondary"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false); // Reset error state on change
              }}
              error={passwordError} // Set error state for validation
              helperText={passwordError && "Password is required"}
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
              Login
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
