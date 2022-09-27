import "./Home.css";
import logo from "../assets/logo.png";
const Home = () => {
  return (
    <div className="home">
      <img src={logo} alt="" className="logohome" />
      <div className="join-game">
          <input type="text" placeholder="Game Code" />
          <button className="join-btn">Join Game</button>
        </div>
      <div className="buttons">
        <button className="create-btn">Create Game</button>
      </div>
    </div>
  );
};

export default Home;
