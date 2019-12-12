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
          <div className = 'btnwrapper'>
          <i className={props.hide ? 'hide active' : 'hide'} onClick = {props.hideBot} title = 'Свернуть'></i>
          <i className={props.full ? "full active" : 'full'} onClick = {props.fullScreen} title = 'Полный экран'></i>
          </div>
        </div>
  )
}
