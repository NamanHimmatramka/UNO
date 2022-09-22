import "./Input.css";

const Input = (props) => {
  return (
    <div className="input">
        <label htmlFor="props.name">{props.name}</label>
      <input
        type={props.type}
        name={props.name}
        //   value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
};
export default Input;
