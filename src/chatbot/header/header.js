import React from 'react';
import './header.css';



export const Header = (props) => {

  

  return(
    <div className="chatBot__header">
          <div className="header__section">
            <div className="header__botavatar">
              <img alt="botavatar" src={props.botAvatarSrc}></img>
            </div>
            <span>{props.botName}</span>
          </div>
          <i className="closeicon" onClick = {props.hideBot}>close</i>
          <i className="closeicon" onClick = {props.fullScreen}>fullscrean</i>
        </div>
  )
}
