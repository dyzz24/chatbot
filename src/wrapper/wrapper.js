import React from 'react';
import './wrapper.css';
import ChatBot from '../chatbot/chatbot';


export default class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatBotConfig : {
        title: 'Чат-бот',
        botName: 'Тупак',
        boxWidth: 400,
        boxHeight: 600,
        avatarSrc: 'https://igorzuevich.com/wp-content/uploads/2018/01/chat-bot-v-telegram.png'
      }
    };
  }


  render() {


    return (<ChatBot chatBotConfig = {this.state.chatBotConfig}></ChatBot>);
  }
}
