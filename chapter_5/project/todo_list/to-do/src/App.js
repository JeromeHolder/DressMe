import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './todo';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">todos</h1>
    
        <form>
            <div className="input-group">
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="submit">Add</button>
                </span>
                <input className="form-control" placeholder="add a todo" />
            </div>
        </form>
        <ul className="list-group">
            <Todo listContent="Test" />
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

