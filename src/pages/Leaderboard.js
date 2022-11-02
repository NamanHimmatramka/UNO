import "./Leaderboard.css";
import user1 from "../assets/profiles/user1.png";
import Tables from "../components/Tables";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const Leaderboard = () => {
  let navigate = useNavigate()
  useEffect(() => {
    console.log('IN')
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3001/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        axios.get("http://localhost:3001/leaderboard/", {
          headers:{
            Authorization: token,
          }
        })
        .then((res)=>{
          console.log(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  });
  return (
    <div className="leaderboard">
        <div className="temp"></div>
      <div className="header-info">
        <div className="top-left">
          <p>80</p>
          <img src={user1} alt="" className="userLogo" />
          <h3>Vatsal Gohil</h3>
        </div>
        <h3>85%</h3>
        <h3>India</h3>
        <h3>Amateur</h3>
      </div>
     
    </div>
  );
};
export default Leaderboard;
