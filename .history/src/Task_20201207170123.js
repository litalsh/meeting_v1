import React from "react";
import "./App.css";

const task = (props) => {
  

  return(
  <li className="task_item"  key={props.id} onDoubleClick={props.move}>
    <label className={props.checked}>{props.title}</label>
    <button className="remove" onClick={props.remove} onKeyDown={(e) => {if(e.ctrlKey && e.which === 77) {props.move}}} >X</button>
  </li>
)};

export default task;
