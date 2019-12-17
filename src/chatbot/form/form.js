import React from 'react';
import './form.css';
import Macros from './macros/macros';



export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  inputElement = React.createRef();

  sendMessage = (e) =>  {
    e.preventDefault();
    const txt = this.inputElement.current.value;
    if (!txt) {
      return;
    }
    this.props.sendMessage(txt);
    this.inputElement.current.value = '';
  }

  setInputValue = (val) => {
    this.inputElement.current.value = val;
    this.inputElement.current.focus();
  }

  componentDidMount() {
    this.inputElement.current.focus();
  }

  showMacros = () => {
    if(this.props.openSession) {
      return  <Macros macrosList = {this.props.macrosList} setInputValue = {this.setInputValue}></Macros>
    } else {
      return null;
    }
  }

  showSendButton = () => {
    if(this.props.botIsWaitingForName || this.props.openSession) {
      return <i className = 'submitter' onClick={this.sendMessage}></i>
    } else {
      return null;
    }
  }


  render() {

    const macrosList = this.showMacros();
    const sendButton = this.showSendButton();


    return (
      <React.Fragment>
    {macrosList}
    <div className="chatBot__bottomblock">
    <form onSubmit = {(e) => this.sendMessage(e)} placeholder = 'Введите текст'>
    <input type="text" ref={this.inputElement}></input>
    {sendButton}
    </form>
    </div>
    </React.Fragment>
    );
  }
}
