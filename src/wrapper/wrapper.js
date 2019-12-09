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
        botAvatarSrc: 'https://igorzuevich.com/wp-content/uploads/2018/01/chat-bot-v-telegram.png',
        userAvatarSrc: 'https://img.icons8.com/dusk/2x/user.png',
        messageTimeOut: 60,
        helloMessages: [{type: 'bot', message: 'Привет!', id: 0},
        {type: 'bot', message: 'я твоя тётушка мМолли', id: 1},
        {type: 'bot', message: 'Как звать тебя мать твою', id: 2}
      ]
      }
    };
  }


  render() {


    return (<ChatBot chatBotConfig = {this.state.chatBotConfig}></ChatBot>);
  }
}
