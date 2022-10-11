import "./Home.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import axios from "axios";
const Home = () => {
  let navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    axios.get('http://localhost:3001/protected', {headers: {
      Authorization: token
    }}).then((res)=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
      navigate('/')
    })
  })
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
          <button className="join-btn">Join Game</button>
        </Link>
      </div>
      <div className="buttons">
        <Link to={`/game`}>
          <button className="create-btn">Create Game</button>
        </Link>
      </div>
      <Link to="/profile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="black"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="black"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Home;
