import React from 'react';
import { connect } from "react-redux";
import './list.css';

const mapStateToProps = state => {
  return { commands: state.commands,  answers: state.answers};
};


const ConnectedList = ({ commands, answers }) => (
  <div className = 'listwrapper'>
  <span>Лог комманд пользователя (redux only)</span>
  <ol className = 'botCommandLog'>
    {commands.map((el, ind) => (
      <li key={ind}>{el.botCommand}</li>
    ))}
  </ol>

  <span>Лог ответов бота (redux only)</span>
  <ol className = 'botCommandLog ul'>
    {answers.map((el, ind) => (
      <li key={ind}>{el.answer}</li>
    ))}
  </ol>
  </div>
);
const List = connect(mapStateToProps)(ConnectedList);
export default List;
