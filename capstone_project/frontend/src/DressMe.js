import React, { Component } from 'react';
import {Route, Switch, withRouter, Link} from 'react-router-dom';
import './App.css';
import Profile from './Profile';
import Search from './Search';
import axios from 'axios';
import {Button} from 'reactstrap';

export default withRouter(class DressMe extends Component {
  constructor(){
    super();
    this.state = {
      shoppingAssistants: [],
      distance: 5,
      expertise: 'Casual',
      resultsJSX: null,
      fireRedirect: false,
      currentUser: []
    };
  };

  // Sends request to backend for an array of shopping assistants with their distance from the user's origin
  componentDidMount(){
    if(!localStorage.login_status || localStorage.login_status === false){
      this.props.history.push('/');
    };
    let origin = localStorage.origin;
    axios.all([axios.post('http://localhost:8080/api/distance', {origin:origin}), axios.get('http://localhost:8080/api/user')])
          .then(results => {
            let copy = Array.from(this.state.currentUser);
            copy.push(results[1].data);
            this.setState({
              shoppingAssistants: results[0].data,
              currentUser: copy,
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

      let copy = [];
      this.state.shoppingAssistants.forEach(el => {
        let found = el.expertise.find(exp => {
          return exp === this.state.expertise
        })
        if(found !== undefined){
          copy.push(el);
        }
      });
      let filtered = copy.filter(el => {
        if(el.distance <= this.state.distance+el.availRad){
          return el;
        };
        return filtered;
      });
      this.setState({
        resultsJSX: filtered,
        fireRedirect: true
      }, ()=>{this.props.history.push('/profile/searchresults')});
  };

  // Handles booking
  bookFunction = (dateid, hrsIDs, bookedRecord) => {
    
    // Updates the array of bookings in currentUser in state and passes that array inside 'booked' to the backend to update the db
    let copy = Array.from(this.state.currentUser);
    bookedRecord.forEach(el => {
      copy[0].bookings.push(el);
    });
    let booked = {
      day:dateid,
      hours:hrsIDs,
      user: this.state.currentUser[0]._id,
      bookings: copy[0].bookings
    };
    this.setState({
      currentUser:copy
    });
    axios.put('http://localhost:8080/api/book', booked)
         .then(result => {
           console.log(result);
         })
         .catch(err => {
           console.log(err);
         });
  };

  // Handles cancelling a booking
  cancelBooking = (index, hourID) => {
    let copy = Array.from(this.state.currentUser)
    copy[0].bookings.splice(index,1);
    let cancelInfo = {
      id: hourID,
      bookings: copy[0].bookings,
      user: this.state.currentUser[0]._id
    };
    this.setState({
      currentUser: copy
    }, ()=>{this.componentDidMount()});

    // Sends the object 'cancelInfo' to the db to update
    axios.put('http://localhost:8080/api/cancel', cancelInfo)
         .then(result => {
           console.log(result);
         })
         .catch(err => {
           console.log(err);
         });
  };

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand">DressMe</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" onClick={this.backToHome} to="/profile">Profile </Link>
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
            <Button onClick={this.props.logout} >Logout</Button>
          </div>
        </nav>
        <Switch>
            <Route exact path='/profile' render={()=>{return <Profile user={this.state.currentUser}  cancelBooking={this.cancelBooking}/>}}/> 
            <Route path='/profile/searchresults' render={()=>{ return <Search results={this.state.resultsJSX} bookFunction={this.bookFunction}/>}} />
        </Switch>
      </div>
    );
  };
});