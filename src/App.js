import React from 'react';
import './App.css';
import Wrapper from './wrapper/wrapper';
import List from './wrapper/connectedList/list';


function App() {
  return (
    <div className="app">
       <List></List>
      <Wrapper/>
    </div>
  );
}

export default App;
