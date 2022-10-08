import "./Login.css";
import logo from "../assets/logo.png";
import Input from "../UI/Input";
import {useForm} from "../hooks/form-hook"
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../utils/validators";

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
  return (
    <div className="login">
      <form action="" className="login-form">
        <img src={logo} alt="logo" className="logologin" />
        <Input
          type="email"
          name="EMAIL"
          placeholder="abc@gmail.com"
          onInput={inputHandler}
          validators={[VALIDATOR_EMAIL]}
          column
        />
        <Input
          type="password"
          name="PASSWORD"
          placeholder="********"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
          column
        />
      </form>
      <a href="" className="forgot">
        Forgot Password?
      </a>
      <a href="" className="new-user">
        New User? Register Here
      </a>
      <button className="login-btn">LOGIN</button>
    </div>
  );
};
export default Login;
