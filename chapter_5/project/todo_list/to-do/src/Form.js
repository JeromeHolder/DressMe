import React from 'react'

class Form extends React.Component{
    render(){
        return(
            <div className="input-group">
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="submit">Add</button>
                </span>
                <input className="form-control" placeholder="add a todo" />
            </div>
        )
    }
}

export default Form;