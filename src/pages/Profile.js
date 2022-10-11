import "./Profile.css";
import logo from "../assets/logo.png";
import user1 from "../assets/profiles/user1.png";
import user2 from "../assets/profiles/user2.png";
import user3 from "../assets/profiles/user3.png";
import user4 from "../assets/profiles/user4.png";
import Opponent from "../components/Opponent";
import India from "../assets/flags/india.png";
import leaderboard from "../assets/Leaderboard.png";
import home from "../assets/home.png"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const Profile = () => {
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
  return (
    <div className="profile">
      <div className="left">
        <img src={logo} alt="" className="logoProfile" />
        <div className="profile-section">
          <img className="profile-background" src={user1}></img>
          <div className="profile-info">
            <h1 className="name">Parth Gujarathi</h1>
            <h2 className="rank">Amateur</h2>
            <img className="flag" src={India} alt="" />
          </div>
        </div>
        <div className="icons">
          <img src={leaderboard} alt="" className="leaderboard" />
          <img src={home} alt="" className="home-icon" />
        </div>
      </div>
      <div className="right">
        <div className="games-info">
          <h3>Games Played</h3>
          <h3>16</h3>
          <h3>Wins</h3>
          <h3>10</h3>
          <h3>Win Percentage</h3>
          <h3>62.5%</h3>
        </div>
        <div className="game-history">
          <h2>Game History</h2>
        </div>
        <Opponent name="Vatsal Gohil" image={user2} winner />
        <Opponent name="Khushal Dhanuka" image={user3} />
        <Opponent name="Naman Himmatramka" image={user4} winner />
      </div>
    </div>
  );
};
export default Profile;
