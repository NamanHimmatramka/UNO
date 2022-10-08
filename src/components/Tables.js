import "./Tables.css";
import user1 from "../assets/profiles/user1.png";

const Tables = () => {
  return (
    <div className="tables">
      <div className="left-side">
        <h3>1</h3>
        <img src={user1} alt="" className="userLogo" />
        <h3>Parth Gujarathi</h3>
      </div>
      <h3>70%</h3>
      <h3>India</h3>
      <h3>Ama</h3>
    </div>
  );
};
export default Tables;
