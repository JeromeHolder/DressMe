import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component{   
    render(){
        // Loop through Todo
        let todoJSX = this.props.listContent.map((todos, i)=>{
            return <Todo content={todos.content} setComplete={this.props.setComplete} complete={todos.complete} index={i} key={i}/>
        })
        
        return (
            <ul className="list-group">
                {todoJSX}
            </ul>
        )
    }
}