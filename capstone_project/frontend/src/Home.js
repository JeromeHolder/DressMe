import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component{
    render(){
        // console.log(this.props)
        let headlinesJSX = this.props.headlines.map((el, i) => {
            return <a href={el.link} key={i} > {el.text} </a>
        })
        return (
            <div>
                {headlinesJSX}
            </div>
        )
    }
}