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
      botIsWaitingForName: false
    };
  }

  inputElement = React.createRef();

  componentDidMount() {
    this.botSpeakHello();
  }

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

    const message = {
      id: Number(this.state.messages[this.state.messages.length - 1].id) + 1,
      type: 'user',
      message: this.inputElement.current.value
    };
    this.inputElement.current.value = '';
    this.setState(state => ({
      messages: [...state.messages, message]
    }));
  };

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
          <button onClick={this.sendMessage}>кнопка</button>
        </div>
      </div>
    );
  }
}
