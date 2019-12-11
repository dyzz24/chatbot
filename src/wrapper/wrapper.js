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
        boxHeight: 750,
        botAvatarSrc: 'https://igorzuevich.com/wp-content/uploads/2018/01/chat-bot-v-telegram.png',
        userAvatarSrc: 'https://img.icons8.com/dusk/2x/user.png',
        messageTimeOut: 50,
        helloMessages: [{type: 'bot', message: 'Привет!', id: 0},
        {type: 'bot', message: 'Я бот, меня зовут Тупак', id: 1},
        {type: 'bot', message: 'Как тебя зовут?', id: 2}
      ],
      macrosList: [
        {title: 'Помощь', command:'/help '}, 
        {title: 'Игра', command:'/play '},
        {title: 'Погода', command:'/weather '},
        {title: 'Перевод', command:'/translate '},
        {title: 'Бестселлеры', command: '/bestsellers'},
        {title: 'Очистить', command: '/clear'}
      ]
      }
    };
  }


  render() {


    return (<ChatBot chatBotConfig = {this.state.chatBotConfig}></ChatBot>);
  }
}
