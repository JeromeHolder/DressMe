import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import './App.css';
import SongList from './SongList';
import SongDetails from './SongDetails';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      audioState: false,
      songs: [{source:'/fake.mp3', title:'fake', description:'fake', id:0}],
      currentSong: 0,
      time: '0:00',
      duration: '0:00',
      button: "/Play.svg"
    };
  };

  // Gets props from index.js and sets the array of songs in state - Will have axios.get once backend is set up
  componentDidMount(){
    axios.get('http://localhost:8080/songs')
         .then(result =>{
            this.setState({
              songs: result.data
            });
         }); 
    //inside the eventual axios.get the .then can have a setTimeout() of a couple seconds to display a loading screen
    // linked to 'if' statements in render
  };

  // Toggle for play and pause button
  playPause = () => {
    if(!this.state.audioState){
      this.audioref.play();
      this.setState({
        audioState: true,
        button: "/Pause.svg"
      });
    }
    else{
      this.audioref.pause();
      this.setState({
      audioState: false,
      button: "/Play.svg"
    });
    }
  }
  // Click handler for play button, changes play-state
  // play = () => {
  //   this.audioref.play();
    
  //   this.setState({
  //     audioState: true,
  //     button: "/Pause.svg"
  //   });
  // };

  // Click handler for pause button, changes play-state
  // pause = () => {
  //   this.audioref.pause();
  //   this.setState({
  //     audioState: false,
  //     button: "/Play.svg"
  //   });
  // };

  // Click handler for previous and next buttons and conditionally calls play if play-state is true
  changeSong = (direction) => {
    this.setState({
      currentSong: this.state.currentSong + direction
    }, ()=>{if(this.state.audioState){this.audioref.play()}}) //could do this in componentDidUpdate?
  };

  // Click handler for the play button on the SongList component
  listPlayHandler = (index) => {
    this.setState({
      currentSong: index
    }, ()=>{this.playPause()})
  }

  // Increments the timer as the audio plays
  displayTime = () => {
    let counter = Math.floor(this.audioref.currentTime);
    let minutes = Math.floor(counter / 60);
    let seconds = counter % 60;
    if(seconds < 10){
      seconds = '0' + seconds;
    };
    this.setState({
      time: minutes + ':' + seconds
    }, ()=>{this.displayDuration()});
  }

  // Shows the duration of the current song
  displayDuration = () => {
    let counter = Math.floor(this.audioref.duration);
    let minutes = Math.floor(counter / 60);
    let seconds = counter % 60;
    this.setState({
      duration: minutes + ':' + seconds
    })
  }

  render() {
    return (
      <div className="App container">

        {/* Nav */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">SoundBot</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to='/'>Home</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>

        <Switch>
          <Route exact path='/' render={()=>{return <SongList songs={this.state.songs} listPlayHandler={this.listPlayHandler}/> }} />
          <Route exact path='/:songId' render={(props)=>{return <SongDetails songs={this.state.songs} match={props.match} listPlayHandler={this.listPlayHandler}/>}} />
        </Switch>

        {/* Player component */}
        <footer>
          <h3>Now playing: {this.state.songs[this.state.currentSong].title}</h3>
          <input className="audioControl" type="image" src="/Previous.svg" onClick={()=>{return this.changeSong(-1)}} disabled={this.state.currentSong === 0 ? true:false} />
          <audio onTimeUpdate={()=>{return this.displayTime()}} className="audio" id="audio" src={this.state.songs[this.state.currentSong].source} ref={(el)=>this.audioref = el}></audio>
          <input className="audioControl" type="image" src={this.state.button} onClick={this.playPause} />
          {/* <button onClick={this.pause}>Pause</button> */}
          <input className="audioControl" type="image" src="/Next.svg" onClick={()=>{return this.changeSong(+1)}} disabled={this.state.currentSong === this.state.songs.length-1 ? true:false} />
          <h4>{this.state.time}/{this.state.duration ? '0:00': this.state.duration}</h4>
        </footer>

      </div>
    );
  };
};
