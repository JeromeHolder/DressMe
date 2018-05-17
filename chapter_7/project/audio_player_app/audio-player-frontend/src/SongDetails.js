import React from 'react';

export default class SongDetails extends React.Component{
    render(){
        let displaySong = this.props.songs[this.props.match.params.songId];
        return  <div>
                    <h1>Song Details</h1>
                    <h2>{displaySong.title}</h2>
                    <h3>{displaySong.description}</h3>
                    <h4>{displaySong.tempo}</h4>
                    {/* <button>Back</button> */}
                    <button onClick={()=>{this.props.listPlayHandler(displaySong.id)}}>Play</button>
                </div>
    }
}