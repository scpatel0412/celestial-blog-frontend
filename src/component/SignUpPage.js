import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link as A} from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    color: "white !important",
    borderColor:"white !important"
  },
  textField1:{
    color:"white !important"
  },
  root: {
    "&$focused $notchedOutline": {
       borderColor: 'orange'
    }
 },
 focused: {},
 notchedOutline: {}
});


// const theme = createTheme();

 function SignUpPage() {
var hello = {};
const history = useNavigate()
 const [data1, setData1] = useState({email:"",password:""})
 const [error, seterror] = useState("")
 const [message1, setMessage1] = useState("")
 const classes1 = useStyles();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const handleSignUp = (event) => {
      if(data1.email === "" && data1.password === ""){
        seterror("Please Fill all field")
      }
      else{
          if(window.confirm('Signing Up ..........')){
            event.preventDefault();
            // if(window.confirm(`Logging in ..........`)){
           axios.post(`https://celestial-blog-backend.herokuapp.com/api/register-user`,data1)
           .then((res) => {
             if(res.data){
              console.log(res.data)
              // setMessage(res.data)
              setMessage1(res.data.message)
             hello = res.data
              localStorage.setItem("bloguser id",hello.result._id)
              localStorage.setItem("bloguser email",hello.result.email)
              history(`/personal/${localStorage.getItem("bloguser id")}`)
           }
           else{
             return setMessage1("No data Found")
           }
            
             
           }).catch((err) => {
              setMessage1("User already exists or internal server error")
           })
         
             
              setData1({email:"",password:""})
          }
      }
  }
  return (
    <div>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid style={localStorage.getItem("darkmode") ==="dark" ? {background:"#222121",color:"white"}:null} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Typography component="h3" variant="h5" style={{color:"red"}}>
              {error}
            </Typography>
            <p>{message1}</p>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
               InputProps={localStorage.getItem("darkmode") ==="dark" ?{style:{borderBottom:"1px solid white"},className:classes1.input }:null}
               InputLabelProps={localStorage.getItem("darkmode") ==="dark" ?{ className: classes1.textField1 }:null}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={data1.email}
                onChange={(e) => {setData1({...data1,email:e.target.value})}}
              />
              <TextField
               InputProps={localStorage.getItem("darkmode") ==="dark" ?{style:{borderBottom:"1px solid white"},className:classes1.input }:null}
               InputLabelProps={localStorage.getItem("darkmode") ==="dark" ?{ className: classes1.textField1 }:null}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data1.password}
                onChange={(e) => {setData1({...data1,password:e.target.value})}}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
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
                  <Link to="/"  style={localStorage.getItem("darkmode") === "dark" ?{color:"white"}:null}>
                    Home page
                    </Link>
                  </A>
                </Grid>
                <Grid item>
                  <A href="#" variant="body2">
                  <Link to="/login"  style={localStorage.getItem("darkmode") === "dark" ?{color:"white"}:null}>
                  { "Have an account? Log in"}
                    </Link>
                    
                  </A>
                </Grid>
              </Grid>
              <Container sx={{mt:5}}>
                <Typography variant="body2" color="text.secondary" align="center"  style={localStorage.getItem("darkmode") === "dark" ?{color:"white"}:null}>
                        {'Copyright © '}
                        <Link  to="/" style={{color:"grey",textDecoration:"none"}}>
                            CELESTIAL
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                </Typography>
              </Container>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUpPage