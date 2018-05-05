import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import SelectDropdownFilter from './selectDropdownFilter';
import Counter from './Counter';

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
      ],
      clearButtonDisabled: true,
      filter: 'all'
    };
    this.setComplete = this.setComplete.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.clearComplete = this.clearComplete.bind(this);
    this.checkClearState = this.checkClearState.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  setFilter(selected){
    this.setState({
      filter: selected.target.value
    })
  }

  checkClearState(){
    if(this.state.todos.find(i => i.complete === true)){
      this.setState({
        clearButtonDisabled: false
      })
    } else {
      this.setState({
        clearButtonDisabled: true
      })
    }
  }

  setComplete(i){
    let copy = Array.from(this.state.todos);
    copy[i].complete = !this.state.todos[i].complete;
    this.setState({
      todos: copy
    });
    this.checkClearState();
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
    this.setState({
      todos: copy,
      clearButtonDisabled: true
    });
  }

  render() {
    let filteredListJSX = [];
    if (this.state.filter === 'active'){
      filteredListJSX = this.state.todos.filter((filteredTodos) => {
        return filteredTodos.complete === false
      })
    }
    else if (this.state.filter === 'complete'){
      filteredListJSX = this.state.todos.filter((filteredTodos) => {
        return filteredTodos.complete === true
      })
    }
    else {
      filteredListJSX = this.state.todos
    }


    return (
      <div className="container">
        <h1 className="text-center titleColor">My To-Do List</h1>
        <Counter listContent={this.state.todos} />
        <TodoForm addTodo={this.addTodo}/>
        <TodoList listContent={filteredListJSX} setComplete={this.setComplete}/>      
        <SelectDropdownFilter setFilter={this.setFilter}/>
      
        <button onClick={this.clearComplete} disabled={this.state.clearButtonDisabled} className="pull-right btn btn-primary btnColor">Clear Complete</button>

        
      </div>
    );
  }
}