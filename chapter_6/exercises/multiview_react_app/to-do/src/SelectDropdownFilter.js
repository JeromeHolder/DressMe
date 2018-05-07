import React from 'react';

export default class SelectDropdownFilter extends React.Component{
    render(){
        return(
            // onChange handler passing the event
            <select onChange={this.props.setFilter}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="complete">Complete</option>
            </select>
        )
    }    
}