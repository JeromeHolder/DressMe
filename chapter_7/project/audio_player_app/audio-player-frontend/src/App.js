import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import SongList from './SongList';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      audioState: 'stopped',
      songs: []
    };
  }

  componentDidMount(){
    this.setState({
      songs: this.props.songs
    });
  }

  render() {
    return (
      <div className="App container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">SoundBot</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to='/'>Home<span className="sr-only">(current)</span></Link>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li> */}
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <Route exact path='/' render={()=>{return <SongList songs={this.state.songs}/> }} />
        <Route exact path='/:songId' render={()=>{return }} />
      </div>
    );
  }
}
