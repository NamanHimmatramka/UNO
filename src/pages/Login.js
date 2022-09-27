import "./Login.css";
import logo from "../assets/logo.png";
import Input from "../UI/Input";
const Login = () => {
  return (
    <div className="login">
      <form action="" className="login-form">
        <img src={logo} alt="logo" className="logologin" />
        <Input type="email" name="EMAIL" placeholder="abc@gmail.com" column />
        <Input type="password" name="PASSWORD" placeholder="********" column />
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
