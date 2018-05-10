import React from 'react';
import {Redirect} from 'react-router-dom';

export default class Home extends React.Component{
    constructor(){
        super();
        this.state={
            textInput: '',
            redirect: false
        }
    }

    // Changes state if text is input, thereby enabling the button
    buttonValidate = (e) => {
        this.setState({
            textInput: e.target.value
        })
    }

    // grabs text from the input ref and sends it to App
    textGrab = (e) => {
        e.preventDefault();
        this.props.grabUserName(this.input.value);
        this.input.value='';
        this.setState({
            redirect: true
        })
    }

    render(){
        // Redirects if the user is logged in (i.e. there is a username in local storage)
        if(this.state.redirect){
            return <Redirect to='/shop' />
        }
        else {
            return (
                <div>
                    <h1>Home</h1>
                    <form onSubmit={this.textGrab}>
                        <h2>Enter your name</h2>
                        <input onChange={this.buttonValidate} type="text" placeholder='User Name' ref={(input) => this.input = input}/>
                        <button disabled={this.state.textInput.length === 0 ? true : false} type='submit'>Enter</button>
                    </form>
                </div>
            )
        }
    }
}