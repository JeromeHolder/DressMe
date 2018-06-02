import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export default class SADisplay extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedSA: null, //put this in Search and have the state change there (passed from SearchResults) to cause rerender in here
            date: '',
            hours: null,
            selectedHours: [],
            noavail: ''
        };
    };

    // Sets state conditionally
    componentDidMount(){
        let sa;
        if(this.props.results !== null){
            sa = this.props.results.find(el => {
            return el.id === parseInt(this.props.match.params.id, 10);
            });
        }
        if(sa !== undefined){
            this.setState({
                selectedSA: sa
            });
        };
    };

    // Updates state with value from date picker
    dateGrab = (x) => {
        this.setState({
            date: x.target.value
        });
    };

    // Submit handler for form
    formSubmit = (e) => {
        e.preventDefault();
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

    render(){
        // Conditionally displays the list of options based on whether availability exists or not
            // Will need to change how this finds availability if I add the booked bolean to the data structure on the backend
            // Or if I just use CSS to grey out and disable those that are booked I won't need to change how it finds availability
        let bookingOptions;
        if(this.state.hours === null){
            bookingOptions = <p>{this.state.noavail}</p>
        }
        else {
            bookingOptions = <List>
                                {/* Needs onClick handler for booking */}
                                {this.state.hours.map(val => (
                                <ListItem
                                    key={val.hour}
                                    role={undefined}
                                    dense
                                    button
                                >
                                    <Checkbox
                                        disableRipple
                                        // disabled
                                        onClick={()=>{this.listCheck(val)}}
                                    />
                                    <ListItemText primary={val.hour + ':00'} />
                                
                                </ListItem>
                                ))}
                                <button>Book Selected Hours</button>
                            </List>
        }

        // Conditionally renders the details page 
        if(this.state.selectedSA === null){
            return <div>Doesn't Exist</div>
        }
        else{
            // Maps the list of expertise for the selected SA
            let expertiseList = this.state.selectedSA.expertise.map((item, i) => {
                return <span key={i} >{item}</span>
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
                    <h1>{this.state.selectedSA.fname} {this.state.selectedSA.lname}</h1>
                    <img className='SAimage' src={this.state.selectedSA.image} alt=""/>
                    <h2>{this.state.selectedSA.availRad}</h2>
                    <h3>{this.state.selectedSA.rating}</h3>
                    {expertiseList}
    
                    
                    <form className='date-container' noValidate onSubmit={this.formSubmit}>
                        <h3>Find Availability</h3>
                        <input id="date" type="date" min={minString} required onChange={this.dateGrab} />
                        <button type='submit' >Check Availability</button>
                    </form>
                    <div >
                        {bookingOptions}
                    </div>
                </div>
            )
        }
    }
}