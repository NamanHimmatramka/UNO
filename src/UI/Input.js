import { useState, useReducer,useEffect } from "react";
import "./Input.css";
import { validate } from "../utils/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });
  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    props.onInput(props.id, inputState.value, inputState.isValid);
  }, [id, value, isValid, onInput]);
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };
  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };
  return (
    <div
      className={`${(props.row && "input-row") || (props.column && "input-column")}
      ${!inputState.isValid && inputState.isTouched && "input-row--invalid"}`}
    >
      <label htmlFor="props.name">{props.name}</label>
      <input
        id={props.id}
        type={props.type}
        name={props.name} 
        //   value={props.value}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
      />
    </div>
  );
};
export default Input;
