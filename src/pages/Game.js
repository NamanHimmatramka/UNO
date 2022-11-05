import "./Game.css";
import Logo from "../assets/logo.png";
import cardBack from "../assets/card-back.png";
import Y6 from "../assets/cards-front/6Y.png";
import Chat from "../components/Chat";
import { useNavigate } from "react-router-dom";
import { useEffect,useContext,useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
// import { useEffect } from "react";
import PACK_OF_CARDS from "../utils/packOfCards";
import shuffleCards from "../utils/shuffleCards";
import GameButton from "../UI/GameButton";
import { AppContext } from "../context/appContext";
import { GameContext } from "../context/gameContext";

const Game = (props) => {
  const socket=useContext(AppContext);
  const {gameObject}=useContext(GameContext);
  console.log(gameObject);
  const {gameId}=useParams();
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
  const [player1Deck,setPlayer1Deck]=useState([]);
  const [middleCard,setMiddleCard]=useState([]);
  useEffect(() => {
    const shuffledCards = shuffleCards(PACK_OF_CARDS);
    setPlayer1Deck(shuffledCards.splice(0, 7));
    setMiddleCard(shuffledCards.splice(0,1));
  }, []);
  const onCardPlayedHandler=(item)=>{
    console.log("rg");
    console.log(gameObject);
  }
  return (
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
          <GameButton red action='Draw Card'/>
          {/* <img src={Y6} alt="" className="card-middle" /> */}
          {middleCard.map((item, i) => (
            <img
              key={i}
              className="card-middle"
              // onClick={() => onCardPlayedHandler(item)}
              src={require(`../assets/cards-front/${item}.png`)}
            />
          ))}
          <GameButton green action="UNO"/>
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
  );
};
export default Game;
