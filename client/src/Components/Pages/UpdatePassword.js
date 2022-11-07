import { Grid, Paper,Button ,TextField} from "@mui/material";
import { useEffect, useState } from "react";

import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { resetUserPassword } from "../../firebase.api";

export function UpdatePassword(){

    //Styles
    const paperStyle={padding:20, height:'auto', width:400, margin:'50px auto'};
    const textStyle={margin:'0px 0px 20px 0px'};
    const btnStyle={margin:'8px 0'};
    const errorMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
                  backgroundColor:"#f34646",color:"white",textAlign:"center", borderRadius:"4px"
                };
    const successMsg = {width:"auto", padding: "15px", margin:"5px 0",fontSize: "15px",
                        color:"#17ad30",textAlign:"center", borderRadius:"4px"
                };

    const [user,setUser] = useState([]);
    const [error,setError] = useState("");
    const [msg,setMsg] = useState(false);
    const [success,setSuccess] = useState("");
    const [credentials,setCredentials] = useState({
        password:'',
        cpassword:'',
    });
    const handleChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }


    function changePassword(){
        if(credentials.password===credentials.cpassword){
            resetUserPassword(user,credentials.cpassword).then((res)=>{
                console.log('Password Changed Successfully');
                setSuccess(res);
                setMsg(false)
            }).catch((e)=>{
                console.log(e);
                setError(e);
                setMsg(true)
            })

        }else{
        setError('Password do not match');
        setMsg(true);
        }
    }

    const loader = async () => {
        onAuthStateChanged(getAuth(),(user)=>{
          if (!user) {
            console.log('No user detected');
          }else{
            setUser(user);
          }
        })
        
      };

    useEffect(()=>{
            loader();

    })
    
    function displayMsg(){
        if(msg===true){
            return <div style={errorMsg}>{error}</div>
        }else{
            return <div style={successMsg}>{success}</div>
        }
      }


    return(

        
        <div>
            <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          {/* <img src={Logo} alt="Logo" /> */}
          <h1>Reset Password</h1>
        </Grid>


        <TextField label="Password"  type="password" name="password" fullWidth required style={textStyle} value={credentials.password} onChange={handleChange}/>
        <TextField label="Confirm Password"  type="password" name="cpassword" fullWidth required style={textStyle} value={credentials.cpassword} onChange={handleChange}/>
             {displayMsg()}
        <Button color="primary" variant="contained" fullWidth style={btnStyle}  onClick={changePassword}>Update Password</Button>

        
      </Paper>
        </div>
    )
}