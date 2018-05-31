import React from 'react';
import {Link} from 'react-router-dom';

export default class SearchResults extends React.Component{
    render(){
        let saList = this.props.results.map((el, i) => {
            let urlParam = '/searchresults/' + el.id
            return <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                        <Link to={urlParam}>{el.fname} {el.lname}</Link>
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