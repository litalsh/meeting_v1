import React from "react";
import "./App.css";

const task = (props) => {

  return(
  <li className={props.class}  key={props.id} onDoubleClick={props.move}>
    <input type="range"
    <label className={props.checked}>{props.title}</label>
    <button className="remove" onClick={props.remove}>X</button>
  </li>
)};

export default task;
