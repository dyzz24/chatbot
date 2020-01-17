import React from 'react';
import './botiswriting.css';


export function BotIsWriting({avatar}) {



  return (

      <div className = 'messageRow'>
      <div className = 'avatar'>
        <img alt = 'botava' src = {avatar}></img>
      </div>
      <span className = 'bigsize'><div>...</div></span></div> 
  )

}
