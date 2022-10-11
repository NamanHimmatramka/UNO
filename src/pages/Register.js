import "./Register.css";
// import bgY from '../assets/backgrounds/bgY.png'
import logo from "../assets/logo.png";
import Input from "../UI/Input";
import { useForm } from "../hooks/form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../utils/validators";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate()
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
    console.log("Submit")
    console.log(formState)
    axios.post('/user/register', formState)
    .then((res)=>{
      console.log('Submitted')
      console.log(res)
      navigate('/')
    })
    .catch((err)=>{
      console.log('ERR')
      console.log(err);
    })
  };
  return (
    <div className="register">
      <img src={logo} alt="" className="logo" />
      {/* <Card> */}
      <form onSubmit={onSubmitHandler} className="register-form">
        <Input
          id="name"
          type="text"
          name="NAME"
          placeholder="VATSAL GOHIL"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE]}
          row
        />
        <Input
          id="email"
          type="email"
          name="EMAIL"
          placeholder="abc@gmail.com"
          onInput={inputHandler}
          validators={[VALIDATOR_EMAIL]}
          row
        />
        <Input
          id="password"
          type="password"
          name="PASSWORD"
          placeholder="********"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
          row
        />
        <Input
          row
          type="password"
          name="CONFIRM PASSWORD"
          placeholder="********"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
        />
        <button className="register-btn">REGISTER</button>
      </form>
      {/* </Card> */}
    </div>
  );
};
export default Register;
