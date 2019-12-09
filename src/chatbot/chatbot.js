import React from 'react';
import './chatbot.css';


export default class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.chatBotConfig.title,
      botName: this.props.chatBotConfig.botName,
      boxWidth: this.props.chatBotConfig.boxWidth,
      boxHeight: this.props.chatBotConfig.boxHeight,
      avatarSrc: this.props.chatBotConfig.avatarSrc,
      messages: []
    };
  }

 

  render() {


    return (
        <div className = 'chatBot' style = {{'width': this.state.boxWidth, 'height' : this.state.boxHeight}}>
              <div className = 'chatBot__header'>
                <div className = 'header__section'>
                    <div className = 'header__botavatar'>
                    <img alt = 'botavatar' src = {this.state.avatarSrc}></img>
                    </div>
                    <span>{this.state.botName}</span>
                    </div>
                    <i className = 'closeicon'>close</i>
              </div>

              <div className = 'chatBot__body'>
              </div>
              <div className = 'chatBot__bottomblock'></div>
        </div>
      );
  }
}
