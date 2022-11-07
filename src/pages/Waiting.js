import React from "react";
import "./Waiting.css";
import logo from "../assets/logo.png";
import GameButton from "../UI/GameButton";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { GameContext } from "../context/gameContext";

const Waiting = () => {
  const { gameId } = useParams();
  const socket = useContext(AppContext);
  const { setGameObject } = useContext(GameContext);
  const {setTurn}=useContext(GameContext);
  console.log(socket);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("game-start", (res) => {
      const gameObject = res.gameObject;
      const gameId = res.gameId;
      const turn=res.turn
      console.log(gameObject);
      setGameObject(gameObject);
      setTurn(turn);
      navigate(`/game/${gameId}`);
    });
  }, [socket, gameId]);

  return (
    <div className="waiting">
      <div className="logo-code">
        <img src={logo} alt="logo" className="logowaiting" />
        <h1 className="game-code">Game Code:{gameId}</h1>
      </div>
      <h1 className="wait-player">Waiting for Player 2 to join the game</h1>
      <div className="wait-player">
        <GameButton red action="QUIT"></GameButton>
      </div>
    </div>
  );
};

export default Waiting;
