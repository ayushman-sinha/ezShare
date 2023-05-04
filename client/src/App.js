import { NavBar } from "./Components/Navbar/NavBar.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Single from "./pages/Single/Single.jsx";
import Write from "./pages/Write/Write.jsx";
import Register from "./pages/Register/Register.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/Context";
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
} from "react-router-dom";

function App() {
  const {user}=useContext(AuthContext);  
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
          <Route exact path='/' element={< Home/>}></Route>
          <Route exact path='/login' element={user?<Home/>:<Login/>}></Route>
          <Route exact path='/register' element={user?<Home/>:< Register/>}></Route>
          <Route exact path='/write' element={!user?<Home/>:<Write/>}></Route>
          <Route exact path='/settings' element={!user?<Home/>:<Settings/>}></Route>
          <Route exact path='/post/:postId' element={<Single/>}></Route>          
      </Routes>
   </BrowserRouter>
  );
}

export default App;
