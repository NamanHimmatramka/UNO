import "./Leaderboard.css";
import user1 from "../assets/profiles/user1.png";
import Tables from "../components/Tables";
const Leaderboard = () => {
  return (
    <div className="leaderboard">
        <div className="temp"></div>
      <div className="header-info">
        <div className="top-left">
          <p>69</p>
          <img src={user1} alt="" className="userLogo" />
          <h3>Vatsal Gohil</h3>
        </div>
        <h3>69.69%</h3>
        <h3>India</h3>
        <h3>Amateur</h3>
      </div>
      <Tables/>
    </div>
  );
};
export default Leaderboard;
