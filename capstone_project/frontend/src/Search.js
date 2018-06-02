import React from 'react';
import SearchResults from './SearchResults';
import SADisplay from './SADisplay';
import {Route} from 'react-router-dom';

export default class Search extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedSA: null
        }
    }

    // Click handler for SearchResults list -- sets state here to pass down to SADisplay -- needed because SearchResults and SADisplay are siblings
    resultsClick = (el) => {
        this.setState({
            selectedSA: el
        })
    }

    render(){
        // Container for search results and details grid
        return (
            <div className='app-container'>
                <Route path='/searchresults' render={()=>{return <SearchResults results={this.props.results} resultsClick={this.resultsClick} />}} />
                <Route path='/searchresults/:id' render={()=>{return <SADisplay results={this.state.selectedSA} bookFunction={this.props.bookFunction} />}} />
            </div>
        )
    }
}