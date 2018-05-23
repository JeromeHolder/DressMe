import React from 'react';

export default class Todo extends React.Component {
    render() {
        return (
            <li className="list-group-item">
            {/* onChange handler that toggles completed status by applying the 'done' class to the label */}
                <input type="checkbox" checked={this.props.complete} onChange={()=>{this.props.setComplete(this.props.id, this.props.complete, this.props.content, this.props.index)}}/>
                <label className={ (this.props.complete) ? 'done':'' }>{this.props.content}</label>
            </li>
        );
    }
}
