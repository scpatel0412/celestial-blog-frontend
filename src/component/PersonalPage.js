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
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  getData,
  postData,
  updateData,
  deleteData,
  getSingleUsers,
  updateUser,
  deleteUser,
} from "../redux/action";

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

const PersonalPage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [formToggle1, setFormToggle1] = useState(true);
  const [data1, setData1] = useState({ email: "", password: "" });
  const [data4, setData4] = useState({
    star_name: "",
    description: "",
    setId: localStorage.getItem("bloguser id"),
    image: "",
  });
  const [error, setError] = useState("");
  const [formToggle, setFormToggle] = useState(false);
  const [formToggle2, setFormToggle2] = useState(false);
  const [formToggle3, setFormToggle3] = useState(false);
  const [error1, setError1] = useState("");
  const classes1 = useStyles();

  const hello = useParams();

  useEffect(() => {
    dispatch(getSingleUsers(hello.id));

    dispatch(getData());
  }, []);

  const { datas, user } = useSelector((state) => state.info);

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
    history(`/personal/${hello.id}/dailyfeed`);
  };
  const onUserUpdate = (e) => {
    e.preventDefault();
    if (formToggle === false) {
      setFormToggle(true);
      setData1({ email: user.msg.email, password: "" });
    } else {
      setFormToggle(false);
    }
  };
  const onHandleUserUpdate = (e) => {
    e.preventDefault();
    if (data1.email === user.email && data1.password === user.password) {
      setError("Please Change your Information");
    } else {
      if (
        window.confirm(
          "Are you sure you want to update your profile after updating profile you will be logout......"
        )
      ) {
        dispatch(updateUser(hello.id, data1));
        localStorage.clear();
        history(`/`);
      }
    }
  };
  const onHandleUserDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile after deleting it you will not able to recover your data......"
      )
    ) {
      dispatch(deleteUser(hello.id));
      localStorage.clear();
      history(`/`);
    }
  };
  const onHandleBlog = (e) => {
    e.preventDefault();
    if (formToggle1 === true) {
      if (
        data4.star_name === "" ||
        data4.description === "" ||
        data4.image === ""
      ) {
        setError1("Fill all field");
      } else {
        if (window.confirm("Adding Blog......")) {
          console.log("data4", data4);
          dispatch(postData(data4));

          setTimeout(() => {
            dispatch(getData());
          }, 2000);
        }
      }
    } else {
      if (window.confirm("Updating Blog ..........")) {
        dispatch(updateData(localStorage.getItem("blogdata id"), data4));
        setData4({
          star_name: "",
          description: "",
          setId: localStorage.getItem("bloguser id"),
          image: "",
        });
        setTimeout(() => {
          dispatch(getData());
        }, 2000);
      }
      setFormToggle2(false);
      setFormToggle3(true);
    }
  };
  const onHandleBlogUpdate = (id) => {
    setFormToggle2(true);
    setFormToggle3(false);
    let find1 = datas.find((i) => {
      return i._id == id;
    });
    setData4({
      star_name: find1.star_name,
      description: find1.description,
      setId: find1.setId,
      image: find1.image,
    });
    setFormToggle1(false);
    localStorage.setItem("blogdata id", id);
  };
  const onHandleBlogDelete = (id) => {
    if (window.confirm("Deleting Blog ......")) {
      dispatch(deleteData(id));

      setTimeout(() => {
        dispatch(getData());
      }, 2000);
    }
  };
  const showForm = () => {
    if (formToggle2 === false) {
      setFormToggle2(true);
    } else {
      setFormToggle2(false);
    }
  };
  const showBlog = () => {
    if (formToggle3 === false) {
      setFormToggle3(true);
    } else {
      setFormToggle3(false);
    }
  };
  const blog_data = datas?.filter((i) => {
    return i.setId == localStorage.getItem("bloguser id");
  });
  return (
    <div
      style={
        localStorage.getItem("darkmode") === "dark"
          ? { minHeight: "100vh", background: "#222121", color: "white" }
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
            <Grid xs={8}>
              <Typography variant="h3">Blog</Typography>

              <Button
                style={{
                  background: "#4189B9",
                  color: "white",
                  marginTop: "20px",
                  marginLeft: "10px",
                }}
                onClick={() => showForm()}
              >
                {formToggle2 === false ? "Show" : "Hide"} Form
              </Button>
              <Button
                style={{
                  background: "#4189B9",
                  color: "white",
                  marginTop: "20px",
                  marginLeft: "10px",
                }}
                onClick={() => showBlog()}
              >
                {formToggle3 === false ? "Show" : "Hide"} Blog
              </Button>
              <Grid xs={8}>
                {formToggle2 === false ? null : (
                  <form onSubmit={(e) => onHandleBlog(e)}>
                    <p>{error1}</p>
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
                      value={data4.star_name}
                      onChange={(e) => {
                        setData4({ ...data4, star_name: e.target.value });
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
                      // name="description"
                      label="Description"
                      type="text"
                      // id="description"
                      multiline
                      rows={7}
                      maxRows={10}
                      value={data4.description}
                      onChange={(e) => {
                        setData4({ ...data4, description: e.target.value });
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
                      value={data4.image}
                      onChange={(e) => {
                        setData4({ ...data4, image: e.target.value });
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {formToggle1 === true
                        ? "Add New Blog"
                        : "Update Existing Blog"}
                    </Button>
                  </form>
                )}
              </Grid>

              {formToggle3 === false ? null : blog_data ? (
                blog_data.map((i) => {
                  return (
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
                    >
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        image={i.image}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {i.star_name}
                        </Typography>
                        <Typography variant="body2">{i.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          style={{ background: "#0E1F4B", color: "white" }}
                          onClick={() => onHandleBlogUpdate(i._id)}
                        >
                          Update Blog
                        </Button>
                        <Button
                          style={{ background: "#0E1F4B", color: "white" }}
                          onClick={() => onHandleBlogDelete(i._id)}
                        >
                          Delete Blog
                        </Button>
                      </CardActions>
                    </Card>
                  );
                })
              ) : (
                <p>No Blog Created</p>
              )}
            </Grid>
            <Grid>
              <div align="center">
                <Typography variant="h3">Profile</Typography>
                <hr />
                <p style={{ marginTop: "20px" }}>
                  {localStorage.getItem("bloguser email")}
                </p>
                <Button
                  style={{ background: "#403F71", color: "white" }}
                  onClick={(e) => onUserUpdate(e)}
                >
                  {formToggle === false ? "Update Profile" : "Cancel"}
                </Button>
                &nbsp;&nbsp;
                <Button
                  onClick={() => onHandleUserDelete()}
                  style={{ background: "#403F71", color: "white" }}
                >
                  {" "}
                  Delete profile
                </Button>
                {formToggle === true ? (
                  <form
                    style={{ marginLeft: "20px" }}
                    onSubmit={(e) => onHandleUserUpdate(e)}
                  >
                    <p>{error}</p>
                    <label>Email</label>
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
                      label="Email"
                      // name="title"
                      value={data1.email}
                      onChange={(e) => {
                        setData1({ ...data1, email: e.target.value });
                      }}
                      autoFocus
                    />

                    <label>Password</label>
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
                      label="Password"
                      type="text"
                      // name="Image-Link"
                      value={data1.password}
                      onChange={(e) => {
                        setData1({ ...data1, password: e.target.value });
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {" "}
                      Update Data
                    </Button>
                  </form>
                ) : null}
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default PersonalPage;
