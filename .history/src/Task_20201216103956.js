import React from "react";
import "./App.css";

const task = (props) => {
  let minutes = Math.floor(props.duration / 60);
  let seconds = Math.abs(props.duration % 60);
  minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
  seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;

  return(
  <li className={props.class}  key={props.id} onDoubleClick={props.move}>
    <div className={props.sliderClass}>
      <span className="duration-display">{minutes}:{seconds}</span>
      <input type="range" className="show-slider" 
      min="1" max="20" step="1"
      defaultValue={props.duration} 
      onMouseUp={props.sliderControl} 
      onChange={e=>props.change(e.target.value)} />
    </div>
    <label className={props.checked}>{props.title}</label>
    <button className="remove" onClick={props.remove}>X</button>
  </li>
)};

export default task;
