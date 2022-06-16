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
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getData, showLike, postLike, showComment } from "../redux/action";

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

const BlogPage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [search, setSearch] = useState("");
  const [length1, setLength1] = useState(0);
  const classes1 = useStyles();

  useEffect(() => {
    dispatch(getData());
    dispatch(showLike());
    dispatch(showComment());
  }, []);

  const { datas, like1, comment1 } = useSelector((state) => state.info);
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
  const onHandleDailyFeed = () => {
    history(`/personal/${localStorage.getItem("bloguser id")}/dailyfeed`);
  };
  const onLikes = (id) => {
    if (id) {
      var a = localStorage.getItem("bloguser email");
      var b = id;
      var c = { email: a, set_id: b };
      dispatch(postLike(c));
      setTimeout(() => {
        dispatch(showLike());
      }, 1000);
    } else {
      return false;
    }
  };

  var data1 = datas.filter((e) => {
    if (search === "") {
      return e;
    } else if (e.star_name.toLowerCase().includes(search.toLowerCase())) {
      return e;
    } else if (e.star_name.toUpperCase().includes(search.toUpperCase())) {
      return e;
    }
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
        <div align="center" style={{ marginTop: "20px" }}>
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
            label="search"
            placeholder="Enter letters to search"
            margin="normal"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <p>
            {search ? "Search results" : "Total number of post"} :{" "}
            {data1.length}
          </p>
        </div>
        <Grid
          container
          style={{ padding: "20px" }}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data1.map((i) => {
            var a = like1.filter((k) => {
              return (
                k.set_id === i._id &&
                k.email === localStorage.getItem("bloguser email")
              );
            });

            return (
              <Grid item xs={12} sm={12} md={4} key={i._id}>
                <Card
                  style={
                    localStorage.getItem("darkmode") === "dark"
                      ? {
                          background: "#525252",
                          color: "white",
                          marginTop: "20px",
                        }
                      : { background: "#F3F3F3", marginTop: "20px" }
                  }
                  sx={{ maxWidth: 345 }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={i.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {i.star_name}
                    </Typography>
                    <Typography variant="body2">
                      {i.description.substring(0, 200)} ...
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      style={{ background: "#0E1F4B", color: "white" }}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/blog/${i._id}`}
                      >
                        See more
                      </Link>
                    </Button>
                    {a.length === 0 ? (
                      <Button
                        size="small"
                        style={{ background: "#0E1F4B", color: "white" }}
                        onClick={() => onLikes(i._id)}
                      >
                        <i class="fa-solid fa-heart"></i> &nbsp; Like
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        style={{ background: "#0E1F4B", color: "white" }}
                      >
                        <i class="fa-solid fa-thumbs-down"></i> &nbsp; DisLike
                      </Button>
                    )}
                    <p style={{ marginLeft: "20px" }}>
                      <i class="fa-solid fa-heart"></i>{" "}
                      {
                        like1?.filter((k) => {
                          return k.set_id == i._id;
                        }).length
                      }
                    </p>
                    <p>
                      <i class="fa-solid fa-comments"></i>{" "}
                      {
                        comment1?.filter((k) => {
                          return k.set_id == i._id;
                        }).length
                      }
                    </p>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default BlogPage;
