import React from 'react';
import {Link} from 'react-router-dom';

export default class SongList extends React.Component{
    render(){
        return (
            this.props.songs.map((song, i) =>{
                return  <div className="media mediastyle">
                            <img className="align-self-center mr-3" src="/No_Image__placeholder.png" alt="Generic placeholder image"/>
                            <div className="media-body">
                                <Link className="mt-0" to='/'>{song.title}</Link>
                            </div>
                        </div>
                })
        )
    }
}