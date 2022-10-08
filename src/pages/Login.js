import "./Login.css";
import logo from "../assets/logo.png";
import Input from "../UI/Input";
import {useForm} from "../hooks/form-hook"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../utils/validators";
import axios from "axios";

const Login = () => {
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
    console.log("Submit")
    console.log(formState)
    axios.post('/user/login', formState)
    .then((res)=>{
      console.log('Submitted')
      console.log(res)
    })
    .catch((err)=>{
      console.log('ERR')
      console.log(err);
    })
  };
  return (
    <div className="login">
      <img src={logo} alt="logo" className="logologin" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <Input
          id = "email"
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
      <a href="" className="new-user">
        New User? Register Here
      </a>
      <button className="login-btn">LOGIN</button>
      </form>
    </div>
  );
};
export default Login;
