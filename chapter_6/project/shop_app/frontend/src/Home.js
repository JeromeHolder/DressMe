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

    // Tests whether a user name exists in local storage and redirects to the shop if it does
    componentDidMount(){
        if(localStorage.userName){
            this.setState({
                redirect: true
            });
        }
    }

    // Changes state if text is input, thereby enabling the button
    buttonValidate = (e) => {
        this.setState({
            textInput: e.target.value.trimLeft()
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
                <div className="jumbotron img-fluid">
                    <div className="container-fluid">
                        <h1 className="display-4 jumbotext">Welcome to the P@RE Online Store</h1>
                        <h2 className="jumbotext">Login to access the store</h2>
                        <hr className="my-4"/>
                        <form onSubmit={this.textGrab}>
                            <input onChange={this.buttonValidate} type="text" placeholder='User Name' ref={(input) => this.input = input}/>
                            <button className="btn btn-primary" disabled={this.state.textInput.length === 0 ? true : false} type='submit'>Login</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}