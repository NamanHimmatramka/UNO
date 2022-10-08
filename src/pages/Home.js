import "./Home.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import randomCodeGenerator from '../utils/randomCodeGenerator';
const Home = () => {
  const [roomCode, setRoomCode] = useState('');
  const roomCodeChangeHandler=(event)=>{
    setRoomCode(event.target.value);
  }
  return (
    <div className="home">
      <img src={logo} alt="" className="logohome" />
      <div className="join-game">
        <input type="text" placeholder="Game Code" />
        <Link to={`/game`}>
          <button className="join-btn">Join Game</button>
        </Link>
      </div>
      <div className="buttons">
        <Link to={`/game`}>
          <button className="create-btn">Create Game</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
