import React from 'react';
import './form.css';



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
    this.props.sendMessage(txt);
    this.inputElement.current.value = '';
  }


  render() {


    return (
      <div className="chatBot__bottomblock">
    <form onSubmit = {(e) => this.sendMessage(e)}>
    <input type="text" ref={this.inputElement}></input>
    {
      this.props.botIsWaitingForName || this.props.openSession ?
      <button onClick={this.sendMessage}>кнопка</button> : null
      }
    </form>
    </div>
    );
  }
}
