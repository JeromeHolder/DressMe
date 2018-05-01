import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './Todo';
import Form from './Form';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">todos</h1>
    
        <form>
            <Form />
        </form>

        <ul className="list-group">
            <Todo listContent="Test" completed={true}/>
        </ul>
      
        <select>
            <option value="all">all</option>
            <option value="active">active</option>
            <option value="complete">complete</option>
        </select>
      
        <button className="pull-right btn btn-default">Clear Complete</button>
      </div>
    );
  }
}

export default App;

