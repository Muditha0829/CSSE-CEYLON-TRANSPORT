import {  Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from './../../Images/bus.webp'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Link} from "react-router-dom";


// import { useNavigate} from 'react-router-dom';
// import axios from 'axios';

const paperStyle={padding:'0 0 0 0', height:'auto', width:400, margin:'50px'};
const textStyle={margin:'0px 0px 20px 0px'};
const btnStyle={margin:'8px 0'};
const bottomText={margin:'10px 0px 10px 0px'};
// const errorMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
//                   backgroundColor:"#f34646",color:"white",textAlign:"center", borderRadius:"4px"
//                 };

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }



const Signup=()=>{


  const [credentials,setCredentials] = useState({
    fullName:'',
    nic:'',
    passportNo:'',
    phoneNumber:'',
    email:'',
    password:'',
    cpassword:'',
  });
  
    const handleChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});}

    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
      setValue(newValue);
    };

//   const handleSubmit = async (e) =>{
//     e.preventDefault();

//     if(!(credentials.password===credentials.cpassword)){
//       alert("Error in password");
//     }else{
//       try{
//         const user = {
//             "firstName":credentials.firstName,
//             "lastName":credentials.lastName,
//           "email":credentials.email,
//           "password":credentials.password,
//           "gender":credentials.gender,
//           "city":credentials.city,
//           "province":credentials.province
//         }
//         console.log(user);

//         await axios.post("http://localhost:4500/user/add",user).then(() => {
//           alert("User Created");
//           navigate('/signin');
//         })
        
        
//       }catch(error){
//         console.log(error)
//         if(
//           error.response &&
//           error.response.status >=400 &&
//           error.response.status <=500
//         ){
//           setError(error.response.data.message);
//         }
//       }
//     }
//   }


  return(
    <Grid container spacing={1} justifyContent='space-between'>
        <Grid item xs={4}>
        <Paper elevation={0} style={paperStyle}>
        <Grid align='center'>
          {/* <img src={Logo} alt="Logo" /> */}
          <Typography variant="h5" gutterBottom>
        Register
      </Typography>
        </Grid>

        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChangeTab} centered aria-label="basic tabs example">
          <Tab label="Local" {...a11yProps(0)} />
          <Tab label="Foreign" {...a11yProps(1)} />
        </Tabs>
      </Box>


      <TabPanel value={value} index={0}>

      <form>
        <TextField label="Enter Your Full Name" type="text" name="fullName" fullWidth required style={textStyle} value={credentials.fullName} onChange={handleChange} />
        <TextField label="Enter Your NIC" type="text" name="nic" fullWidth required style={textStyle} value={credentials.nic} onChange={handleChange} />
        <TextField label="Enter Your Contact No" type="text" name="phoneNumber" fullWidth required style={textStyle} value={credentials.phoneNumber} onChange={handleChange} />
        <TextField label="Enter Your Email Address" type="email" name="email" fullWidth required style={textStyle} value={credentials.email} onChange={handleChange} />
        <TextField label="Password"  type="password" name="password" fullWidth required style={textStyle} value={credentials.password} onChange={handleChange}/>
        <TextField label="Confirm Password"  type="password" name="cpassword" fullWidth required style={textStyle} value={credentials.cpassword} onChange={handleChange}/>
        {/* {error && <div style={errorMsg}>{error}</div>} */}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Sign Up</Button>
        </form>

      </TabPanel>
      <TabPanel value={value} index={1}>

      <form>
        <TextField label="Enter Your Full Name" type="text" name="fullName" fullWidth required style={textStyle} value={credentials.fullName} onChange={handleChange} />
        <TextField label="Enter Your Passport No" type="text" name="passportNo" fullWidth required style={textStyle} value={credentials.passportNo} onChange={handleChange} />
        <TextField label="Enter Your Contact No" type="text" name="phoneNumber" fullWidth required style={textStyle} value={credentials.phoneNumber} onChange={handleChange} />
        <TextField label="Enter Your Email Address" type="email" name="email" fullWidth required style={textStyle} value={credentials.email} onChange={handleChange} />
        <TextField label="Password"  type="password" name="password" fullWidth required style={textStyle} value={credentials.password} onChange={handleChange}/>
        <TextField label="Confirm Password"  type="password" name="cpassword" fullWidth required style={textStyle} value={credentials.cpassword} onChange={handleChange}/>
        {/* {error && <div style={errorMsg}>{error}</div>} */}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle} >Sign Up</Button>
        </form>

      </TabPanel>
    </Box>

    
        <div align='center' style={bottomText}>
        <Typography>Do you have an account?
          <Link to="/signin">
            Sign In
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


export default Signup;