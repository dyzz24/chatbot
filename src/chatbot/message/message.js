import React from 'react';
import './message.css';


export const Message = ({type, avatar, message}) => {


  const createMarkup = html => {
    return { __html: String(html) };
  };

  if(type === 'bot' || !type) {
    return (
      <div className = 'messageRow'>
        <div className = 'avatar'>
          <img alt = 'botava' src = {avatar}></img>
        </div>
      <span dangerouslySetInnerHTML={createMarkup(message)}></span>
      </div>
    );
  } else {
    return (
      <div className = 'messageRow reverse'>
        <div className = 'avatar'>
          <img alt = 'userava' src = {avatar}></img>
        </div>
        <span dangerouslySetInnerHTML={createMarkup(message)}></span></div>
    )
  }
}

