import React, { Component } from 'react';
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import './App.css';
import Profile from './Profile';
import Search from './Search';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      shoppingAssistants: [],
      distance: 5,
      expertise: 'casual',
      resultsJSX: null,
      fireRedirect: false,
      currentUser: {}
    };
  };

  // Sends request to backend for an array of shopping assistants with their distance from the user's origin
  componentDidMount(){
    let origin = '460+King+St+W+Toronto+On';
    axios.all([axios.post('http://localhost:8080/distance', {origin:origin}), axios.get('http://localhost:8080/user')])
         .then(results => {
           this.setState({
             shoppingAssistants: results[0].data,
             currentUser: results[1].data
           });
         })
         .catch(err => {
            console.log(err);
         });
  };

  // Ensures that the redirect wont keep a user away from the home page
  backToHome = () => {
    this.setState({
      fireRedirect: false
    });
  };

  // Updates the distance value in state to be used in the grabSearch function below
  updateDistance = (e) => {
    this.setState({
        distance: e.target.value
    });
  };

   // Updates the expertise value in state to be used in the grabSearch function below
   updateExpertise = (e) => {
    this.setState({
        expertise: e.target.value
    });
  };

  // Handles the distance based search -- will need to add ability to search by expertise too
  grabSearch = (e) => {
      e.preventDefault();

      let copy = []
      this.state.shoppingAssistants.forEach(el => {
        let found = el.expertise.find(exp => {
          return exp === this.state.expertise
        })
        if(found !== undefined){
          copy.push(el);
        }
      })
      let filtered = copy.filter(el => {
        if(el.distance <= this.state.distance+el.availRad){
          return el;
        };
        return filtered;
      });
      this.setState({
        resultsJSX: filtered,
        fireRedirect: true
      });
  };

  // Handles booking
  bookFunction = (i, d, hrs) => {
    let booked = {
      id:i,
      day:d,
      hours:hrs
    };
    console.log('booked');
    axios.put('http://localhost:8080/book', booked)
         .then(result => {
           console.log(result);
         })
         .catch(err => {
           console.log(err);
         });
  };

  render() {
    return (
      <div className="App container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand">Dress.me</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" onClick={this.backToHome} to="/">Home </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0" onSubmit={this.grabSearch}>
              <div className="input-group flexbox">
                <button className="btn btn-outline-success my-2 my-sm-0 btnColor" type="submit">Search</button>
                <select className='btn btn-outline-success my-2 my-sm-0 btnColor' onChange={this.updateDistance}>
                    <option value="5">5km</option>
                    <option value="10">10km</option>
                    <option value="15">15km</option>
                    <option value="20">20km</option>
                </select>
                <select className='btn btn-outline-success my-2 my-sm-0 btnColor' onChange={this.updateExpertise}>
                    <option value="Casual">Casual</option>
                    <option value="Business Casual">Business Casual</option>
                    <option value="Business">Business</option>
                    <option value="Formal">Formal</option>
                </select>
              </div>
            </form>
          </div>
        </nav>
        <Switch>
            <Route exact path='/' render={()=>{return this.state.fireRedirect? <Redirect to='/searchresults'/> : <Profile user={this.state.currentUser}/>}}/>
            <Route path='/searchresults' render={()=>{return <Search results={this.state.resultsJSX} bookFunction={this.bookFunction}/>}} />
        </Switch>
      </div>
    );
  }
}