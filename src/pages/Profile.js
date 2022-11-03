import "./Profile.css";
import logo from "../assets/logo.png";
import user1 from "../assets/profiles/user1.png";
import user2 from "../assets/profiles/user2.png";
import user3 from "../assets/profiles/user3.png";
import user4 from "../assets/profiles/user4.png";
import Opponent from "../components/Opponent";
import India from "../assets/flags/india.png";
import leaderboard from "../assets/Leaderboard.png";
import home from "../assets/home.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logout from "../assets/logout.png";
import { useState } from "react";
import Modal from "../UI/Modal.js";
import Button from "../UI/Button";
import { ImagePicker } from "react-file-picker";
const Profile = () => {
  let navigate = useNavigate();
  let user
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
        axios.get("http://localhost:3001/profile/user", {
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
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const confirmLogout = () => {
    localStorage.clear()
    navigate('/')
  };
  const updateProfileHandler = () => {
    setUpdateModal(true);
    console.log(updateModal);
  };
  const closeUpdateModal = () => {
    setUpdateModal(false);
  };
  const changeProfileImage = () => {};
  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeModal}
        header="Are you sure?"
        contentCLass="modal-content"
        footerClass="modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeModal}>
              Cancel
            </Button>
            <Button danger onClick={confirmLogout}>
              Logout
            </Button>
          </React.Fragment>
        }
      >
        Do you want to logout
      </Modal>
      <Modal
        show={updateModal}
        header="Update Profile Image??"
        onCancel={closeUpdateModal}
        contentCLass="modal-content"
        footerClass="modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeUpdateModal}>
              Cancel
            </Button>
            <Button danger onClick={changeProfileImage}>
              Update
            </Button>
          </React.Fragment>
        }
      >
        <React.Fragment>
          <ImagePicker
            extensions={["jpeg"]}
            dims={{
              minWidth: 100,
              maxWidth: 500,
              minHeight: 100,
              maxHeight: 500,
            }}
            // onChange={base64 => (/* do something with base64 encoded string */)
            // onError={errMsg => (/* do something with err msg string */)
          >
            <button>Click to upload image</button>
          </ImagePicker>
        </React.Fragment>
      </Modal>
      <div className="profile">
        <div className="left">
          <img src={logo} alt="" className="logoProfile" />
          <div className="profile-section">
            <img
              className="profile-background"
              src={user1}
              onClick={updateProfileHandler}
            ></img>
            <div className="profile-info">
              <h1 className="name">Parth Gujarathi</h1>
              <h2 className="rank">Amateur</h2>
              <img className="flag" src={India} alt="" />
            </div>
          </div>
          <div className="icons">
            <Link to="/leader">
              <img src={leaderboard} alt="" className="leaderboard-icon" />
            </Link>
            <Link to="/home">
              <img src={home} alt="" className="home-icon" />
            </Link>
          </div>
        </div>
        <div className="right">
          <img
            src={logout}
            alt=""
            className="logout-icon"
            onClick={openModal}
          />
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
    </React.Fragment>
  );
};
export default Profile;
