import React from 'react';
import './header.css';



export const Header = ({botAvatarSrc, botName, hideBot, fullScreen, ...other }) => {


  return(
    <div className="chatBot__header">
          <div className="header__section">
            <div className="header__botavatar">
              <img alt="botavatar" src={botAvatarSrc}></img>
            </div>
            <span>{botName}</span>
          </div>
          <div className = 'btnwrapper'>
          <i className={hideBot ? 'hide active' : 'hide'} onClick = {other.hideBotMod} title = 'Свернуть'></i>
          <i className={fullScreen ? "full active" : 'full'} onClick = {other.fullScreenMod} title = 'Полный экран'></i>
          </div>
        </div>
  )
}
