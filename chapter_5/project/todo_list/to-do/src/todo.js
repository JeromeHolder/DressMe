import React, { Component } from 'react';

class Todo extends React.Component{
    render(){
        return(
            <li className="list-group-item">
                <input type="checkbox" value="on" checked={this.props.check}/>
                <label className={this.props.done}>{this.props.listContent}</label>
            </li>
        )
    }
}

export default Todo;