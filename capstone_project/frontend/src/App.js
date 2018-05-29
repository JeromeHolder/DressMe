import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Search from './Search';
import SearchResults from './SearchResults';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      shoppingAssistants: [],
      results: []
    }
  }

  componentDidMount(){
    let origin = '68+Corporate+Drive+Scarborough+On';
    axios.post('http://localhost:8080/distance', {origin:origin})
         .then(results => {
           this.setState({
             shoppingAssistants: results.data
           });
         })
         .catch(err => {
           console.log(err);
         });
  };


  search = (distance) => {
    console.log('hit');
    let resultsJSX = this.state.shoppingAssistants.filter(el => {
      if(el.distance <= distance){
        return el;
      };
    });
    // console.log(resultsJSX);
    this.setState({
      results: resultsJSX
    }, ()=>{return <Redirect to='/searchresults'/>});
    // console.log(this.state.results);
  };


  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' render={()=>{return <Search search={this.search}/>}}/>
          <Route path='/searchresults' render={()=>{return <SearchResults results={this.state.results} />}} />
        </Switch>
      </div>
    );
  }
}