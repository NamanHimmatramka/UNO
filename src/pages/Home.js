import "./Home.css";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import React,{ useState, useEffect, useContext, useRef } from "react";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import axios from "axios";
import GameButton from "../UI/GameButton";
import { AppContext } from "../context/appContext";
import Waiting from "./Waiting";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { GameContext } from "../context/gameContext";

const Home = () => {
  const socket = useContext(AppContext);
  const inputGameId = useRef(null);
  const [error, setError] = useState();
  const {setGameObject}=useContext(GameContext);
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
  const createGameHandler = () => {
    let token = localStorage.getItem("token");
    const tokenArray = token.split(" ");
    socket.emit("create-game", tokenArray[1]);
    socket.on("gameId", (gameId) => {
      if (gameId) {
        // router
        navigate(`/waiting/${gameId}`);
      }
    });
  };
  const joinGameHandler = () => {
    if (inputGameId.current.value==='') {
      setError('Enter a game code');  
    } else {
      let token = localStorage.getItem("token");
      const tokenArray = token.split(" ");
      console.log(inputGameId.current.value);
      socket.emit("join-game", {
        gameId: inputGameId.current.value,
        jwt: tokenArray[1],
      });
      socket.on("error", (err) => {
        setError(err.msg);
      });
      socket.on("game-start", (res) => {
        const gameObject=res.gameObject;
        const gameId=res.gameId;
        setGameObject(gameObject);
        navigate(`/game/${gameId}`);
      });
    }
  };

  const errorCancelHandler=()=>{
    setError();
    inputGameId.current.value=""
  }
  return (
    <React.Fragment>
      <Modal
      show={error}
      header={error}
      onCancel={errorCancelHandler}
      footer={<Button onClick={errorCancelHandler}>Okay</Button>}
      >

      </Modal>
      <div className="home">
        <img src={logo} alt="" className="logohome" />
        <div className="join-game">
          <input type="text" placeholder="Game Code" ref={inputGameId} />
          <GameButton green action="Join Game" onClick={joinGameHandler} />
        </div>
        <div className="create-game">
          <GameButton orange action="Create Game" onClick={createGameHandler} />
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
    </React.Fragment>
  );
};

export default Home;
