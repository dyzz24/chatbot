import React from 'react';
import './macros.css';



export default class Macros extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  macrosListCreate() {
    const macrosLis = this.props.macrosList.map((message, index) => (
      <li key = {index} className = 'macros' onClick = {(val) => this.setInputValue(message.command)}>
        {message.title}
      </li>
    ));

    return macrosLis
  }

  setInputValue(newInpVal) {
      this.props.setInputValue(newInpVal);
  }


  render() {
    const macrosList = this.macrosListCreate();

    return (
      <ul className = 'macrosList'>
          {macrosList}
    </ul>
    );
  }
}
