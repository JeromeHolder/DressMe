import React from 'react';
import {Link} from 'react-router-dom';

export default class SearchResults extends React.Component{
    render(){
        // Redirects to homepage on reload or if the user inputs something that doesn't exist
        // if(this.props.results === null || this.props.results === undefined || !this.props){
        //     this.props.history.push('/profile')
        // };
        let saList = this.props.results.map(el => {
            let urlParam = '/profile/searchresults/' + el.id
            return  <li className="resultItem align-items-center" key={el.id}>
                        <Link className='resultLink' to={urlParam} onClick={()=>{this.props.resultsClick(el)}} >{el.fname} {el.lname}</Link>
                        <div className='rateCon'>
                            <p className='rating'>{el.rating}</p>
                            <img className='star' src='/star.svg' alt=''></img>
                        </div>
                    </li>
        });
        return (
            <ul className="list-group sidebar">
                {saList}
            </ul>
        );
    };
};