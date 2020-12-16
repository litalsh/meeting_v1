import React from "react";
import "./App.css";

const task = (props) => {

  return(
  <li className={props.class}  key={props.id} onDoubleClick={props.move}>
    <input type="range" className={props.slider} 
    min="1" max="20" step="1"
    defaultValue={props.duration} 
    onMouseUp={props.sliderControl} 
    onChange={e=>props.change(e.target.value)} />
    <label className={props.checked}>{props.title}</label>
    <button className="remove" onClick={props.remove}>X</button>
  </li>
)};

export default task;
