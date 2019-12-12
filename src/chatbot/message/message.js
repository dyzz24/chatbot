import React from 'react';
import './message.css';


export class Message extends React.Component {

  constructor(props) {
    super()
  }

  createMarkup = html => {
    return { __html: String(html) };
  };

  render() {
    const mType = this.props.type;
    if(mType === 'bot' || !mType) {
      return (
        <div className = 'messageRow'>
          <div className = 'avatar'>
            <img alt = 'botava' src = {this.props.avatar}></img>
          </div>
      <span dangerouslySetInnerHTML={this.createMarkup(this.props.message)}></span></div>
      )
    }

    if(mType === 'user') {
      return (
        <div className = 'messageRow reverse'>
          <div className = 'avatar'>
            <img alt = 'userava' src = {this.props.avatar}></img>
          </div>
          <span dangerouslySetInnerHTML={this.createMarkup(this.props.message)}></span></div>
      )
    }
  }




}
