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
const Game = () => {
  return (
    <div className="game">
      <div className="top-info">
        <img src={Logo} alt="" className="logogame" />
        <h1>Game Code:Qtksp</h1>
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
            <button className="draw-card">
                Draw Card
            </button>
            <img src={Y6} alt="" className="card-middle" />
            <button className="uno">UNO</button>
        </div>
        <br />
        <div className="player2deck">
            <img src={D2Y} alt="" className="card-front"/>
            <img src={Y6} alt="" className="card-front"/>
            <img src={G5} alt="" className="card-front"/>
            <img src={RR} alt="" className="card-front"/>
            <img src={B1} alt="" className="card-front"/>
            <img src={R2} alt="" className="card-front"/>
            <img src={D4W} alt="" className="card-front"/>
            <h1>Player 2</h1>
        </div>
        <div className="chatBoxWrapper">
            <Chat/>
        </div>
      </div>
    </div>
  );
};
export default Game;
