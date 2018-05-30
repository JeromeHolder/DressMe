import React from 'react';
import {Route, Link} from 'react-router-dom';
import SADisplay from './SADisplay';

export default class SearchResults extends React.Component{
    render(){
        // I can modify this to just disply the name as a link on the side bar
        // SA profile page will be displayed to the right once clicked and booking will take place from there
        let saList = this.props.results.map((el, i) => {
            let urlParam = '/searchresults/' + el.id
            return <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                        <Link to={urlParam}>{el.fname} {el.lname}</Link>
                        <p>{el.rating}</p>
                        {/* Pass the el into SADisplay below */}
                        <Route path={urlParam} render={(props)=>{return <SADisplay SAinfo={el} match={props.match}/>}} />
                    </li>
        });
        return (
            <ul className="list-group">
                {saList}
            </ul>
        )
    };
};