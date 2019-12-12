import React from 'react';
import Httpservice from '../httpservice/httpservice';

export default class SupportFeatures extends React.Component {
  http = new Httpservice();
  API = 'https://api.openweathermap.org/data/2.5/weather?q=';
  APIID = '&appid=0f49363de5af37c512e1a84dd3bab4dd';

  NEWSAPI = `https://newsapi.org/v2/everything?`
  NEWSAPIID = `&apiKey=3b6b407a27cb4e4aae3d332cccb3b103`

  messageGenerate(type, text, id) {
    const message = {
      id: id + Math.random(),
      type: type,
      message: text
    };

    return message;
  }

  parseUserEnter(userString) {
    const text = userString.trim();

    if (text.match(/^help$/) || text.match(/^\/help$/)) {
      return { command: 'help' };
    } else if (text.match(/\/play/)) {
      const number = Number(text.replace('/play', ''));
      if (number >= 100 || number < 1 || !number) {
        return { command: 'play', subCommand: 'invalidNumber' };
      } else {
        return { command: 'play', subCommand: number };
      }
    } else if (text.match(/\/weather/)) {
      const cityName = text.replace('/weather', '').trim();
      return { command: 'weather', subCommand: cityName };
    } else if (text.match(/\/translate/)) {
      const translateTxt = text.replace('/translate', '').trim();
      return { command: 'translate', subCommand: translateTxt };
    } else if (text.match(/\/bestsellers/)) {
      return { command: 'bestsellers' };
    } else if (text.match(/\/clear/)) {
      return { command: 'clear' };
    }  else if (text.match(/\/news/)) {
      const news = text.replace('/news', '').trim();
      return { command: 'news', subCommand: news };
    }
    else {
      return { command: 'null' };
    }
  }

  // * for play */
  randomNumberGenerate() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber;
  }

  numberComprasion(randomNumber, userNumber) {
    if (randomNumber > userNumber) {
      return 'Я выиграл';
    }

    if (randomNumber < userNumber) {
      return 'Ты выиграл';
    }

    if (randomNumber === userNumber) {
      return 'Ничья';
    }
  }

  async getWeather(cityName) {
    const data = this.http.getData(`${this.API}${cityName}${this.APIID}`);
    return data;
  }

  async getTranslate(text) {
    const data = this.http
      .getOtherData(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=
    trnsl.1.1.20191210T104539Z.2eeb161aebc81077.45334090b358589ba100668eaa847973ede8bcc7&text=${text}&lang=ru`);
    return data;
  }

  async getBestsellers() {
    const data = this.http.getOtherData(
      `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=3RyIGqWqdJRZwGpSYM6WJLkXGHXQceCx`
    );
    return data;
  }

  async getLastNews(newsFrom) {
    const data = this.http.getOtherData(
      `${this.NEWSAPI}q=${newsFrom}&sortBy=publishedAt${this.NEWSAPIID}`
    );
    return data;
  }

  parseBestsellers(bestArray, descriptSlice, maxBestsellersCount) {
    if (bestArray && bestArray.length > 0) {
      const bestSellers = bestArray
        .filter((v, ind) => ind < maxBestsellersCount)
        .map(items => {
          items.description = items.description.slice(0, descriptSlice) + '...';
          const { author, description, title } = items;
          return { author, description, title };
        })
        .map(item => {
          const oneString = `<p class = 'authorString'> Автор: ${item.author}</p>  <p> Название: ${item.title} </p>  <p> Описание: ${item.description} </p>`;
          return oneString;
        });

      return bestSellers;
    }
  }
}
