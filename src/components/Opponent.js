import "./Opponent.css";
// import user2 from '../assets/profiles/user2.png'
import trophy from "../assets/trophy.png";
const Opponent = (props) => {
  return (
    <div className="opponent">
      <div className="user">
        <img src={props.image} alt="" />
        <h4>{props.name}</h4>
      </div>
      {props.winner && (
        <div className="trophy-div">
          <img className="trophy" src={trophy} alt="" />
        </div>
      )}
    </div>
  );
};
export default Opponent;
