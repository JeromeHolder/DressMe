import React from 'react';

export default class Profile extends React.Component{
    render(){
        let user = this.props.user;
        return (
            <div>
                <h2>{user.fname} {user.lname}</h2>
                <img className='profilepic img-fluid' src={user.image} alt=""/>
                <h3>{user.blurb}</h3>
            </div>
        )
    }
}