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


  render() {


    return (
      <React.Fragment>
      {this.props.openSession ? <Macros macrosList = {this.props.macrosList} setInputValue = {this.setInputValue}></Macros> : null}
    <div className="chatBot__bottomblock">
    <form onSubmit = {(e) => this.sendMessage(e)}>
    <input type="text" ref={this.inputElement}></input>
    {
      this.props.botIsWaitingForName || this.props.openSession ?
      <button onClick={this.sendMessage}>кнопка</button> : null
      }
    </form>
    </div>
    </React.Fragment>
    );
  }
}
