import React from 'react';
import { connect } from "react-redux";
import './list.css';

const mapStateToProps = state => {
  return { commands: state.commands };
};


const ConnectedList = ({ commands }) => (
  <div className = 'listwrapper'>
  <span>Лог комманд бота (redux only)</span>
  <ol className = 'botCommandLog'>
    {commands.map((el, ind) => (
      <li key={ind}>{el.botCommand}</li>
    ))}
  </ol>
  </div>
);
const List = connect(mapStateToProps)(ConnectedList);
export default List;
