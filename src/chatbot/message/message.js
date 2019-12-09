import React from 'react';
import './message.css';


export function Message(props) {

  const mType = props.type;

  if(mType === 'bot' || !mType) {
    return (
      <div className = 'messageRow'>
        <div className = 'avatar'>
          <img alt = 'botava' src = {props.avatar}></img>
        </div>
    <span>{props.message}</span></div>
    )
  }

  if(mType === 'user') {
    return (
      <div className = 'messageRow reverse'>
        <div className = 'avatar'>
          <img alt = 'userava' src = {props.avatar}></img>
        </div>
        <span>{props.message}</span></div>
    )
  }



}
