import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import E404 from './404';
import './App.css';
import SongList from './SongList';
import SongDetails from './SongDetails';
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      audioState: false,
      songs: [{source:'/fake.mp3', title:'fake', description:'fake', id:0, img:'/fake.jpg'}],
      currentSong: 0,
      time: '0:00',
      duration: '0:00',
      button: "/Play.svg"
    };
  };

  // Gets data from server and sets the array of songs in state
  componentDidMount(){
    axios.get('http://localhost:8080/songs')
         .then(result =>{
            this.setState({
              songs: result.data
            });
         });
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
    };
  };

  // Click handler for previous and next buttons and conditionally calls play if play-state is true
  changeSong = (direction) => {
    let newSong = this.state.currentSong + direction;
    if(newSong < 0){
      newSong = this.state.songs.length-1;
    }
    else if (newSong > this.state.songs.length-1){
      newSong = 0;
    }
    this.setState({
      currentSong: newSong
    }, ()=>{if(this.state.audioState){this.audioref.play()}});
  };

  // Click handler for the play button on the SongList component
  listPlayHandler = (index) => {
    this.setState({
      currentSong: index,
      audioState: false
    }, ()=>{this.playPause()});
  };

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
    });
  };

  // Shows the duration of the current song
  displayDuration = () => {
    let counter = Math.floor(this.audioref.duration);
    let minutes = Math.floor(counter / 60);
    let seconds = counter % 60;
    if(!isNaN(minutes) || !isNaN(seconds)){
      this.setState({
        duration: minutes + ':' + seconds
      });
    };
  };

  render() {
    return (
      <div className="App container">
        <div className="sub-container">
          <div className="container-overlay">
          </div>
          {/* Nav */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
            </div>
          </nav>

          <Switch>
            <Route exact path='/' render={()=>{return <SongList songs={this.state.songs} listPlayHandler={this.listPlayHandler}/> }} />
            <Route exact path='/:songId' render={(props)=>{return <SongDetails songs={this.state.songs} button={this.state.button} match={props.match} listPlayHandler={this.listPlayHandler}/>}} />
            {/* Routes to for 404 and in case user enters non-existent paths */}
            <Route exact path='/error/404' render={()=>{return <E404 />}} />
            <Route path='/*/*' component={E404} />
          </Switch>

          {/* Player component */}
          <div className="player">
            <h3 className="orangeText">Now playing: {this.state.songs[this.state.currentSong].title}</h3>
            <input className="audioControl" type="image" src="/Previous.svg" onClick={()=>{return this.changeSong(-1)}} alt=""/>
            <audio onLoadedData={()=>{return this.displayDuration()}} onTimeUpdate={()=>{return this.displayTime()}} className="audio" id="audio" src={this.state.songs[this.state.currentSong].source} ref={(el)=>this.audioref = el}></audio>
            <input className="audioControl" type="image" src={this.state.button} onClick={this.playPause} alt="" />
            <input className="audioControl" type="image" src="/Next.svg" onClick={()=>{return this.changeSong(+1)}} alt="" />
            <h4>{this.state.time}/{this.state.duration}</h4>
          </div>
        </div>
      </div>
    );
  };
};
