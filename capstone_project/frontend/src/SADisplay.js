import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class SADisplay extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedSA: null, //the SA selected, passed in as props from SearchResults->Search
            date: '', //date selected by the user
            hours: null, //hours available for that day
            selectedHours: [], //hours selected for booking by the user
            noavail: '',
            modal: false
        };
    };

    // Sets state conditionally
    componentDidMount(){
        this.setState({
            selectedSA: this.props.results
        });
    };

    // Forces update when another SA is clicked from the results list
    componentDidUpdate(prevProps, prevState){
        if(prevProps.results !== this.props.results){
            this.setState({
                selectedSA: this.props.results
            });
        }
    }

    // Updates state with value from date picker
    dateGrab = (x) => {
        this.setState({
            date: x.target.value
        }, ()=>{this.formSubmit()});
    };

    // Submit handler for form
    formSubmit = () => {
        // e.preventDefault();
        // Finds the matching date for the SA and returns that availability object
        let foundAvail = this.state.selectedSA.avail.find(el =>{
            return el.day === this.state.date
        });
        if(foundAvail === undefined){
            // If find is unsuccessful it sets/resets 
            this.setState({
                hours:null,
                noavail: 'There is no availability for this day.  Try another date.'
            });
        }
        else {
            // If find is successful it sets the hours for that day in state
            this.setState({
                hours: foundAvail.hours,
                noavail: ''
            });
        };
    };

    // onClick handler for list item checkboxes -- manages the array of selectedHours in state -- will be grabbed with a book button
    listCheck = (val) => {
        let copy = Array.from(this.state.selectedHours);
        let selected = copy.find(num => {
            return num.hour === val.hour
        });
        if(selected === undefined) {
            copy.push(val);
            this.setState({
                selectedHours: copy
            });
        }
        else {
            let indexToDelete = copy.indexOf(selected);
            copy.splice(indexToDelete, 1);
            this.setState({
                selectedHours: copy
            });
        };
    };

    // Collects data about the users booking for storage and display
    grabBooking = (e) => {
        e.preventDefault();

        let bookedRecord = [];
        this.state.selectedHours.forEach(el =>{
            let record = {
                SA_fname: this.state.selectedSA.fname,
                SA_lname: this.state.selectedSA.lname,
                date: this.state.date,
                hour: el
            };
            bookedRecord.push(record);
        });

        // Finds the id of the date selected
        let dateid = this.state.selectedSA.avail.find(el => {
            return el.day === this.state.date;
        });
        // Finds the ids of the hours selected
        let hoursIDs = this.state.selectedHours.map(el => {
            return el._id;
        });
        // Changes the frontend booked status of each hour booked - bookFunction below changes the db
        let copy = Array.from(this.state.hours);
        copy.forEach(element => {
            let foundMatch = this.state.selectedHours.find(el  => {
                return el._id === element._id
            })
            if(foundMatch !== undefined){
                element.booked = true;
            }
        });
        // Sets state for disabling list items once booked and resets the selected hours to an empty array
        this.setState({
            hours: copy,
            selectedHours: [],
            modal: !this.state.modal
        });
        this.props.bookFunction(dateid._id, hoursIDs, bookedRecord);
    };

    // Toggler for booking modal
    toggle = (e) => {
        e.preventDefault();
        this.setState({
            modal: !this.state.modal
        })
    }

    render(){
        // Conditionally displays the list of options based on whether availability exists or not
        let bookingOptions;
        if(this.state.hours === null){
            bookingOptions = <p>{this.state.noavail}</p>
        }
        else {
            bookingOptions = <form className='bookingOptions'>
                                {this.state.hours.map(val => (
                                <div className="form-check form-check-inline" key={val._id}>
                                    <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" disabled={val.booked} onClick={()=>{this.listCheck(val)}} />
                                    <label className="form-check-label" >{val.hour + ':00'}</label>
                                </div>
                                ))}
                                <Button className='btn-secondary custom-btn' onClick={this.toggle} disabled={this.state.selectedHours.length === 0 ? true : false} >Book Selected Hours</Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                                    <ModalHeader toggle={this.toggle}>Confirm Booking</ModalHeader>
                                    <ModalBody>
                                        Are you sure you want to book these appointments?
                                        You can cancel appointments later from your profile page.
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.grabBooking}>Book</Button>
                                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </form>
        }

        // Conditionally renders the details page 
        if(this.state.selectedSA === null){
            return <div className='SADisplay'>Doesn't Exist</div>
        }
        else{
            // Maps the list of expertise for the selected SA
            let expertiseList = this.state.selectedSA.expertise.map((item, i) => {
                return <span key={i} >{item} </span>
            })

            // Constructs the current date for use as the min to validate the datepicker
            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth()+1;
            if(month < 10) {
                month = '0' + month
            }
            let date = today.getDate();
            if(date < 10){
                date = '0' + date
            }
            let minString = year + '-' + month + '-' + date;
            return (
                <div className='SADisplay' >
                    <img className='SAprofilepic' src={this.state.selectedSA.image} alt=""/>
                    <hr className='separator'/>
                    <div className="profileTitle">
                    <h2>{this.state.selectedSA.fname} {this.state.selectedSA.lname}</h2>
                    <div className='SArateCon'>
                        <p className='SArating'>{this.state.selectedSA.rating}</p>
                        <img className='SAstar' src='/star.svg' alt=''></img>
                    </div>
                    </div>
                    <hr className='separator'/>
                    <p className='blurb'>{this.state.selectedSA.blurb}</p>
                    <hr className='separator'/>
                    <h5>Areas of Expertise</h5>
                    {expertiseList}
                    <hr className='separator'/>                    
                    <form className='date-container' >
                        <h5 className='appointmentsHeader'>Find Availability</h5>
                        <input className='datepicker' id="date" type="date" min={minString} required onChange={this.dateGrab} />
                    </form>
                    <div>
                        {bookingOptions}
                    </div>
                </div>
            )
        }
    }
};