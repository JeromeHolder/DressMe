import React from 'react';

class Todo extends React.Component{
    constructor(){
        super();
        this.state = {
            complete: false
        }
        this.setComplete = this.setComplete.bind(this)
    }

    setComplete(){
        this.setState({
            complete: !this.state.complete
        })
    }

    render(){
        return (
            <li className="list-group-item">
                <input type="checkbox" checked={this.state.complete} onChange={this.setComplete}/>
                <label className={ (this.state.complete) ? 'done':'' }>{this.props.listContent}</label>
            </li>
        )
    }
}

export default Todo;