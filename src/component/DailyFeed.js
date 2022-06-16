import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { showFeed, addFeed, updateFeed, deleteFeed } from "../redux/action";

const pages = [
  {
    name: "Blog",
    link: "/blog",
  },
];
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

const DailyFeed = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [data1, setData1] = useState({
    star_name: "",
    description: "",
    imageLink: "",
    set_id: localStorage.getItem("bloguser id"),
    userEmail: localStorage.getItem("bloguser email"),
  });
  const [error, setError] = useState("");
  const [data2, setData2] = useState([]);
  const classes1 = useStyles();

  const [updateToggle, setUpdateToggle] = useState(true);
  const [showFormToggle, setShowFormToggle] = useState(false);
  const [showDataToggle, setShowDataToggle] = useState(false);

  useEffect(() => {
    dispatch(showFeed());
  }, []);
  const { dailyfeeds1 } = useSelector((state) => state.info);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const onHandleLogout = () => {
    localStorage.removeItem("bloguser id");
    localStorage.removeItem("bloguser email");
    localStorage.removeItem("update1 id");
    history("/");
  };
  const onHandleDailyFeed = (e) => {
    e.preventDefault();
    if (updateToggle === true) {
      if (
        data1.star_name === "" &&
        data1.description === "" &&
        data1.imageLink === ""
      ) {
        setError("Please Fill All Fields");
      } else {
        if (window.confirm("Adding Daily feed..........")) {
          dispatch(addFeed(data1));

          setTimeout(() => {
            dispatch(showFeed());
          }, 2000);
        }
      }
    } else {
      if (window.confirm("Updating Daily feed..........")) {
        dispatch(updateFeed(localStorage.getItem("update id"), data1));

        setUpdateToggle(true);
        setTimeout(() => {
          dispatch(showFeed());
        }, 2000);
      }
      setShowFormToggle(false);
      setShowDataToggle(true);
    }
  };

  const onHandleDailyFeedUpdate1 = (id) => {
    setShowFormToggle(true);
    setShowDataToggle(false);
    let find1 = dailyfeeds1.find((i) => {
      return i._id == id;
    });
    localStorage.setItem("update id", id);
    setData1({
      star_name: find1.star_name,
      description: find1.description,
      imageLink: find1.imageLink,
      set_id: localStorage.getItem("bloguser id"),
      userEmail: localStorage.getItem("bloguser email"),
    });
    setUpdateToggle(false);
  };
  const onHandleDailyFeedDelete = (id) => {
    if (window.confirm("Are you sure want to delete this daily feed.....")) {
      dispatch(deleteFeed(id));

      setTimeout(() => {
        dispatch(showFeed());
      }, 2000);
    }
  };
  const showForm = () => {
    if (showFormToggle === false) {
      setShowFormToggle(true);
    } else {
      setShowFormToggle(false);
    }
  };
  const showData = () => {
    if (showDataToggle === false) {
      setShowDataToggle(true);
    } else {
      setShowDataToggle(false);
    }
  };
  const goBack = () => {
    history(`/personal/${localStorage.getItem("bloguser id")}`);
  };
  let dailyfeed2 = dailyfeeds1?.filter((i) => {
    return i.set_id == localStorage.getItem("bloguser id");
  });
  return (
    <div
      style={
        localStorage.getItem("darkmode") === "dark"
          ? { background: "#222121", color: "white", minHeight: "100vh" }
          : null
      }
    >
      <AppBar
        position="static"
        style={{
          backgroundSize: "cover",
          paddingBottom: "20px",
          paddingTop: "20px",
          backgroundImage:
            "url(https://unsplash.com/photos/Jztmx9yqjBw/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ0NTU5OTA0&force=true)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              CELESTIAL
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to={page.link}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {page.name}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              CELESTIAL
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    to={page.link}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {page.name}
                  </Link>
                </Button>
              ))}
            </Box>

            {!localStorage.getItem("bloguser id") ? null : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    style={{ background: "white" }}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="https://img.icons8.com/ios/50/000000/user--v1.png"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem disabled="true">
                    <Typography textAlign="center">
                      {localStorage.getItem("bloguser email")}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => onHandleDailyFeed()}>
                    <Typography textAlign="center">Add Daily feed</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => onHandleLogout()}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <div>
        <Container>
          <Grid container>
            <Grid xs={12}>
              <Button
                style={{
                  color: "white",
                  background: "#4D1D84",
                  marginTop: "20px",
                }}
                onClick={() => goBack()}
              >
                &#8592; Go back
              </Button>
              <Typography
                component="h1"
                variant="h3"
                style={{ marginTop: "20px" }}
              >
                Welcome to DailyFeed
              </Typography>
              <Button
                style={{ color: "white", background: "#4D1D84" }}
                onClick={() => showForm()}
              >
                {showFormToggle === false ? "Show" : "Hide"} Form
              </Button>
              &nbsp;&nbsp;
              <Button
                style={{ color: "white", background: "#4D1D84" }}
                onClick={() => showData()}
              >
                {showDataToggle === false ? "Show" : "Hide"} Daily Feed
              </Button>
              {showFormToggle === true ? (
                <Grid xs={8}>
                  <form onSubmit={(e) => onHandleDailyFeed(e)}>
                    <p>{error}</p>
                    <label>Title</label>
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
                      // id="title"
                      label="Title"
                      // name="title"
                      value={data1.star_name}
                      onChange={(e) => {
                        setData1({ ...data1, star_name: e.target.value });
                      }}
                      autoFocus
                    />
                    <label>Description</label>
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
                      label="Description"
                      type="text"
                      multiline
                      rows={7}
                      maxRows={10}
                      value={data1.description}
                      onChange={(e) => {
                        setData1({ ...data1, description: e.target.value });
                      }}
                    />
                    <label>Image Link</label>
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
                      // id="image-link"
                      label="Image-Link"
                      // name="Image-Link"
                      value={data1.imageLink}
                      onChange={(e) => {
                        setData1({ ...data1, imageLink: e.target.value });
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {updateToggle === true
                        ? "Add New Daily Feed"
                        : "Update Existing Feed"}
                    </Button>
                  </form>
                </Grid>
              ) : null}
              {showDataToggle === true
                ? dailyfeeds1 &&
                  dailyfeed2.map((i) => {
                    return (
                      <div>
                        <Card
                          style={
                            localStorage.getItem("darkmode") === "dark"
                              ? {
                                  position: "relative",
                                  background: "#525252",
                                  color: "white",
                                }
                              : { background: "#F3F3F3" }
                          }
                        >
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            image={i.imageLink}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {i.star_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {i.description}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              style={{ background: "#0E1F4B", color: "white" }}
                              onClick={() => onHandleDailyFeedDelete(i._id)}
                            >
                              Delete Post
                            </Button>
                            <Button
                              style={{ background: "#0E1F4B", color: "white" }}
                              onClick={() => onHandleDailyFeedUpdate1(i._id)}
                            >
                              Update Post
                            </Button>
                          </CardActions>
                        </Card>
                        <br />
                      </div>
                    );
                  })
                : null}
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default DailyFeed;
