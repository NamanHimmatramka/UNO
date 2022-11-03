import React from "react";
import "./Waiting.css";
import logo from "../assets/logo.png";
import GameButton from "../UI/GameButton";
import {useParams} from 'react-router-dom';

const Waiting = () => {
  const {gameId}=useParams();
  return (
    <div className="waiting">
      <div className="logo-code">
        <img src={logo} alt="logo" className="logowaiting" />
        <h1 className="game-code">Game Code:{gameId}</h1>
      </div>
      <h1 className="wait-player">Waiting for Plater 2 to join the game</h1>
      <div className="wait-player">
        <GameButton red action="QUIT"></GameButton>
      </div>
    </div>
  );
};

export default Waiting;
