import React from 'react';

export default class SongDetails extends React.Component{
    render(){
        // Pulls out the specific song for easy reference and the id for the onClick handler
        let displaySong = this.props.songs[this.props.match.params.songId];
        let i = displaySong.id;
        return  <div className="media mainMargins">
                    <div className="media m-3">
                        <img className="media-object img-fluid albumpic" src="/No_Image__placeholder.png" alt=""/>
                    </div>
                    <div className="media-body m-1">
                        <h4 className="media-heading detailList border-bottom orangeText">{displaySong.title}</h4>
                        <div className="detailList border-bottom">
                            <h6>Description</h6>
                            <p>{displaySong.description}</p>
                        </div>
                        <div className="detailList border-bottom">
                            <h6>Tempo</h6>
                            <p>{displaySong.tempo}</p>
                        </div>
                        <input className="audioControl detailList" type="image" src={this.props.button} onClick={()=>{this.props.listPlayHandler(i)}} alt="" />
                    </div>
                </div>
    }
}
    