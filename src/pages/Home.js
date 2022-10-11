import "./Home.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import randomCodeGenerator from '../utils/randomCodeGenerator';
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
