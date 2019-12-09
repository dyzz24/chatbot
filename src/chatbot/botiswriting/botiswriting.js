import React from 'react';
import './botiswriting.css';


export function BotIsWriting(props) {



  return (

      <div className = 'messageRow'>
      <div className = 'avatar'>
        <img alt = 'botava' src = {props.avatar}></img>
      </div>
      <span className = 'bigsize'><div>...</div></span></div> 
  )

}
