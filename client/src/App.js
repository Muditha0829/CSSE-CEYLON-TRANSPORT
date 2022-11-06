import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./Components/Navbar";
import DashBoard from "./Components/Pages/Dashboard";
import Signin from "./Components/Pages/Signin";
import Signup from "./Components/Pages/Signup";
import Profile from "./Components/Pages/Profile";


import { getAuth,onAuthStateChanged } from 'firebase/auth';
import { UpdateProfile } from "./Components/Pages/UpdateProfile";


function App() {

  const [auths, setAuths] = React.useState(true);

  const loader = async () => {
    // const user = await getUser();
    onAuthStateChanged(getAuth(),(user)=>{
      if (!user) {
        setAuths(false);
      }else{
        // console.log(user);
        setAuths(true);
      }
    })
    
  };

  useEffect(()=>{
    loader()
  })


  return (
    
    <BrowserRouter>

    <NavBar/>
      <Routes>

        {!auths && (
          <Route path='/signin' element={<Signin/>}/>
        )}
        {!auths && (
          <Route path='/signup' element={<Signup/>}/>
        )}

        {auths && (
          <Route path='/' element={<DashBoard/>}/>
        )}

          <Route path='/profile' element={<Profile/>}/>
          <Route path='/updateprofile' element={<UpdateProfile/>}/>
          
        

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
