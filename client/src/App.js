import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Signin from "./Components/Pages/Signin";
import Signup from "./Components/Pages/Signup";

function App() {
  return (
    
    <BrowserRouter>

<NavBar/>
      <Routes>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
