import React from 'react';
import {withRouter} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Jumbotron } from 'reactstrap';

export default withRouter(class Login extends React.Component{
    constructor(){
        super();
        this.state={
            password: '',
            email:'',
            modal: false
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
            email:'',
            modal: !this.state.modal
        });
    };

    focus = () => {
        this.emailField.focus();
    }

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

    // Toggler for login modal
    toggle = (e) => {
        e.preventDefault();
        this.setState({
            modal: !this.state.modal
        }, ()=>{this.focus()});
    };

    render(){
        console.log(this.emailField);
        return(
            <div className='loginPage'>
                <div className='landingImages'>
                    <div className='landingOverlay'></div>
                    <div>
                        <h3 className='logo'>DressMe</h3>
                        <Button color='primary' onClick={this.toggle} className='loginlink fatFont'>Login</Button>
                    </div>
                    <div className="top img-fluid"></div>
                    <div className="middle img-fluid"></div>
                    <div className="bottom img-fluid"></div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                <Jumbotron className='modalStyle fatFont'>
                    <ModalHeader className='loginHeader' toggle={this.toggle}>You're about to look your best!</ModalHeader>
                    <ModalBody>
                        
                        <form className='loginForm' onSubmit={this.submit} >
                            <input className='loginField' ref={(ref) => this.emailField = ref} type="text" placeholder='Email Address' onChange={this.grabEmail} value={this.state.email} autoFocus/>
                            <input className='loginField' type="password" placeholder='Password' onChange={this.grabPassword} value={this.state.password}/>
                            <Button className='loginField' type='submit' disabled={this.state.password.length === 0 || this.state.email.length === 0? true:false}>Login</Button>
                            <h3 className='loginField'>{this.props.unsuccessful}</h3>
                        </form>
                        
                    </ModalBody>
                    </Jumbotron>
                </Modal>
            </div>
        )
    }
});