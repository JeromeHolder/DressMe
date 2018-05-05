import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import SelectDropdownFilter from './SelectDropdownFilter';
import Counter from './Counter';
// Added some css in ./public/app.css
  // Included overflow-y:auto to render the scroll bar when the list gets long

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      todos: [
        {
          content: "Do the daily challenge so Graeme doesn't hit me",
          complete: false
        },
        {
          content: "Watch the newest episode of Archer... Danger zone!",
          complete: false
        }
      ],
      // Default state to have the clear complete button disabled
      clearButtonDisabled: true,
      // Default state for the filter
      filter: 'all'
    };

    // Method bindings
    this.setComplete = this.setComplete.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.clearComplete = this.clearComplete.bind(this);
    this.checkClearState = this.checkClearState.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  // onChange handler that changes state needed for the filter conditions in render()
  setFilter(selected){
    this.setState({
      filter: selected.target.value
    })
  }

  // Tests the presence of completed items and changes state accordingly
  checkClearState(){
    if(this.state.todos.find(i => i.complete === true)){
      this.setState({
        clearButtonDisabled: false
      })
    }
    else {
      this.setState({
        clearButtonDisabled: true
      })
    }
  }

  // onChange handler called from Todo
  setComplete(i){
    let copy = Array.from(this.state.todos);
    copy[i].complete = !this.state.todos[i].complete;
    this.setState({
      todos: copy
    });
    // Calls the function to disable/enable the clear complete button when items are toggled completed/active
    this.checkClearState();
  }

  // Called from TodoForm to add new items to the list of todos in state
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

  // Click handler for the Clear Complete button
  clearComplete(e){
    e.preventDefault();
    let copy = this.state.todos.filter((copyTodos) => {
      return copyTodos.complete === false;
    });
    this.setState({
      todos: copy,
      // Resets the Clear Complete button to disabled
      clearButtonDisabled: true
    });
  }

  render() {

    // Filters the list of todos in state and returns a new array without altering state
    // New array is passed to TodoList
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