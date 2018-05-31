import React from 'react';
import SearchResults from './SearchResults';
import SADisplay from './SADisplay';
import {Route} from 'react-router-dom';

export default class Search extends React.Component{
    render(){
        // Container for search results and details grid
        return (
            <div className='app-container'>
                <Route path='/searchresults' render={()=>{return <SearchResults results={this.props.results} />}} />
                <Route path='/searchresults/:id' render={(props)=>{return <SADisplay results={this.props.results} match={props.match}/>}} />
            </div>
        )
    }
}