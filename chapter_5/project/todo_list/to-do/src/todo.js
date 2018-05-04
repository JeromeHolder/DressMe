import React from 'react';

export default class Todo extends React.Component {
    render() {
        return (
            <li className="list-group-item">
                <input type="checkbox" checked={this.props.complete} onChange={()=>{this.props.setComplete(this.props.index)}}/>
                <label className={ (this.props.complete) ? 'done':'' }>{this.props.content}</label>
            </li>
        );
    }
}
