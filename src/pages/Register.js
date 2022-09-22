import "./Register.css";
// import bgY from '../assets/backgrounds/bgY.png'
import logo from "../assets/logo.png";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Card from "../UI/Card";
const Register = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="register">
      <img src={logo} alt="" className="logo" />
      {/* <Card> */}
        <form onSubmit={onSubmitHandler}>
          <Input type="text" name="NAME" placeholder="VATSAL GOHIL" />
          <Input type="email" name="EMAIL" placeholder="abc@gmail.com" />
          <Input type="password" name="PASSWORD" placeholder="********" />
          <Input
            type="password"
            name="CONFIRM PASSWORD"
            placeholder="********"
          />
          <Button name="REGISTER" />
        </form>
      {/* </Card> */}
    </div>
  );
};
export default Register;
