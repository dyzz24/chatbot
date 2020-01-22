import React from 'react';
import SupportFeatures from '../support-features/support-features';
import Httpservice from '../httpservice/httpservice';
import { APIDATA } from '../APIDATA';

export default class Actions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }



  supportFeatures = SupportFeatures(APIDATA, Httpservice);

  switchActions = (action, subAction) => {
    switch (action) {
      case 'help':
        this.caseHelp();
        break;

      case 'play':
        this.casePlay(subAction);
        break;

      case 'weather':
        this.caseWeather(subAction);
        break;

      case 'translate':
        this.caseTranslate(subAction);
        break;

      case 'bestsellers':
        this.caseBestsellers();
        break;

      case 'news':
        this.caseNews(subAction);
        break;

      case 'clear':
        this.props.clearMessages();
        break;

      case 'null':
        this.props.addBotMessage(`Такой комманды нет`);
        break;

      default:
        break;
    }
  };

  caseHelp() {
    const helpMessagesArray = [
      `Список доступных комманд:
      /play число - Загадываете число от 1 до 100 и соревнуйся с ботом в везении`,
      `/weather Имя города (англ) - Получить прогноз погоды в конкретном городе`,
      `/translate текст на английском - Перевести слово / группу слов с английского на русский`,
      `/bestsellers - загрузить список из 5 бестселлеров по версии NY times с кратким описанием`,
      `/news Новость - загрузить 5 новостей по заданному запросу`,
      `/clear - Очистить чат`
    ];
    helpMessagesArray.forEach(mess => this.props.addBotMessage(mess));
  }

  casePlay(subAction) {
    switch (subAction) {
      case 'invalidNumber':
        this.props.addBotMessage(`Не верный номер (от 1 до 100)`);
        break;

      default:
        this.props.addMessage('bot', 'Кидаю кости');

        this.handlerParentState(true);
        setTimeout(() => {
          const number = this.supportFeatures.randomNumberGenerate();
          this.handlerParentState(false);
          this.props.addBotMessage(`Моё число ${number}`);
          this.props.addBotMessage(
            this.supportFeatures.numberComprasion(number, subAction)
          );
        }, 2000);
    }
  }

  caseWeather(subAction) {
    this.props.addMessage('bot', `Запрашиваю погоду в городе ${subAction}`);
    this.handlerParentState(true);

    this.supportFeatures
      .getWeather(subAction)
      .then(response => {
        this.props
          .addBotMessage(`В городе ${response.name} температура ${response.temp}C,
          давление ${response.pressure}мм.рт.ст., скорость ветра ${response.windSpeed}м/с`);
      })
      .catch(v => this.props.addBotMessage('Город не найден'));
  }

  caseTranslate(subAction) {
    this.handlerParentState(true);
    this.supportFeatures
      .getTranslate(subAction)
      .then(result =>
        this.props.addBotMessage(`Перевод: " ${result.text[0]} "`)
      )
      .catch(() => this.props.addBotMessage('Не удалось перевести'));
  }

  caseBestsellers() {
    this.handlerParentState(true);
    this.supportFeatures
      .getBestsellers()
      .then(result => {
        const bestSellersArr = this.supportFeatures.parseBestsellers(
          result.results,
          85,
          5
        );
        bestSellersArr.forEach(book => {
          this.props.addBotMessage(book);
        });
      })
      .catch(() => {});
  }

  caseNews(subAction) {
    this.handlerParentState(true);
    this.supportFeatures
      .getLastNews(subAction)
      .then(
        result => {
          const newsArr = this.supportFeatures.parseBestsellers(
            result.articles,
            200,
            5
          );

          newsArr.forEach(news => {
            this.props.addBotMessage(news);
          });
        }
      )
      .catch(() => this.props.addBotMessage('Не удалось найти новости'));
  }

  handlerParentState(flag) {
    this.props.handlerParentState(flag);
  }

  render() {
    return null;
  }
}
