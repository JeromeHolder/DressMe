import React from 'react';
import {Link} from 'react-router-dom';

export default class SongList extends React.Component{
    render(){
        return (
            this.props.songs.map((song, i) =>{
                return  <div>
                            <Link to='/'>{song.title}</Link>
                            <audio src={song.source} controls></audio>
                            <p>{song.description}</p>
                        </div>
                    
                })
        )
    }
}