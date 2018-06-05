import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
// import './App.css';
import Login from './Login';
import DressMe from './DressMe';
import axios from 'axios';

export default withRouter(class App extends Component {
  constructor(){
    super();
    this.state = {
      loginSuccess: false,
      unsuccessful: ''
    };
  };

  // Login function
  login = (email, password) => {
    let login = {
      email:email,
      password:password
    };
    axios.post('http://localhost:8080/api/login', login)
         .then(result => {
           localStorage.login_status = result.data.results;
           localStorage.origin = result.data.userAddress
           this.setState({
             loginSuccess: result.data.results,
           }, ()=> {if(this.state.loginSuccess === true){this.props.history.push('/profile')}});
         })
         .catch(err => {
           console.log(err);
           this.setState({
             unsuccessful: 'Incorrect email or password.'
           });
         });
  };

  // Logout function from logout button on nav component
  logout = () => {
    localStorage.removeItem('login_status');
    localStorage.removeItem('origin');
    this.setState({
      loginSuccess: false
    }, ()=>{this.props.history.push('/')});
  };

  render() {
    return (
      <div>
        <Switch>
            <Route exact path='/' render={()=>{return <Login login={this.login} unsuccessful={this.state.unsuccessful}/> }} />
            <Route path='/profile' render={()=>{return <DressMe logout={this.logout} currentUser={this.state.currentUser}/> }}/>
        </Switch>
      </div>
    );
  };
});