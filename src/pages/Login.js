import { useForm } from "../hooks/form-hook";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import "./Login.css";
import logo from "../assets/logo.png";
import { useRef } from "react";

export default function () {
  const [loginState, setLoginState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://arcane-badlands-93459.herokuapp.com/protected", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((err) => {});
  });
  const [formState, inputHandler] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Submit");
    console.log(formState);
    axios
      .post("https://uno-server.onrender.com/user/login", formState)
      .then((res) => {
        console.log("Submitted");
        console.log(res);
        if (!res.data.success) {
          if (res.data.msg === "User Not Registered") {
            setErrorMessage("User Not Registered!! Register first");
          } else {
            setErrorMessage("Invalid Password!! Try Again");
          }
          setLoginState(true);
        }
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log("ERR");
        console.log(err);
      });
  };
  const loginErrorHandler = () => {
    setLoginState(false);
  };
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const emailChangeHandler = () => {
    console.log(emailRef.current.value);
    inputHandler("email", emailRef.current.value, true);
  };
  const passChangeHandler = () => {
    inputHandler("password", passRef.current.value, true);
  };
  return (
    <div className="login_p">
      <Modal
        show={loginState}
        header="An Error Occurred!"
        onCancel={loginErrorHandler}
        footer={<Button onClick={loginErrorHandler}>Okay</Button>}
      >
        {errorMessage}
      </Modal>
      <img src={logo} alt="logo" className="logologin" />
      <div className="center">
        <h1>Login</h1>
        <form method="post" onSubmit={onSubmitHandler}>
          <div className="txt_field">
            <input
              type="email"
              required
              id="email"
              onChange={emailChangeHandler}
              ref={emailRef}
            />
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              onChange={passChangeHandler}
              ref={passRef}
            />
            <span></span>
            <label>Password</label>
          </div>
          <div className="pass">Forgot Password?</div>
          <input type="submit" value="Login" />
          <Link to="/register">
            <div className="signup_link">
              Not a Player? Signup
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
