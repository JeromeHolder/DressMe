import React from 'react';
import {Link, Redirect} from 'react-router-dom';

export default class SearchResults extends React.Component{
    render(){
        // Redirects to homepage on reload or if the user inputs something that doesn't exist
        if(this.props.results === undefined || this.props.results === null){
            return <Redirect to='/' />
        };

        let saList = this.props.results.map(el => {
            let urlParam = '/searchresults/' + el.id
            return  <li className="list-group-item d-flex justify-content-between align-items-center" key={el.id}>
                        <Link to={urlParam} onClick={()=>{this.props.resultsClick(el)}} >{el.fname} {el.lname}</Link>
                        <p>{el.rating}</p>
                    </li>
        });
        return (
            <ul className="list-group sidebar">
                {saList}
            </ul>
        )
    };
};