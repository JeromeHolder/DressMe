import React, { Component } from 'react';
import './App.css';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import E404 from './404';
import axios from 'axios';

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
    }, ()=>{
      localStorage.userName=this.state.userName;
    })
  }

  // Retrieves User Name from local storage on page reload and stores it in state
  componentDidMount(){
    this.setState({
      userName: localStorage.userName
    })
  }

  // Click handler for logout button on the shop pages, also clears cart on logout
  logout = () => {
    localStorage.removeItem('userName')
    this.setState({
      userName: ''
    }, ()=>{axios.post('http://localhost:8080/clearCart')})
  }

  render() {
    return (
      <div className="App container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dard bg-dark">
          <Link className="navbar-brand navtextcolor" to='/'>P@RE</Link>
          <button className="navbar-dark navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-dark navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link navtextcolor" to='/'>Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navtextcolor" to='/shop'>Shop</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
            <Route exact path='/' render={(props)=>{return <Home grabUserName={this.grabUserName} routeProp={props}/>}} />
            <Route path='/shop' render={()=>{return <Shop userName={this.state.userName} logout={this.logout}/>}} />
            <Route path='/404' component={E404} />
            <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}