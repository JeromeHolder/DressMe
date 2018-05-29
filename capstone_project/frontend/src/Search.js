import React from 'react';

export default class Search extends React.Component{
    constructor(){
        super();
        this.state = {
            distance: 5
        }
    }

    updateDistance = (e) => {
        this.setState({
            distance: e.target.value
        });
    }

    grabSearch = (e) => {
        e.preventDefault();
        this.props.search(this.state.distance);
        this.setState({
            distance: 5
        });
    };

    render(){
        return (
            <form onSubmit={this.grabSearch}>
                <div className="input-group flexbox">
                    <button className="btn btn-primary btnColor" type="submit">Search</button>
                    <select className='btn btn-primary btnColor' onChange={this.updateDistance}>
                        <option value="5">5km</option>
                        <option value="10">10km</option>
                        <option value="15">15km</option>
                        <option value="20">20km</option>
                    </select>
                </div>
            </form>
        )
    }
}