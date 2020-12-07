import React from "react";
import "./App.css";

const task = (props) => (
  <li className="task_item"  key={props.id} onDoubleClick={props.move}>
    <label className={props.checked}>{props.title}</label>
    <button className="remove" onClick={props.remove}>X</button>
  </li>
);

export default task;
