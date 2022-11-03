import Game from "./pages/Game";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import { Route, Routes } from "react-router-dom";
import Leader_1 from "./pages/Leader_1";
import Waiting from "./pages/Waiting";
import { AppContext, socket } from "./context/appContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <AppContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/waiting/:gameId" element={<Waiting />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/leader" element={<Leader_1 />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
