import "./Game.css";
import Logo from "../assets/logo.png";
import cardBack from "../assets/card-back.png";
import Y6 from "../assets/cards-front/6Y.png";
import Chat from "../components/Chat";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PACK_OF_CARDS from "../utils/packOfCards";
import shuffleCards from "../utils/shuffleCards";
import GameButton from "../UI/GameButton";
import { AppContext } from "../context/appContext";
import { GameContext } from "../context/gameContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

const Game = (props) => {
  const socket = useContext(AppContext);
  const { gameObject, setGameObject } = useContext(GameContext);
  const { turn, setTurn } = useContext(GameContext);
  const { gameId } = useParams();
  const [token, setToken] = useState();
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [middleCard, setMiddleCard] = useState(null);
  const [error, setError] = useState(null);
  const [errorAction, setErrorAction] = useState();
  const [isTurn, setIsTurn] = useState(false);
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
  }, []);

  useEffect(() => {
    let tokenStorage = localStorage.getItem("token");
    const tokenArray = tokenStorage.split(" ");
    setToken(tokenArray[1]);
    console.log(token);
    const player1Object = gameObject[tokenArray[1]];
    console.log(player1Object);
    setIsTurn(tokenArray[1] === turn);
    const temparray = [];
    for (var i in player1Object) {
      for (var j = 0; j < player1Object[i]; j++) {
        temparray.push(i);
      }
    }
    setPlayer1Deck(temparray);
    socket.on("update-state", (res) => {
      setGameObject(res.gameObject);
      setTurn(res.turn);
    });
    setMiddleCard(gameObject?.middle);
  }, [gameObject, socket]);

  const onCardPlayedHandler = (item) => {
    if (isTurn) {
      if (cardIsPlayable(item)) {
        let index = player1Deck.indexOf(item);
        player1Deck.splice(index, 1);
        setMiddleCard(item);
        setPlayer1Deck([...player1Deck]);
        socket.emit("card-played", {
          cardPlayed: item,
          jwt: token,
          gameId: gameId,
        });
        setTurn(null);
      } else {
        setError("Card cannot be played");
        setErrorAction("Please select another card or draw a card");
      }
    } else {
      setError("Card cannot be played");
      setErrorAction("Its not your turn to play");
    }
  };

  const drawCardHandler = () => {
    if (isTurn) {
      console.log("clicked draw card");
      socket.emit("draw", {
        jwt: token,
        gameId: gameId,
      });
    } else {
      setError("Cannot draw a card");
      setErrorAction("Its not your turn to play");
    }
  };

  const cardIsPlayable = (card) => {
    const existingColour = middleCard.charAt(middleCard.length - 1);
    const cardColour = card.charAt(card.length - 1);
    const existingNumber = middleCard.substring(0, middleCard.length - 1);
    const cardNumber = card.substring(0, card.length - 1);
    if (card == "W" || card == "D4W") {
      return true;
    } else if (cardColour == existingColour) {
      return true;
    } else if (existingNumber == cardNumber) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={error}
        header={error}
        onCancel={() => {
          setError();
          setErrorAction();
        }}
        footer={
          <>
            <Button
              onClick={() => {
                setError();
                setErrorAction();
              }}
            >
              Okay
            </Button>
          </>
        }
      >
        <h2>{errorAction}</h2>
      </Modal>
      <div className="game">
        <div className="top-info">
          <img src={Logo} alt="" className="logogame" />
          <h1>Game Code:{gameId}</h1>
        </div>
        <div>
          <div className="player1deck">
            <img src={cardBack} alt="" className="card-back" />
            <img src={cardBack} alt="" className="card-back" />
            <img src={cardBack} alt="" className="card-back" />
            <img src={cardBack} alt="" className="card-back" />
            <img src={cardBack} alt="" className="card-back" />
            <img src={cardBack} alt="" className="card-back" />
            <img src={cardBack} alt="" className="card-back" />
            <h1>Player 2</h1>
          </div>
          <br />
          <div className="middle-info">
            <GameButton red action="Draw Card" onClick={drawCardHandler} />

            <img
              className="card-middle"
              src={
                middleCard
                  ? require(`../assets/cards-front/${middleCard}.png`)
                  : ""
              }
            />
            <GameButton green action="UNO" />
          </div>
          <br />
          <div className="player2deck">
            {player1Deck.map((item, i) => (
              <img
                key={i}
                className="card-front"
                onClick={() => onCardPlayedHandler(item)}
                src={require(`../assets/cards-front/${item}.png`)}
              />
            ))}
            <h1>{isTurn ? "Your Turn" : "Opponent's Turn"}</h1>
          </div>
          <div className="chatBoxWrapper">
            <Chat />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Game;
