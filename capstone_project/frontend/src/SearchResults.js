import React from 'react';

export default class SearchResults extends React.Component{
    render(){
        return (
            <div>
                {this.props.results}
            </div>
        )
    }
}