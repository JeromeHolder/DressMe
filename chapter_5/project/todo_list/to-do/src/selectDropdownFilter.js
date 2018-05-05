import React from 'react';

export default class SelectDropdownFilter extends React.Component{
    render(){
        return(
            <select onChange={this.props.setFilter}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="complete">Complete</option>
            </select>
        )
    }    
}