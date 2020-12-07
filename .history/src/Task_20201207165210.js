import React from "react";
import "./App.css";

const task = (props) => {


  return(
  <li className="task_item"  key={props.id} onDoubleClick={props.move} tabIndex={1}>
    <label className={props.checked}>{props.title}</label>
    <button className="remove" onClick={props.remove} onKeyDown={props.move} >X</button>
  </li>
)};

export default task;
