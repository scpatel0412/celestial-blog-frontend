import React, { useState, useEffect } from "react";
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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import "./Carousel.css";
import Grid from "@mui/material/Grid";
import "./Home.css";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Popover } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { showFeed } from "../redux/action";
//https://coderrocketfuel.com/article/how-to-add-disqus-to-a-react-application

const pages = [
  {
    id: 1,
    name: "About us",
    link: "/aboutus",
  },
  {
    id: 2,
    name: "Sign up",
    link: "/signup",
  },
  {
    id: 3,
    name: "Log in",
    link: "/login",
  },
];

const HomePage = () => {
  const images = [
    {
      title: "Night Sky",
      subtitle: " Awesome night sky withs stars",
      img: "https://unsplash.com/photos/EkjHd-r_jF0/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mzl8fG5pZ2h0JTIwc2t5fGVufDB8fHx8MTY0NDg2MjYxMw&force=true",
    },
    {
      title: "Milky Way",
      subtitle: "Where we live.",
      img: "https://unsplash.com/photos/fUnfEz3VLv4/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ0OTAxMDky&force=true",
    },
    {
      title: "Milky Way",
      subtitle: "Milky Way without light pollution",
      img: "https://unsplash.com/photos/5UjBY00ToG0/download?force=true",
    },
  ];

  const history = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [currImg, setCurrImg] = useState(0);
  const [toggleButton, setToggleButton] = useState(false);

  useEffect(() => {
    dispatch(showFeed());
  }, []);

  const { dailyfeeds1 } = useSelector((state) => state.info);

  console.log("dailyfeed1", dailyfeeds1);

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
  const onDarkMode = () => {
    if (toggleButton === false) {
      localStorage.setItem("darkmode", "dark");
      setToggleButton(true);
    }
    if (toggleButton === true) {
      localStorage.setItem("darkmode", "light");
      setToggleButton(false);
    }
  };
  const onHandleDailyFeed = (id) => {
    history(`/dailyfeed/${id}`);
  };
  return (
    <div
      style={
        localStorage.getItem("darkmode") === "dark"
          ? { background: "#222121", color: "white" }
          : null
      }
    >
      <AppBar
        position="static"
        style={{
          backgroundImage:
            "url(https://unsplash.com/photos/Jztmx9yqjBw/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjQ0NTU5OTA0&force=true)",
          backgroundSize: "cover",
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
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Link
                      to={page.link}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography textAlign="center">{page.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem style={{ background: "black" }}>
                  <IconButton onClick={onDarkMode}>
                    {toggleButton === false ? (
                      <Brightness4Icon style={{ color: "white" }} />
                    ) : (
                      <Brightness7Icon style={{ color: "white" }} />
                    )}
                  </IconButton>
                </MenuItem>
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
              <IconButton onClick={onDarkMode}>
                {toggleButton === false ? (
                  <Brightness4Icon style={{ color: "white" }} />
                ) : (
                  <Brightness7Icon style={{ color: "white" }} />
                )}
              </IconButton>
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
                  <MenuItem>
                    <Typography textAlign="center">
                      {localStorage.getItem("bloguser email")}
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Grid xs={12}>
          <div className="carousel">
            <div
              className="carouselInner"
              style={{ backgroundImage: `url(${images[currImg].img})` }}
            >
              <div
                className="left"
                onClick={() => {
                  currImg > 0 && setCurrImg(currImg - 1);
                }}
              >
                <ArrowBackIosIcon style={{ fontSize: 30 }} />
              </div>
              <div className="center">
                <Typography gutterBottom variant="h3" color="white">
                  {images[currImg].title}
                </Typography>
                <Typography gutterBottom variant="h5" color="white">
                  {images[currImg].subtitle}
                </Typography>
              </div>
              <div
                className="right"
                onClick={() => {
                  currImg < images.length - 1 && setCurrImg(currImg + 1);
                }}
              >
                <ArrowForwardIosIcon style={{ fontSize: 30 }} />
              </div>
            </div>
          </div>
        </Grid>
      </Container>
      <Container maxWidth="x1">
        <Typography
          variant="h3"
          noWrap
          component="div"
          // justify = "center"
          style={{ justifyContent: "center", marginTop: "20px" }}
          sx={{ mr: 7, display: { xs: "none", md: "flex" } }}
        >
          WELCOME TO CELESTIAL
        </Typography>
        <Typography
          variant="h3"
          noWrap
          component="div"
          // justify = "center"
          style={{ justifyContent: "center", marginTop: "20px" }}
          sx={{ mr: 7, display: { xs: "none", md: "flex" } }}
        >
          Daily feed
        </Typography>
      </Container>
      <Container style={{ marginTop: "10px" }}>
        <Grid xs={12}>
          {dailyfeeds1 &&
            dailyfeeds1.map((i) => {
              return (
                <Card
                  style={
                    localStorage.getItem("darkmode") === "dark"
                      ? {
                          background: "#525252",
                          color: "white",
                          marginTop: "20px",
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
                    <Typography gutterBottom variant="h5" component="div">
                      {i.star_name}
                    </Typography>
                    <Typography variant="body2">{i.description}</Typography>

                    <Typography style={{ marginTop: "10px" }}>
                      Posted By: {i.userEmail}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button style={{ background: "#0E1F4B", color: "white" }}>
                      Share
                    </Button>
                    <Button
                      style={{ background: "#0E1F4B", color: "white" }}
                      onClick={() => onHandleDailyFeed(i._id)}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
