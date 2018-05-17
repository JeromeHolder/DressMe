import React from 'react';
import {Link} from 'react-router-dom';

export default class SongList extends React.Component{
    render(){
        return (
            // Maps songs sent from state in app.js and renders a list item for each
            this.props.songs.map((song, i) =>{
                let urlparam = "/" + song.id;
                return  <ul className="list-group" key={song.id}>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <Link to={urlparam}>{song.title}</Link>
                                <button className="badge badge-primary badge-pill" onClick={()=>{this.props.listPlayHandler(i)}}>Play</button>
                            </li>
                        </ul>
                })
        );
    };
};