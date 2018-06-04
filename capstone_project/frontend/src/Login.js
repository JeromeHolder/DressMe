import React from 'react';
import {withRouter} from 'react-router-dom';

export default withRouter(class Login extends React.Component{
    constructor(){
        super();
        this.state={
            password: '',
            email:''
        }
    };

    // Redirects to profile if already logged in
    componentDidMount(){
        if(localStorage.login_status){
            this.props.history.push('/profile');
        };
    };

    // Collects login info and sends it to app for authentication
    submit = (e) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
        this.setState({
            password:'',
            email:''
        });
    };

    // Gets text from password field
    grabPassword = (e) => {
        this.setState({
            password: e.target.value.trimLeft()
        });
    };

    // Gets text from email field
    grabEmail = (e) => {
        this.setState({
            email: e.target.value.trimLeft()
        });
    };

    render(){
        return(
            <div>
                <form onSubmit={this.submit}>
                    <input type="text" placeholder='Email Address' onChange={this.grabEmail} value={this.state.email} />
                    <input type="password" placeholder='Password' onChange={this.grabPassword} value={this.state.password}/>
                    <button type='submit' disabled={this.state.password.length === 0 || this.state.email.length === 0? true:false}>Login</button>
                    <h3>{this.props.unsuccessful}</h3>
                </form>
            </div>
        )
    }
});