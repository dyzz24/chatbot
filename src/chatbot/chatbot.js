import React from 'react';
import './chatbot.css';
import { Message } from './message/message';
import { BotIsWriting } from './botiswriting/botiswriting';

export default class ChatBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.chatBotConfig.title,
      botName: this.props.chatBotConfig.botName,
      boxWidth: this.props.chatBotConfig.boxWidth,
      boxHeight: this.props.chatBotConfig.boxHeight,
      botAvatarSrc: this.props.chatBotConfig.botAvatarSrc,
      userAvatarSrc: this.props.chatBotConfig.userAvatarSrc,
      messageTimeOut: this.props.chatBotConfig.messageTimeOut,
      helloMessages: this.props.chatBotConfig.helloMessages,
      messages: [],

      botIsWriting: false,
      botIsWaitingForName: false,
      userName: '',
      openSession: false
    };
  }

  inputElement = React.createRef();

  componentDidMount() {
    this.botSpeakHello();
  }


  // * отображение первых сообщений бота
  // * состояние botIsWaitingForName - срабатывает лишь раз, когда боту требуется имя пользователя
  botSpeakHello() {
    let counter = 0;
    this.setState({ botIsWriting: true });
    this.state.helloMessages.forEach((primaryText, index, arr) => {
      setTimeout(() => {
        this.setState(state => ({
          messages: [...state.messages, primaryText]
        }));

        counter = counter + 1;

        if (counter === arr.length) {
          this.setState({ botIsWriting: false, botIsWaitingForName: true});
        }
      }, this.state.messageTimeOut * index);
    });
  }

  sendMessage = () => {

    // * при первом запуске ждет имя пользователя, получив его открывает сессию
    if (this.state.botIsWaitingForName && this.state.userName === '' && this.inputElement.current.value !== '') {
        this.setUserName();
        return;
    }

    this.addMessage();

    if (this.state.openSession) {
      const inputValue = this.inputElement.current.value;
      this.parseUserEnter(inputValue)
    }


  };


  // * отвечает за отображение сообщений с двух сторон (юзер и бот)
  addMessage = (type, text) => {
    
    const inputValue = this.inputElement.current.value;
    const message = {
      id: Number(this.state.messages[this.state.messages.length - 1].id) + Math.random(),
      type: type || 'user',
      message: text || inputValue
    };

    this.setState(state => ({
      messages: [...state.messages, message]
    }));




  }


  parseUserEnter = (userString) => {
    const text = userString.trim();

    // * получить список команд
      if (text.match(/^help$/) || text.match(/^\/help$/)) {

        this.addBotMessage(`Список доступных комманд:
        /hhhh
        `);

      } else {
        this.addBotMessage('что за ')
      }

  }


  addBotMessage(message) {
    this.setState({ botIsWriting: true });
    setTimeout(() => {
      this.addMessage('bot', message);
      this.setState({ botIsWriting: false });
    }, this.state.messageTimeOut);
  }

  // * срабатывает лишь в начале, включает кнопку ввода, ставит имя пользователя, выводит соощение бота о командах, 
  // * меняет openSession на противоположные, лишь ОДИН РАЗ после ввода имени пользователя
  // * openSession включает кнопку отправки сообщений
  setUserName() {
    this.setState({botIsWaitingForName: false, userName: this.inputElement.current.value, botIsWriting: true});
    this.addMessage();
    setTimeout(() => {

      this.addMessage('bot', `Добро пожаловать ${this.state.userName}`);
      this.addMessage('bot', `Узнать полный список команд можно набрав /help`);
      this.setState({botIsWriting: false, openSession: true});
      this.inputElement.current.value = '';
    }, this.state.messageTimeOut);
  }

  viewMessages = () => {
    const messageList = this.state.messages.map((message, index) => (
      <div key={message.id}>
        <Message
          message={message.message}
          type={message.type}
          avatar={
            message.type === 'bot'
              ? this.state.botAvatarSrc
              : this.state.userAvatarSrc
          }
        ></Message>
      </div>
    ));

    return messageList;
  };

  render() {
    const messageList = this.viewMessages();
    const pendingBotWriting = this.state.botIsWriting;


    return (
      <div
        className="chatBot"
        style={{ width: this.state.boxWidth, height: this.state.boxHeight }}
      >
        <div className="chatBot__header">
          <div className="header__section">
            <div className="header__botavatar">
              <img alt="botavatar" src={this.state.botAvatarSrc}></img>
            </div>
            <span>{this.state.botName}</span>
          </div>
          <i className="closeicon">close</i>
        </div>

        <div className="chatBot__body">
          {messageList}
          {pendingBotWriting ? (
            <BotIsWriting avatar={this.state.botAvatarSrc}></BotIsWriting>
          ) : null}
          {/* <Message type = 'bot' avatar = {this.state.botAvatarSrc}></Message>
                <BotIsWriting avatar = {this.state.botAvatarSrc}></BotIsWriting>
                <Message type = 'user' avatar = {this.state.userAvatarSrc}></Message> */}
        </div>
        <div className="chatBot__bottomblock">
          <input type="text" ref={this.inputElement}></input>
          {
            this.state.botIsWaitingForName || this.state.openSession ?
            <button onClick={this.sendMessage}>кнопка</button> : null
            }
        </div>
      </div>
    );
  }
}
