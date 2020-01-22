import React from 'react';
import './macros.css';



const Macros = ({macrosList, setInputValue}) => {

  const macrosListCreate = () => {
    const macrosLis = macrosList.map((message, index) => (
      <li key = {index} className = 'macros' onClick = {(val) => setValue(message.command)}>
        {message.title}
      </li>
    ));

    return macrosLis
  }

  const setValue = (newInpVal) => {
      setInputValue(newInpVal);
  }

  const listOfMacross = macrosListCreate();


    return (
      <ul className = 'macrosList'>
          {listOfMacross}
    </ul>
    );
  }

  export default Macros;

