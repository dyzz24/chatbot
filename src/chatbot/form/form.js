import React, {useEffect, useRef} from 'react';
import './form.css';
import Macros from './macros/macros';

import { connect } from "react-redux";
import { mapDispatchToProps } from '../emitEvent/emitEvent';


const EmptyForm = (props) => {
  const inputElement = useRef();


  const sendMessage = (e) =>  {
    e.preventDefault();
    const txt = inputElement.current.value;
    if (!txt) {
      return;
    }
    props.sendMessage(txt);
    emitValueToRedux(txt)
    inputElement.current.value = '';
    inputElement.current.focus();
  }

  const emitValueToRedux = (val) => {
    props.addCommand(val)
  }


  const setInputValue = (val) => {
    inputElement.current.value = val;
    inputElement.current.focus();
  }


  useEffect(() => {inputElement.current.focus()}, [])

  const showMacros = () => {
    if(props.openSession) {
      return  <Macros macrosList = {props.macrosList} setInputValue = {setInputValue}></Macros>
    } else {
      return null;
    }
  }

  const showSendButton = () => {
    if(props.botIsWaitingForName || props.openSession) {
      return <i className = 'submitter' onClick={sendMessage}></i>
    } else {
      return null;
    }
  }


    const macrosList = showMacros();
    const sendButton = showSendButton();


    return (
      <React.Fragment>
    {macrosList}
    <div className="chatBot__bottomblock">
    <form onSubmit = {(e) => sendMessage(e)} placeholder = 'Введите текст'>
    <input type="text" ref={inputElement}></input>
    {sendButton}
    </form>
    </div>
    </React.Fragment>
    );
}

const Form = connect(
  null,
  mapDispatchToProps
)(EmptyForm);

export default Form;
