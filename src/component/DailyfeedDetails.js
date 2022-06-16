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
import { Link, useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import { showSingleFeed } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  PinterestShareButton,
  PinterestIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

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

const DailyfeedDetails = () => {
  const history = useNavigate();
  const hello = useParams();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const classes1 = useStyles();

  useEffect(() => {
    dispatch(showSingleFeed(hello.id));
  }, []);

  const { dailyfeed1 } = useSelector((state) => state.info);
  console.log("dailyfeed1", dailyfeed1);

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
      <Container style={{ padding: "20px" }}>
        <Button onClick={() => history("/")} style={{ margin: "20px" }}>
          Go Back
        </Button>
        <Grid xs={12}>
          <Card
            style={
              localStorage.getItem("darkmode") === "dark"
                ? { background: "#525252", color: "white" }
                : { background: "#F3F3F3" }
            }
          >
            <CardMedia
              component="img"
              image={dailyfeed1.imageLink && dailyfeed1.imageLink}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {dailyfeed1.star_name && dailyfeed1.star_name}
              </Typography>
              <Typography variant="body2">
                {dailyfeed1.description && dailyfeed1.description} ...
              </Typography>
              <Typography variant="h4">
                Posted by: {dailyfeed1.userEmail}
              </Typography>
            </CardContent>
            <CardActions>
              Share to: &nbsp;&nbsp;
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon size={32} style={{ borderRadius: "15px" }} />
              </FacebookShareButton>
              <WhatsappShareButton url={window.location.href}>
                <WhatsappIcon size={32} style={{ borderRadius: "15px" }} />
              </WhatsappShareButton>
              <TelegramShareButton url={window.location.href}>
                <TelegramIcon size={32} style={{ borderRadius: "15px" }} />
              </TelegramShareButton>
            </CardActions>
          </Card>
        </Grid>
        {/* <div style={{marginTop:"20px"}}>
            <h1>Add Comments</h1>
            <form onSubmit={handleComments}>
            <TextField
             
              margin="normal"
                
                style={{width:"400px"}}
                
                label="Add - Comment"
                name="email"
                InputProps={localStorage.getItem("darkmode") ==="dark" ?{style:{borderBottom:"1px solid white"},className:classes1.input }:null}
            InputLabelProps={localStorage.getItem("darkmode") ==="dark" ?{ className: classes1.textField1 }:null}
              
                
                 value={comment1}
                onChange= {(e) => {setComment1(e.target.value)}}
              />
              <Button
                type="submit"
                margin="normal"
                variant="contained"
                style={{paddingTop:"10px",paddingBottom:"10px"}}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              
            </form>
            <div>
              {
                Data2.filter((i) => {return i.set_id == hello.id}).map((i) => {
                  var date = new Date(i.createdAt);
                  var realDate = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
                  return(
                    <div style={{margin:" 4px" ,height:"150px",border:"2px gray solid" , borderRadius:"10px"}}> <p style={{textAlign:"right"}}>{realDate}</p>   
                    <p style={{opacity:"0.7"}}> {i.email} posted :
                       </p>
                       <p style={{fontSize:"20px"}}>{i.comment}</p> 
                   </div>
                   
               
                  )
                })
              }
            </div>
    </div> */}
      </Container>
    </div>
  );
};

export default DailyfeedDetails;
