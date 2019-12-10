import React from 'react';
import './chatbot.css';
import { Message } from './message/message';
import { BotIsWriting } from './botiswriting/botiswriting';
import SupportFeatures from './support-features/support-features';
import { animateScroll } from "react-scroll";
import Httpservice from './httpservice/httpservice';
import Actions from './actions/actions';

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
  supportFeatures = new SupportFeatures();

  child = React.createRef();

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

    const text = this.inputElement.current.value;
    if(!text) {
      return;
    }
    // * при первом запуске ждет имя пользователя, получив его открывает сессию
    if (this.state.botIsWaitingForName && this.state.userName === '' && text !== '') {
        this.setUserName();
        return;
    }

    this.addMessage('user', text);

    if (this.state.openSession) {

      const status = this.supportFeatures.parseUserEnter(text);
      console.log(status);
      this.child.current.switchActions(status.command, status.subCommand);
      this.inputElement.current.value = '';
    }


  };

  handlerParentState = (flag) => {
    this.setState({ botIsWriting: flag });
  }


  // * отвечает за отображение сообщений с двух сторон (юзер и бот)
  addMessage = (type, text) => {

    const message = this.supportFeatures.messageGenerate(type, text, Number(this.state.messages[this.state.messages.length - 1].id));
    this.setState(state => ({
      messages: [...state.messages, message]
    }));


  }

  componentDidUpdate() {
    this.scrollToBottom();
  }




  addBotMessage(message) {
    // * имитация печатанья текста ботом */
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
    const text = this.inputElement.current.value;
    this.setState({botIsWaitingForName: false, userName: text, botIsWriting: true});
    this.addMessage('user', text);
    setTimeout(() => {

      this.addMessage('bot', `Добро пожаловать ${this.state.userName}`);
      this.addMessage('bot', `Узнать полный список команд можно набрав комбинацию /help`);
      this.setState({botIsWriting: false, openSession: true});
      this.inputElement.current.value = '';
    }, this.state.messageTimeOut);
  }

  viewMessages = () => {
    const messageList = this.state.messages.map((message, index) => (
     
        <Message key={message.id}
          message={message.message}
          type={message.type}
          avatar={
            message.type === 'bot'
              ? this.state.botAvatarSrc
              : this.state.userAvatarSrc
          }
        ></Message>
 
    ));

    return messageList;
  };


  scrollToBottom = () => {
    animateScroll.scrollToBottom({containerId: 'bodyId'})
 
  }

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

        <div className="chatBot__body"
        id = 'bodyId'
        >
          {messageList}
          {pendingBotWriting ? (
            <BotIsWriting avatar={this.state.botAvatarSrc}></BotIsWriting>
          ) : null}
        </div>
        <div className="chatBot__bottomblock">
          <input type="text" ref={this.inputElement}></input>
          {
            this.state.botIsWaitingForName || this.state.openSession ?
            <button onClick={this.sendMessage}>кнопка</button> : null
            }
        </div>
        <Actions ref = {this.child}
        addBotMessage = {(e) => this.addBotMessage(e)}
        addMessage = {(type, msg) => this.addMessage(type, msg)}
        handlerParentState = {(flag) => this.handlerParentState(flag)}
        ></Actions>
      </div>
    );
  }
}
