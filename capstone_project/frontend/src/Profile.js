import React from 'react';
import {BounceLoader} from 'react-spinners';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Profile extends React.Component{
    constructor(){
        super();
        this.state={
            isLoading: true,
            modal: false,
            index: '',
            id: ''
        }
    }

    // Sets timeout for loading component
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2000)
    };

    // Grabs data from the item being cancelled, puts it in state and calls the toggle function
    modalPrep = (i, id) => {
        this.setState({
            index: i,
            id: id
        },()=>{this.toggle()})
    }

    // Toggler for modal
    toggle = (e, i, id) => {
        this.setState({
            modal: !this.state.modal
        })
    }

    // Grabs data from state and cancels the booking
    cancel = () => {
        this.props.cancelBooking(this.state.index, this.state.id);
        this.setState({
            modal: !this.state.modal,
            index: '',
            id: ''
        })
    }

    render(){
        let user = this.props.user[0];
        let bookingsJSX;
        if(user === undefined || user.bookings === undefined || user.bookings.length === 0 ) {
            bookingsJSX = <p>You have no upcoming appointments.</p>
        }
        else {
            bookingsJSX = user.bookings.map((el, i) => {
                return  <div key={i}>
                            <p>{el.SA_fname} {el.SA_lname} on {el.date} at {el.hour.hour} <Button className='cancel' onClick={()=>{this.modalPrep(i, el.hour._id)}} >Cancel</Button></p>
                        </div>
            })
        }
        if(this.state.isLoading){
            return <div className='loading'>
                        <BounceLoader
                        color={'#0268A6'} 
                        loading={this.state.isLoading} 
                        />
                    </div>
        }
        else{
            return (
                <div className='profileContent'>
                    <img className='profilepic img-fluid' src={user.image} alt=""/>
                    <hr className='separator'/>
                    <h2>{user.fname} {user.lname}</h2>
                    <hr className='separator'/>
                    <p className='blurb'>{user.blurb}</p>
                    <hr className='separator'/>
                    <h4 className='appointmentsHeader'>Upcoming Appointments</h4>
                    {bookingsJSX}
                    <Modal className='modalText ' isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader className='loginField' toggle={this.toggle}>Confirm Cancellation</ModalHeader>
                        <ModalBody>
                            Are you sure you want to cancel this appointment?
                            This can't be undone.
                        </ModalBody>
                        <ModalFooter>
                            <Button className='cancel' onClick={this.cancel}>Cancel This Appointment</Button>
                            <Button className='goBack' color="secondary" onClick={this.toggle}>Go Back</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )
        }
    }
}