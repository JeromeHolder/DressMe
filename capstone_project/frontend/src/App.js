import React, { Component } from 'react';
import {Route, Switch, Redirect, Link} from 'react-router-dom';
import './App.css';
import Home from './Home';
import Search from './Search';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      shoppingAssistants: [],
      headlines: [''],
      distance: 5,
      resultsJSX: null,
      fireRedirect: false
    };
  };

  // Will remove scraping on home page and change home page to profile
  componentDidMount(){
    let origin = '68+Corporate+Drive+Scarborough+On';
    axios.all([axios.post('http://localhost:8080/distance', {origin:origin}), axios.get('http://localhost:8080/getHeadlines')])
         .then(results => {
           this.setState({
             shoppingAssistants: results[0].data,
             headlines: results[1].data //Successfully processing into titles and links on home page, but links are incorrect
           })
         })
         .catch(err => {
            console.log(err);
         });
  };

  // Updates the distance value in state to be used in the grabSearch function below
  updateDistance = (e) => {
    this.setState({
        distance: e.target.value
    });
  };

  // Ensures that the redirect wont keep a user away from the home page
  backToHome = () => {
    this.setState({
      fireRedirect: false
    });
  };

  // Handles the distance based search -- will need to add ability to search by expertise too
  grabSearch = (e) => {
      e.preventDefault();
      let filtered = this.state.shoppingAssistants.filter(el => {
        if(el.distance <= this.state.distance){
          return el;
        };
        return filtered;
      });
      this.setState({
        resultsJSX: filtered,
        fireRedirect: true
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
              </div>
            </form>
          </div>
        </nav>
        <Switch>
            <Route exact path='/' render={()=>{return this.state.fireRedirect? <Redirect to='/searchresults'/> : <Home headlines={this.state.headlines}/>}}/>
            <Route path='/searchresults' render={()=>{return <Search results={this.state.resultsJSX} />}} />
        </Switch>
      </div>
    );
  }
}