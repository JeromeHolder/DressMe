import React, { Component } from 'react';
import './App.css';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import E404 from './404';


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
      // console.log(history);
    })
  }

  // Retrieves User Name from local storage on page reload and stores it in state
  componentDidMount(){
    this.setState({
      userName: localStorage.userName
    })
  }

  // Click handler for logout button on the shop pages
  logout = () => {
    localStorage.removeItem('userName')
    this.setState({
      userName: ''
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
            <Route exact path='/' render={(props)=>{return <Home grabUserName={this.grabUserName} routeProp={props}/>}} />
            <Route path='/shop' render={()=>{return <Shop userName={this.state.userName} logout={this.logout}/>}} />
            <Route path='/404' component={E404} />
            <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}