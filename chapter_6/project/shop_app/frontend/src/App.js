import React, { Component } from 'react';
import './App.css';
import {Route, Switch, Link} from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/shop'>Shop</Link>
        </nav>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/shop' component={Shop} />
        </Switch>
      </div>
    );
  }
}