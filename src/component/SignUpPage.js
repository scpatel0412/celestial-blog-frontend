import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as A } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { postUsersSignUp } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  input: {
    color: "white !important",
    borderColor: "white !important",
  },
  textField1: {
    color: "white !important",
  },
  root: {
    "&$focused $notchedOutline": {
      borderColor: "orange",
    },
  },
  focused: {},
  notchedOutline: {},
});

function SignUpPage() {
  const dispatch = useDispatch();
  const [data1, setData1] = useState({ email: "", password: "" });
  const [error, seterror] = useState("");

  const classes1 = useStyles();

  const handleSignUp = (event) => {
    event.preventDefault();
    if (data1.email === "" && data1.password === "") {
      seterror(
        "Please Fill all field and password should be greater than 4 character"
      );
    } else {
      dispatch(postUsersSignUp(data1));
    }
  };
  const { errors } = useSelector((state) => state.info);
  console.log("error", errors);
  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          style={
            localStorage.getItem("darkmode") === "dark"
              ? { background: "#222121", color: "white" }
              : null
          }
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Typography component="h3" variant="h5" style={{ color: "red" }}>
              {error}
            </Typography>
            <p style={{ color: "red" }}>{errors}</p>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                InputProps={
                  localStorage.getItem("darkmode") === "dark"
                    ? {
                        style: { borderBottom: "1px solid white" },
                        className: classes1.input,
                      }
                    : null
                }
                InputLabelProps={
                  localStorage.getItem("darkmode") === "dark"
                    ? { className: classes1.textField1 }
                    : null
                }
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={data1.email}
                onChange={(e) => {
                  setData1({ ...data1, email: e.target.value });
                }}
              />
              <TextField
                InputProps={
                  localStorage.getItem("darkmode") === "dark"
                    ? {
                        style: { borderBottom: "1px solid white" },
                        className: classes1.input,
                      }
                    : null
                }
                InputLabelProps={
                  localStorage.getItem("darkmode") === "dark"
                    ? { className: classes1.textField1 }
                    : null
                }
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data1.password}
                onChange={(e) => {
                  setData1({ ...data1, password: e.target.value });
                }}
              />

              <Button
                // type="submit"
                fullWidth
                variant="contained"
                onClick={handleSignUp}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  Redirect to&nbsp;
                  <A href="#" variant="body2">
                    <Link
                      to="/"
                      style={
                        localStorage.getItem("darkmode") === "dark"
                          ? { color: "white" }
                          : null
                      }
                    >
                      Home page
                    </Link>
                  </A>
                </Grid>
                <Grid item>
                  <A href="#" variant="body2">
                    <Link
                      to="/login"
                      style={
                        localStorage.getItem("darkmode") === "dark"
                          ? { color: "white" }
                          : null
                      }
                    >
                      {"Have an account? Log in"}
                    </Link>
                  </A>
                </Grid>
              </Grid>
              <Container sx={{ mt: 5 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  style={
                    localStorage.getItem("darkmode") === "dark"
                      ? { color: "white" }
                      : null
                  }
                >
                  {"Copyright © "}
                  <Link
                    to="/"
                    style={{ color: "grey", textDecoration: "none" }}
                  >
                    CELESTIAL
                  </Link>{" "}
                  {new Date().getFullYear()}
                  {"."}
                </Typography>
              </Container>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUpPage;
