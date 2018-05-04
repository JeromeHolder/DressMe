import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      todos: [
        {
          content: "This is my first task",
          complete: false
        },
        {
          content: "This is my second task",
          complete: false
        }
      ]
    };
    this.setComplete = this.setComplete.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.clearComplete = this.clearComplete.bind(this);
  }

  setComplete(i){
    let copy = Array.from(this.state.todos);
    copy[i].complete = !this.state.todos[i].complete;
    this.setState({
      todos: copy
    });
  }

  addTodo(content){
    let newTodo = {
      content: content,
      complete: false
    };
    let copy = Array.from(this.state.todos);
    copy.push(newTodo);
    this.setState({
      todos: copy
    });
  }

  clearComplete(e){
    e.preventDefault();
    let copy = this.state.todos.filter((copyTodos) => {
      return copyTodos.complete === false;
    });
    console.log(copy);
    this.setState({
      todos: copy
    });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center titleColor">My To-Do List</h1>
        <TodoForm addTodo={this.addTodo}/>
        <TodoList listContent={this.state.todos} setComplete={this.setComplete}/>      
        <select>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="complete">Complete</option>
        </select>
      
        <button onClick={this.clearComplete} className="pull-right btn btn-primary btnColor">Clear Complete</button>
      </div>
    );
  }
}