import "./Game.css";
import Logo from "../assets/logo.png";
import cardBack from "../assets/card-back.png";
import Y6 from "../assets/cards-front/6Y.png";
import G5 from "../assets/cards-front/5G.png";
import RR from "../assets/cards-front/_R.png";
import B1 from "../assets/cards-front/1B.png";
import R2 from "../assets/cards-front/2R.png";
import D2Y from "../assets/cards-front/D2Y.png";
import D4W from "../assets/cards-front/D4W.png";
import Chat from "../components/Chat";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
// import queryString from 'query-string';
import randomCodeGenerator from "../utils/randomCodeGenerator";
// import { useEffect } from "react";
import PACK_OF_CARDS from "../utils/packOfCards";
import shuffleCards from "../utils/shuffleCards";
import { useState } from "react";
const Game = (props) => {
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
  const [player2Deck,setPlayer2Deck]=useState([]);
  useEffect(() => {
    const shuffledCards = shuffleCards(PACK_OF_CARDS);
    setPlayer2Deck(shuffledCards.splice(0, 7));
    console.log(player2Deck);
  }, []);
  // const data = queryString.parse(props.location.search)
  return (
    <div className="game">
      <div className="top-info">
        <img src={Logo} alt="" className="logogame" />
        <h1>Game Code:{randomCodeGenerator(5)}</h1>
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
          <h1>Player 1</h1>
        </div>
        <br />
        <div className="middle-info">
          <button className="draw-card">Draw Card</button>
          <img src={Y6} alt="" className="card-middle" />
          <button className="uno">UNO</button>
        </div>
        <br />
        <div className="player2deck">
          {player2Deck.map((item, i) => (
            <img
              key={i}
              className="card-front"
              // onClick={() => onCardPlayedHandler(item)}
              src={require(`../assets/cards-front/${item}.png`)}
            />
          ))}
          {/* <img src={D2Y} alt="" className="card-front" />
          <img src={Y6} alt="" className="card-front" />
          <img src={G5} alt="" className="card-front" />
          <img src={RR} alt="" className="card-front" />
          <img src={B1} alt="" className="card-front" />
          <img src={R2} alt="" className="card-front" />
          <img src={D4W} alt="" className="card-front" /> */}
          <h1>Player 2</h1>
        </div>
        <div className="chatBoxWrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};
export default Game;
