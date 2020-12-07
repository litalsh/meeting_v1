import React from "react";
import "./App.css";

const task = (props) => {
  const keyboardCangeListHandler = (e) => {
    
    if (e.ctrlKey && e.which === 77) {
      props.move;
    }
  }

  return(
  <li className="task_item"  key={props.id} onDoubleClick={props.move}>
    <label className={props.checked}>{props.title}</label>
    <button className="remove" onClick={props.remove} onKeyPress={keyboardCangeListHandler}>X</button>
  </li>
)};

export default task;
