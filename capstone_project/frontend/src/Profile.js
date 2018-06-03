import React from 'react';

export default class Profile extends React.Component{
    render(){
        let user = this.props.user[0];
        let bookingsJSX;
        if(user === undefined || user.bookings === undefined || user.bookings.length === 0 ) {
            bookingsJSX = <p>You have no upcoming appointments</p>
        }
        else {
            bookingsJSX = user.bookings.map((el, i) => {
                return  <div key={i}>
                            <p>{el.SA_fname} {el.SA_lname} on {el.date} at {el.hour.hour} <button onClick={()=>{this.props.cancelBooking(i, el.hour._id)}} >Cancel</button></p>
                        </div>
            })
        }
        if(user === undefined){
            return <p>loading</p>
        }
        else{
            return (
                <div>
                    <h2>{user.fname} {user.lname}</h2>
                    <img className='profilepic img-fluid' src={user.image} alt=""/>
                    <h3>{user.blurb}</h3>
                    <h3>Upcoming Appointments</h3>
                    {bookingsJSX}
                </div>
            )
        }
    }
}