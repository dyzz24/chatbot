import React from 'react';



export default class SupportFeatures extends React.Component {
  


  messageGenerate(type, text, id) {
    const message = {
      id: id + Math.random(),
      type: type,
      message: text
    };

    return message
  }

  parseUserEnter(userString) {

    const text = userString.trim();

    if (text.match(/^help$/) || text.match(/^\/help$/)) {

      return {command: 'help'}

    } else if (text.match(/\/play/)) {

        const number = Number(text.replace('/play', ''));
        if (number >= 100 || number < 1 || !number) {
          return {command: 'play', subCommand: 'invalidNumber'}
        } else {
          return {command: 'play', subCommand: number}
        }

    }  else if (text.match(/\/weather/)) {

      const cityName = text.replace('/weather', '').trim();
      return {command: 'weather', subCommand: cityName}


  }

    else {
      return {command: 'null'}
    }
  }

  randomNumberGenerate() {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      return randomNumber;
  }

  numberComprasion(randomNumber, userNumber) {
      if (randomNumber > userNumber) {
        return 'Бот выиграл'
      }

      if (randomNumber < userNumber) {
        return 'Ты выиграл'
      }

      if (randomNumber == userNumber) {
        return 'Ничья'
      }
  }

}
