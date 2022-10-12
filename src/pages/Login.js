import "./Login.css";
import logo from "../assets/logo.png";
import Input from "../UI/Input";
import { useForm } from "../hooks/form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../utils/validators";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
const Login = () => {
  const [loginState, setLoginState] = useState(true);
  let navigate = useNavigate();
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
        navigate("/home");
      })
      .catch((err) => {
        // console.log(err);
      });
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
      .post("/user/login", formState)
      .then((res) => {
        console.log("Submitted");
        console.log(res);
        if(!res.data.success){
          setLoginState(true)
        }
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      })
      .catch((err) => {
        console.log("ERR");
        // setLoginState(true);
        console.log(err);
      });
  };
  const loginErrorHandler = () => {
    setLoginState(false);
  };
  return (
    <React.Fragment>
      <Modal
        show={loginState}
        header="An Error Occurred!"
        //  onCancel={}
        footer={<Button onClick={loginErrorHandler}>Okay</Button>}
      >
        Invalid Credentials!! Please try again.
      </Modal>
      <div className="login">
        <img src={logo} alt="logo" className="logologin" />
        <form onSubmit={onSubmitHandler} className="login-form">
          {/* <label htmlFor="email">Email</label>
        <input type="email" placeholder="abc@gmail.com" /> */}
          <Input
            id="email"
            type="email"
            name="EMAIL"
            placeholder="abc@gmail.com"
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL]}
            column
          />
          <Input
            id="password"
            type="password"
            name="PASSWORD"
            placeholder="********"
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            column
          />
          <a href="" className="forgot">
            Forgot Password?
          </a>
          <a href="/register" className="new-user">
            New User? Register Here
          </a>
          <button className="login-btn">LOGIN</button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default Login;
