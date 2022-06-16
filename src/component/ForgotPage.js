import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUser } from "../redux/action";

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

const ForgotPage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [data1, setData1] = useState({ email: "", password: "" });

  const [formToggle, setFormToggle] = useState(false);
  const [message, setmessage] = useState("");
  const [cpass, setCpass] = useState("");
  const [error, seterror] = useState("");
  const classes1 = useStyles();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const { users } = useSelector((state) => state.info);
  const onHandleEmail = (e) => {
    e.preventDefault();
    let find1 = users.find((i) => {
      return i.email == data1.email;
    });
    if (find1) {
      setFormToggle(true);
      setmessage("yup we found your account");
      localStorage.setItem("update1 id", find1._id);
    } else {
      setmessage("oops we cant get it you need to sign up");
    }
  };
  const onHandleUpdate = (e) => {
    e.preventDefault();

    if (data1.password === "" && cpass === "") {
      seterror("Please fill all field");
    } else if (data1.password != cpass) {
      seterror("PassWord is not matching");
    } else {
      if (window.confirm("Updating password! ......")) {
        dispatch(updateUser(localStorage.get("update1 id"), data1));

        localStorage.clear();
        history("/login");
      }
    }
  };

  return (
    <div
      style={
        localStorage.getItem("darkmode") === "dark"
          ? { height: "100vh", background: "#222121", color: "white" }
          : null
      }
    >
      <Container>
        <Grid xs={8}>
          <Link
            to="/"
            style={
              localStorage.getItem("darkmode") === "dark"
                ? { color: "white", textDecoration: "none" }
                : null
            }
          >
            Back to Home
          </Link>
          <h3>
            If you dont remember your email you need to sign up and create a new
            account <Link to="/signup">Sign Up</Link>{" "}
          </h3>
          <p>Please enter your email</p>
          <p style={{ color: "red" }}>{message}</p>
          <form onSubmit={(e) => onHandleEmail(e)}>
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
              fullWidth
              label="Email Address"
              placeholder="Please verify your email"
              autoFocus
              value={data1.email}
              onChange={(e) => {
                setData1({ ...data1, email: e.target.value });
              }}
            />
            <Button
              type="submit"
              style={{ background: "black", color: "white" }}
            >
              Submit
            </Button>
          </form>
          {formToggle === true ? (
            <div>
              <p>{error}</p>
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
                fullWidth
                label="Password"
                placeholder="Enter new password"
                type="password"
                value={data1.password}
                onChange={(e) => {
                  setData1({ ...data1, password: e.target.value });
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
                fullWidth
                label="Confirm Password"
                placeholder="Confirm new password"
                type="password"
                value={cpass}
                onChange={(e) => {
                  setCpass(e.target.value);
                }}
              />
              <Button
                onClick={onHandleUpdate}
                style={{ background: "black", color: "white" }}
              >
                Submit
              </Button>
            </div>
          ) : null}
        </Grid>
      </Container>
    </div>
  );
};

export default ForgotPage;
