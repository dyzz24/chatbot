import React from 'react';
import './chatbot.css';
import { Message } from './message/message';
import { BotIsWriting } from './botiswriting/botiswriting';
import SupportFeatures from './support-features/support-features';
import { animateScroll } from 'react-scroll';
import Actions from './actions/actions';
import Form from './form/form';
import { Header } from './header/header';
import { addBotAnswer } from '../redux/actions';
import { connect } from 'react-redux';
import Httpservice from './httpservice/httpservice';
import { APIDATA } from './APIDATA';

function mapDispatchToProps(dispatch) {
  return {
    addBotAnswer: answers => dispatch(addBotAnswer(answers))
  };
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    const config = this.props.chatBotConfig;
    this.state = {
      title: config.title,
      botName: config.botName,
      boxWidth: config.boxWidth,
      boxHeight: config.boxHeight,
      botAvatarSrc: config.botAvatarSrc,
      userAvatarSrc: config.userAvatarSrc,
      messageTimeOut: config.messageTimeOut,
      helloMessages: config.helloMessages,
      macrosList: config.macrosList,
      messages: [],

      botIsWriting: false,
      botIsWaitingForName: false,
      userName: '',
      openSession: false,
      hideBot: false,
      fullScreen: false
    };
  }



  supportFeatures = SupportFeatures(APIDATA, Httpservice);
  

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
        this.props.addBotAnswer(primaryText.message);
        this.setState(state => ({
          messages: [...state.messages, primaryText]
        }));

        counter = counter + 1;

        // * если отработали все приветственные сообщения, ставлю флаг
        if (counter === arr.length) {
          this.setState({ botIsWriting: false, botIsWaitingForName: true });
        }
      }, this.state.messageTimeOut * index);
    });
  }

  sendMessage = text => {
    // * при первом запуске ждет имя пользователя, получив его открывает сессию
    if (
      this.state.botIsWaitingForName &&
      this.state.userName === '' &&
      text !== ''
    ) {
      this.setUserName(text);
      return;
    }

    this.addMessage('user', text);

    if (this.state.openSession) {
      const status = this.supportFeatures.parseUserEnter(text);
      this.child.current.switchActions(status.command, status.subCommand);
    }
  };

  handlerParentState = flag => {
    this.setState({ botIsWriting: flag });
  };

  // * отвечает за отображение сообщений с двух сторон (юзер и бот)
  addMessage = (type, text) => {
    const id =
      this.state.messages.length > 0
        ? this.state.messages[this.state.messages.length - 1].id
        : 0;
    const message = this.supportFeatures.messageGenerate(type, text, id);

    if (message.type === 'bot') {
      this.props.addBotAnswer(message.message);
    }
    this.setState(state => ({
      messages: [...state.messages, message]
    }));
  };

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
  setUserName(text) {
    this.setState({
      botIsWaitingForName: false,
      userName: text,
      botIsWriting: true
    });
    this.addMessage('user', text);
    setTimeout(() => {
      this.addMessage('bot', `Добро пожаловать ${this.state.userName}`);
      this.addMessage(
        'bot',
        `Узнать полный список команд можно набрав комбинацию /help`
      );
      this.setState({ botIsWriting: false, openSession: true });
    }, this.state.messageTimeOut);
  }

  viewMessages = () => {
    const messageList = this.state.messages.map((message, index) => (
      <Message
        key={message.id}
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
    animateScroll.scrollToBottom({ containerId: 'bodyId' });
  };

  hideBot = () => {
    this.setState(state => ({
      hideBot: !state.hideBot
    }));
  };

  fullScreen = () => {
    this.setState(state => ({
      fullScreen: !state.fullScreen
    }));
  };

  clearMessages = () => {
    this.setState(state => ({
      messages: []
    }));
  };

  returnScreenBotMode() {
    const hideBot = this.state.hideBot;
    const fullScreen = this.state.fullScreen;

    if (hideBot && !fullScreen) {
      return 'chatBot hide';
    } else if (fullScreen) {
      return 'chatBot fullScreen';
    } else {
      return 'chatBot';
    }
  }

  getBotState = () => {
    const messageList = this.viewMessages();
    const pendingBotWriting = this.state.botIsWriting;
    const classNameForBot = this.returnScreenBotMode();
    return { messageList, pendingBotWriting, classNameForBot };
  };

  render() {
    const botState = this.getBotState();
    const {
      botAvatarSrc,
      botName,
      botIsWaitingForName,
      hideBot,
      fullScreen
    } = this.state;

    return (
      <div
        className={botState.classNameForBot}
        style={{ width: this.state.boxWidth, height: this.state.boxHeight }}
      >
        <Header
          botAvatarSrc={botAvatarSrc}
          botName={botName}
          hideBotMod={this.hideBot}
          fullScreenMod={this.fullScreen}
          hideBot={hideBot}
          fullScreen={fullScreen}
        ></Header>

        <div className='chatBot__wrapper'>
          <div className='chatBot__body' id='bodyId'>
            {botState.messageList}
            {botState.pendingBotWriting ? (
              <BotIsWriting avatar={botAvatarSrc}></BotIsWriting>
            ) : null}
          </div>
          <Form
            sendMessage={this.sendMessage}
            botIsWaitingForName={botIsWaitingForName}
            openSession={this.state.openSession}
            macrosList={this.state.macrosList}
          ></Form>

          <Actions
            ref={this.child}
            addBotMessage={e => this.addBotMessage(e)}
            addMessage={(type, msg) => this.addMessage(type, msg)}
            handlerParentState={flag => this.handlerParentState(flag)}
            clearMessages={this.clearMessages}
          ></Actions>
        </div>
      </div>
    );
  }
}

const ChatBot = connect(null, mapDispatchToProps)(Chat);
export default ChatBot;
