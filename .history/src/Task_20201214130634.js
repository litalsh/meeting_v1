import React from "react";
import "./App.css";

const task = (props) => {

  return(
  <li className={props.class}  key={props.id} onDoubleClick={props.move}>
    <input type="range" className={props.slider} min="1" max="20" defaultValue={props.duration} step="1" onMouseUp={props.sliderControl} onChange={(event) => props.onChange } />
    <label className={props.checked}>{props.title}</label>
    <button className="remove" onClick={props.remove}>X</button>
  </li>
)};

export default task;
