import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import SelectDropdownFilter from './SelectDropdownFilter';
import Counter from './Counter';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      todos: [],
      // Default state to have the clear complete button disabled
      clearButtonDisabled: true,
      // Default state for the filter
      filter: 'all'
    };
  };

  // Gets existing Todos from the db
  componentDidMount(){
    axios.get('http://localhost:8080/todos')
         .then(result =>{
           result.data.sort((a, b) => {return a.id-b.id;}); //Sort by id to maintain list order
           this.setState({
             todos: result.data
           });
         })
         .catch(err=>{
           console.log(err);
         });
  };

  // onChange handler that changes state needed for the filter conditions in render()
  setFilter = selected => {
    this.setState({
      filter: selected.target.value
    });
  };

  // Tests the presence of completed items and changes state accordingly
  checkClearState = () => {
    if(this.state.todos.find(i => i.complete === true)){
      this.setState({
        clearButtonDisabled: false
      });
    }
    else {
      this.setState({
        clearButtonDisabled: true
      });
    };
  };

  // onChange handler called from Todo - toggles the item's complete status
  setComplete = (i, c, con, index) => {
    let updateTodo = {
      id:i,
      complete: !c,
      content:con
    }
    // Make a copy of the array in state
    let copy = Array.from(this.state.todos);
    axios.put('http://localhost:8080/todos', updateTodo)
         .then(result => {
            //  Use splice to delete the existing todo and replace it with the updated one returned from the db
              // Sort by id maintains the item's place in the list
            copy.splice(index, 1, result.data);
            copy.sort((a, b) => {return a.id-b.id;});
            this.setState({
              todos: copy
            }, ()=>this.checkClearState());
         })
         .catch(err =>{
           console.log(err);
         });
  };

  // Called from TodoForm to add new items to the list of todos in state
  addTodo = content => {
    let newTodo = {
      content: content,
      complete: false
    };
    let copy = Array.from(this.state.todos);
    axios.post('http://localhost:8080/todos', newTodo)
         .then(result =>{
          copy.push(result.data);
          this.setState({
            todos: copy
          });
         });
  };

  // Click handler for the Clear Complete button
  clearComplete = e => {
    e.preventDefault();
    axios.delete('http://localhost:8080/todos')
         .then(result => {
          let copy = this.state.todos.filter((copyTodos) => {
            return copyTodos.complete === false;
          });
          this.setState({
            todos: copy,
            // Resets the Clear Complete button to disabled
            clearButtonDisabled: true
          });
         });
  };

  render() {
    // Filters the list of todos in state and returns a new array without altering state
    // New array is passed to TodoList
    let filteredListJSX = [];
    if (this.state.filter === 'active'){
      filteredListJSX = this.state.todos.filter((filteredTodos) => {
        return filteredTodos.complete === false
      });
    }
    else if (this.state.filter === 'complete'){
      filteredListJSX = this.state.todos.filter((filteredTodos) => {
        return filteredTodos.complete === true
      });
    }
    else {
      filteredListJSX = this.state.todos
    };

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
  };
};