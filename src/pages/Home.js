import "./Home.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import axios from "axios";
import GameButton from "../UI/GameButton";
const Home = () => {
  let navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3001/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  });
  const [roomCode, setRoomCode] = useState("");
  const roomCodeChangeHandler = (event) => {
    setRoomCode(event.target.value);
  };
  return (
    <div className="home">
      <img src={logo} alt="" className="logohome" />
      <div className="join-game">
        <input type="text" placeholder="Game Code" />
        <Link to={`/game`}>
          <GameButton green action="Join Game" />
        </Link>
      </div>
      <div className="create-game">
        <Link to={`/game`}>
          <GameButton orange action="Create Game" />
        </Link>
      </div>
      <Link to="/profile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          class="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Home;
