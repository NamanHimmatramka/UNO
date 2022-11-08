import "./Game.css";
import Logo from "../assets/logo.png";
import cardBack from "../assets/card-back.png";
import Chat from "../components/Chat";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import GameButton from "../UI/GameButton";
import { AppContext } from "../context/appContext";
import { GameContext } from "../context/gameContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

const Game = (props) => {
  const socket = useContext(AppContext);
  const { gameObject, setGameObject, turn, setTurn, token, setToken } =
    useContext(GameContext);
  const { gameId } = useParams();
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [middleCard, setMiddleCard] = useState(null);
  const [error, setError] = useState(null);
  const [errorAction, setErrorAction] = useState();
  const [isTurn, setIsTurn] = useState(false);
  const [draw, setDraw] = useState(true);
  const [noOfCards, setNoOfCards] = useState(7);
  const [uno, setUno] = useState(false);
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
    const player1Object = gameObject[token];
    setIsTurn(tokenArray[1] === turn);
    const temparray = [];
    for (var i in player1Object) {
      for (var j = 0; j < player1Object[i]; j++) {
        temparray.push(i);
      }
    }
    setNoOfCards(gameObject.noOfCards[token]);
    setPlayer1Deck(temparray);
    socket.on("update-state", (res) => {
      setGameObject(res.gameObject);
      setTurn(res.gameObject.turn);
    });
    socket.on("uno-called", () => {
      setError("Opponent has called UNO");
      setErrorAction("Opponent has only 1 card left");
    });
    setMiddleCard(gameObject?.middle);
  }, [gameObject, socket]);

  const onCardPlayedHandler = (item) => {
    if (isTurn) {
      if (cardIsPlayable(item)) {
        if (player1Deck.length === 2 && uno) {
          socket.emit("uno", {
            jwt: token,
            gameId: gameId,
          });
          setUno(false);
        } else if (player1Deck.length === 2 && !uno) {
          socket.emit("not-uno", {
            jwt: token,
            gameId: gameId,
          });
        }
        let index = player1Deck.indexOf(item);
        player1Deck.splice(index, 1);
        setMiddleCard(item);
        setPlayer1Deck([...player1Deck]);
        socket.emit("card-played", {
          cardPlayedObj:{
            cardPlayed: item,
          },
          jwt: token,
          gameId: gameId,
        });
        setTurn(null);
        setDraw(true);
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
      socket.emit("draw", {
        jwt: token,
        gameId: gameId,
      });
      setDraw(false);
    } else {
      setError("Cannot draw a card");
      setErrorAction("Its not your turn to play");
    }
  };

  const passHandler = () => {
    if (isTurn) {
      socket.emit("pass", {
        jwt: token,
        gameId: gameId,
      });
      setDraw(true);
    } else {
      setError("Cannot pass");
      setErrorAction("Its not your turn to play");
    }
  };

  const unoHandler = () => {
    if (isTurn) {
      if (player1Deck.length == 2) {
        setUno(true);
      } else {
        setError("Can't say UNO");
        setErrorAction("You have more than one card");
      }
    }
    else{
      setError("Can't say UNO");
      setErrorAction("Its not your turn to play");
    }
  };
  const cardIsPlayable = (card) => {
    const existingColour = middleCard.charAt(middleCard.length - 1);
    const cardColour = card.charAt(card.length - 1);
    const existingNumber = middleCard.substring(0, middleCard.length - 1);
    const cardNumber = card.substring(0, card.length - 1);
    if (card === "W" || card === "D4W") {
      return true;
    } else if (cardColour === existingColour) {
      return true;
    } else if (existingNumber === cardNumber) {
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
            {(() => {
              const back = [];
              for (let i = 0; i < noOfCards; i++) {
                // {console.log(noOfCards)}
                back.push(<img src={cardBack} alt="" className="card-back" />);
              }
              return back;
            })()}

            <h1>Player 2</h1>
          </div>
          <br />
          <div className="middle-info">
            {draw && (
              <GameButton red action="Draw Card" onClick={drawCardHandler} />
            )}
            {!draw && <GameButton red action="Pass" onClick={passHandler} />}
            <img
              className="card-middle"
              src={
                middleCard
                  ? require(`../assets/cards-front/${middleCard}.png`)
                  : ""
              }
            />
            <GameButton green action="UNO" onClick={unoHandler} />
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
            <Chat gameId={gameId} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Game;
