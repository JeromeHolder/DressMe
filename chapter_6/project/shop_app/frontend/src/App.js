import React, { Component } from 'react';
import './App.css';
import {Route, Switch, Link} from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      userName: ''
    }
  }

  // grabs the User Name from the home page input and stores it in state and local storage
  grabUserName = (userName) => {
    this.setState({
      userName: userName
    }, ()=>{localStorage.userName=this.state.userName})
  }

  // Retrieves User Name from local storage on page reload and stores it in state
  componentDidMount(){
    this.setState({
      userName: localStorage.userName
    })
  }

  render() {
    return (
      <div className="App">
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/shop'>Shop</Link>
        </nav>
        <Switch>
            <Route exact path='/' render={()=>{return <Home grabUserName={this.grabUserName}/>}} />
            <Route path='/shop' render={()=>{return <Shop userName={this.state.userName}/>}} />
        </Switch>
      </div>
    );
  }
}