import React from 'react';

export default class TodoForm extends React.Component{
    // Constructor to set up a controlled component to enable/disable the add button
    constructor(){
        super();
        this.state ={
            content:''
        };
        this.grabTodo = this.grabTodo.bind(this);
        this.updateContent = this.updateContent.bind(this);
    }

    updateContent(e){
        this.setState({
            content: e.target.value
        });
    }

    // Click handler that calls the addTodo function
    grabTodo(e){
        e.preventDefault();
        this.props.addTodo(this.state.content);
        this.setState({
            content: ''
        });
    }

    render(){
        return(
            <form onSubmit={this.grabTodo}>
                <div className="input-group">
                    <span className="input-group-btn">
                        <button disabled={this.state.content.length === 0 ? true : false} className="btn btn-primary btnColor" type="submit">Add</button>
                    </span>
                    <input type="text" onChange={this.updateContent} className="form-control" placeholder="Enter your task" value={this.state.content} /> {/* I could also use 'required' to validate the input instead of the controlled component */}
                </div>
            </form>
        )
    }
}


