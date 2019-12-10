import React from 'react';
import SupportFeatures from '../support-features/support-features';


export default class Actions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  supportFeatures = new SupportFeatures();


    switchActions = (action, subAction) => {
      switch(action) {
            case 'help':
            this.props.addBotMessage(`Список доступных комманд:
            /play число - Загадываете число от 1 до 100 и соревнуйся с ботом в везении
            `);
            this.props.addBotMessage(`/weather Имя города (англ) - Получить прогноз погоды в конкретном городе`);
            break;
  
            case 'play':
                switch(subAction) {
                      case 'invalidNumber':
                      this.props.addBotMessage(`Не верный номер (от 1 до 100)`);
                      break;

                      default:
                      this.props.addMessage('bot', 'Кидаю кости');

                      this.handlerParentState(true);
                      setTimeout(() => {
                            const number = this.supportFeatures.randomNumberGenerate();
                            this.props.addBotMessage(`Моё число ${number}`);
                            this.props.addBotMessage(this.supportFeatures.numberComprasion(number, subAction));
                            this.handlerParentState(false);
                      }, 2000);
                }
            break;

            case 'weather':
            this.props.addMessage('bot', `Запрашиваю погоду в городе ${subAction}`);
            this.handlerParentState(true);
            // this.getWeather(subAction)
            break;
  
            case 'null':
            this.props.addBotMessage(`Такой комманды нет`);
            break;
  
            default :
            break;
      }

    }

    handlerParentState(flag) {
      this.props.handlerParentState(flag)
    }

    render() {
      return (<p></p>)
    }



}

