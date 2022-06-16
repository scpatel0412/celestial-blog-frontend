import React, { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";
import { postUsersLogIn } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

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

function LogInPage() {
  const [data1, setData1] = useState({ email: "", password: "" });
  const [data2, setData2] = useState([]);
  const [message, setMessage] = useState("");

  const [message1, setMessage1] = useState("");
  const classes1 = useStyles();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { resploginuser, errors } = useSelector((state) => state.info);
  console.log("res ==>", resploginuser);
  console.log("res err ===>", errors);

  var err = errors;
  console.log("err", err);
  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(postUsersLogIn(data1));
    // var loginsuccess = resploginuser.message;
    // var userid = resploginuser.msg._id;
    // var username = resploginuser.msg.email;
    // if(loginsuccess === "User authenticated"){
    //   localStorage.setItem("bloguser email",username)
    //   localStorage.setItem("bloguser id",userid)
    //   history(`/personal/${userid}`)
    // }else{
    //   setMessage("every body is chilling baby")
    // }
  };

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
              ? { background: "#212121", color: "white" }
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
              Log In
            </Typography>
            <p style={{ color: "red" }}>{err !== "" ? err : null}</p>
            <Box
              style={{ color: "white" }}
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1 }}
            >
              <div>
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
                  className={
                    localStorage.getItem("darkmode") === "dark"
                      ? classes1.input
                      : null
                  }
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
                  className={
                    localStorage.getItem("darkmode") === "dark"
                      ? classes1.input
                      : null
                  }
                  autoComplete="current-password"
                  //className={localStorage.getItem("darkmode") ==="dark" ? "form1":null}

                  value={data1.password}
                  onChange={(e) => {
                    setData1({ ...data1, password: e.target.value });
                  }}
                />
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleLogin}
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <A href="#" variant="body2">
                    <Link
                      to="/forgot"
                      style={
                        localStorage.getItem("darkmode") === "dark"
                          ? { color: "white" }
                          : null
                      }
                    >
                      Forgot password?
                    </Link>
                  </A>
                </Grid>
                <Grid item>
                  <A href="#" variant="body2">
                    <Link
                      to="/signup"
                      style={
                        localStorage.getItem("darkmode") === "dark"
                          ? { color: "white" }
                          : null
                      }
                    >
                      {"Don't have an account? Sign Up"}
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

export default LogInPage;
