import React from 'react';
import './wrapper.css';
import ChatBot from '../chatbot/chatbot';



const Wrapper = () => {


    const botData = {
        title: 'Чат-бот',
        botName: 'Test-bot',
        boxWidth: 400,
        boxHeight: 750,
        botAvatarSrc: 'https://cdn1.iconfinder.com/data/icons/artificial-intelligence-1-2/128/Bot-Robot-Chatbot-Tech-Profile-Automation-Avatar-512.png',
        userAvatarSrc: 'https://static.tildacdn.com/tild6132-3763-4335-b739-303361623230/avatar1.png',
        messageTimeOut: 1100,
        helloMessages: [{type: 'bot', message: 'Привет!', id: 0},
        {type: 'bot', message: `Я бот, меня зовут Test-bot`, id: 1},
        {type: 'bot', message: 'Как тебя зовут?', id: 2}
      ],
      macrosList: [
        {title: 'Помощь', command:'/help '},
        {title: 'Игра', command:'/play '},
        {title: 'Погода', command:'/weather '},
        {title: 'Перевод', command:'/translate '},
        {title: 'Бестселлеры', command: '/bestsellers '},
        {title: 'Новости', command: '/news '},
        {title: 'Очистить', command: '/clear '}
      ]
    };


    return (<ChatBot chatBotConfig = {botData}></ChatBot>);
}


export default Wrapper;
