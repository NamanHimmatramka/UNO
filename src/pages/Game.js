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
  const { gameObject } = useContext(GameContext);
  console.log(gameObject);
  const { gameId } = useParams();
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
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [middleCard, setMiddleCard] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const shuffledCards = shuffleCards(PACK_OF_CARDS);
    let token = localStorage.getItem("token");
    const tokenArray = token.split(" ");
    const player1Object = gameObject[tokenArray[1]];
    const temparray = [];
    for (var i in player1Object) {
      for (var j = 0; j < player1Object[i]; j++) {
        temparray.push(i);
      }
    }
    setPlayer1Deck(temparray);
    setMiddleCard(gameObject?.middle);
  }, []);

  const onCardPlayedHandler = (item) => {
    if (cardIsPlayable(item)) {
      let index=player1Deck.indexOf(item)
      // const filteredArray = player1Deck.filter((element) => element !== item);
      player1Deck.splice(index,1);
      setMiddleCard(item);
      setPlayer1Deck([...player1Deck]);
      let token = localStorage.getItem("token");
      const tokenArray = token.split(" ");
      socket.emit("card-played", {
        cardPlayed: item,
        jwt: tokenArray[1],
      });
    } else {
      setError("Card cannot be played");
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
        }}
        footer={
          <>
            <Button
              onClick={() => {
                setError();
              }}
            >
              Okay
            </Button>
          </>
        }
      >
        <h2>Please select another card or draw a card</h2>
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
            <GameButton red action="Draw Card" />

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
            <h1>Player 1</h1>
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
