import "./GameButton.css";
const GameButton = (props) => {
  return (
    <button
      className={` game-button ${props.green && "green"} ${
        props.orange && "orange"
      } ${props.red && 'red'}`}
      onClick={props.onClick}
    >
      {props.action}
    </button>
  );
};
export default GameButton;
