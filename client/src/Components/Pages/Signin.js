import {  Button, Grid, Paper, TextField, Typography } from "@mui/material";
import {Link} from "react-router-dom";
import React, { useState } from "react";
import Image from './../../Images/bus.webp'

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase.config";


const auth = getAuth(app);

const paperStyle={padding:'0 0 0 0', height:'auto', width:400, margin:'50px'};
const textStyle={margin:'0px 0px 20px 0px'};
const btnStyle={margin:'8px 0'};
const bottomText={margin:'10px 0px 10px 0px'};
const typoStyle={align:'center'};
const errorMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
                  backgroundColor:"#f34646",color:"white",textAlign:"center", borderRadius:"4px"
                };
const successMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
                backgroundColor:"#17ad30",color:"white",textAlign:"center", borderRadius:"4px"
              };


const Signin=()=>{

  const [credentials,setCredentials] = useState({
    email:'',
    password:''
  });

  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  function displayMsg(){
    if(error){
        return <div style={errorMsg}>{error}</div>
    }else if(success){
        return <div style={successMsg}>{success}</div>
    }
  }

  function signInUser(credentials){

    signInWithEmailAndPassword(auth, credentials.email, credentials.password).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    setSuccess("User Loged in")
  })
  .catch((error) => {
    const errorCode = error.code;
    // const errorMessage = error.message;
    if(errorCode==='auth/wrong-password'){
      setError('Invalid Password')
    }else if(errorCode==='auth/user-not-found'){
      setError('Invalid Email Address')
    }
    console.log(errorCode);
  });

  }
  
    const handleChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});}

        const handleSubmit = async(e) =>{
            e.preventDefault();
            signInUser(credentials)
            try{
              
            }catch(error){
              if(
                error.response &&
                error.response.status >=400 &&
                error.response.status <=500
              ){
                setError(error.response.data.message);
              }
            }
          }


  return(
    <Grid container spacing={1} justifyContent='space-between'>
        <Grid item xs={4} mt={20}>
        <Paper elevation={0} style={paperStyle}>
        <Grid align='center'>
          <Typography variant="h5" gutterBottom>
        Sign In
      </Typography>
        </Grid>

        <form onSubmit={handleSubmit}>
        <TextField label="Enter Your Email Address" type="text" name="email" fullWidth required style={textStyle} value={credentials.email}
         onChange={handleChange} />
        <TextField label="Password"  type="password" name="password" fullWidth required style={textStyle} value={credentials.password}
         onChange={handleChange}/>
          {displayMsg()}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}
        disabled={ !(/^([A-Za-z0-9_\-.])+@(["gmail"])+\.(["com"]{2,})$/.test(credentials.email)) }
        
        >Sign In</Button>
        </form>

        <div align='center' style={bottomText}>
          <div  className={typoStyle}>
        <Typography>
          <Link href="#">
          Forgot Password?
          </Link>
        </Typography>
        </div>
        </div>
        
        <div align='center'style={bottomText}>
        <Typography>Don't you have an account?
        <Link to="/signup">
            Sign Up
          </Link>
        </Typography>
        </div>
      </Paper>
        </Grid>

        <Grid item xs={8} mt={18}>
        
        <img src={Image} style={{ width: 900, height: 500}} alt='img'/>

        </Grid>
      

    </Grid>

    
  );
}


export default Signin;