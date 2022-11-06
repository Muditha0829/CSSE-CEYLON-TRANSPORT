import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import DashBoard from "./Components/Pages/Dashboard";
import Signin from "./Components/Pages/Signin";
import Signup from "./Components/Pages/Signup";


import { getAuth,onAuthStateChanged } from 'firebase/auth';


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
          
        

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
