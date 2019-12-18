import React from 'react';
import { connect } from "react-redux";
import './list.css';

const mapStateToProps = state => {
  return { commands: state.commands };
};


const ConnectedList = ({ commands }) => (
  <ol className = 'botCommandLog'>
    <span>Лог комманд бота (redux only)</span>
    {commands.map((el, ind) => (
      <li key={ind}>{el.botCommand}</li>
    ))}
  </ol>
);
const List = connect(mapStateToProps)(ConnectedList);
export default List;
