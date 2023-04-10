import * as React from "react";
import { useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { FaSpinner } from "react-icons/fa";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "} kuda.ai {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {
  let [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const a = process.env.NEXT_PUBLIC_LYRICSAPI_BASE_URL;

    const input = JSON.stringify({
      userName: data.get("user-name"),
      password: data.get("password"),
    });

    var res = await fetch(a + "/signin", {
      method: "POST",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: input,
    });

    if (res.status == 201) {
      props.setFailedAttempt(false);
      props.setIsLoggedIn(true);
    } else {
      props.setFailedAttempt(true);
    }
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h5">
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
              id="user-name"
              label="User Name"
              name="user-name"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <div className="mt-3 mb-2">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <FaSpinner className="w-8 h-8 text-gray-500 animate-spin spin-animation" />
                </div>
              ) : (
                <Button type="submit" fullWidth variant="contained">
                  Sign In
                </Button>
              )}
            </div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
