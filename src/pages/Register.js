import "./Register.css";
import logo from "../assets/logo.png";
import { useForm } from "../hooks/form-hook";
import React,{useRef,useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
export default function () {
  const [registerState, setRegisterState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();
  const [formState, inputHandler] = useForm({
    name: {
      value: "",
      isValid: false,
    },
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
      .post("http://localhost:3001/user/register", formState)
      .then((res) => {
        console.log("Submitted");
        console.log(res);
        if (!res.data.success) {
          if (res.data.msg === "User already registered") {
            console.log("hello")
            setRegisterState(true);
            setErrorMessage("User already registered!!")
          }
          else{
            setRegisterState(true);
            setErrorMessage("Some other error occured");
          }
        }
        if(res.data.success){
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("ERR");
        console.log(err);
      });
  };
  const registerErrorHandler = () => {
    setRegisterState(false);
  };
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const nameRef = useRef(null);
  const countryRef = useRef(null);
  const emailChangeHandler = () => {
    inputHandler("email", emailRef.current.value, true);
  };
  const passChangeHandler = () => {
    inputHandler("password", passRef.current.value, true);
  };
  const nameChangeHandler = () => {
    inputHandler("name", nameRef.current.value, true);
  };
  const countryChangeHandler = () => {
    inputHandler("country", countryRef.current.value, true);
  };
  return (
    <div className="register_p">
      <Modal
        show={registerState}
        header="An Error Occurred!"
        onCancel={registerErrorHandler}
        footer={<Button onClick={registerErrorHandler}>Okay</Button>}
      >
        {errorMessage}
      </Modal>
      <img src={logo} alt="logo" className="logoregister" />
      <div className="center">
        <h1>Register</h1>
        <form method="post" onSubmit={onSubmitHandler}>
          <div className="txt_field">
            <input type="text" required onChange={nameChangeHandler}
              ref={nameRef} />
            <span></span>
            <label>Name</label>
          </div>

          <div className="txt_field">
            <input
              type="email"
              required
              onChange={emailChangeHandler}
              ref={emailRef}
            />
            <span></span>
            <label>Email ID</label>
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

          <div className="txt_field">
            <input type="text" required onChange={countryChangeHandler}
              ref={countryRef}/>
            <span></span>
            <label>Country</label>
          </div>

          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}
