import Game from "./pages/Game";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login/>} />
      <Route path="/register"  element={<Register/>} />
      <Route path="/home"  element={<Home/>} />
      <Route path="/profile"  element={<Profile/>} />
      <Route path="/game"   element={<Game/>} />
      <Route path="/leaderboard" element={<Leaderboard/>}/>
    </Routes>
    // <Register/>
    // <Login/>
    // <Home/>
    // <Profile/>
    // <Game/>
  );
}

//Vatsal Gohil

export default App;
