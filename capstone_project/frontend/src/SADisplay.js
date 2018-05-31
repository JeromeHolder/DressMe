import React from 'react';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export default class SADisplay extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedSA: null,
            value: '',
            dates: null
        };
    };

    // Sets state conditionally
    componentDidMount(){
        let sa = this.props.results.find(el => {
            return el.id === parseInt(this.props.match.params.id, 10);
        });
        if(sa !== undefined){
            this.setState({
                selectedSA: sa
            })
        }
    }

    // Updates state with value from date picker
    dateGrab = (x) => {
        this.setState({
            value: x.target.value
        });
    };

    // Submit handler for form
    formSubmit = (e) => {
        e.preventDefault();
        let foundAvail = this.state.selectedSA.avail.find(el =>{
            return el.day === this.state.value
        });
        if(foundAvail === undefined){
            this.setState({
                dates:null
            })
        }
        else {
            this.setState({
                dates: foundAvail.hours
            })
        }
    }

    render(){
        // conditionally displays the list of options based on whether availability exists or not
        let bookingOptions;
        if(this.state.dates === null){
            bookingOptions = <p>No availability for the date selected</p>
        }
        else {
            bookingOptions = <List>
                                {/* Needs onClick handler */}
                                {this.state.dates.map(value => (
                                <ListItem
                                    key={value}
                                    role={undefined}
                                    dense
                                    button
                                >
                                    <Checkbox
                                        disableRipple
                                    />
                                    <ListItemText primary={`Line item ${value + 1}`} />
                                
                                </ListItem>
                                ))}
                            </List>
        }

        // Conditionally renders the details page 
        if(this.state.selectedSA === null){
            return <div>doesn't exist</div>
        }
        else{
            let expertiseList = this.state.selectedSA.expertise.map((item, i) => {
                return <span key={i} >{item}</span>
            })
            return (
                <div className='SADisplay' >
                    <h1>{this.state.selectedSA.fname} {this.state.selectedSA.lname}</h1>
                    <img src={this.state.selectedSA.image} alt=""/>
                    <h2>{this.state.selectedSA.availRad}</h2>
                    <h3>{this.state.selectedSA.rating}</h3>
                    {expertiseList}
    
                    
                    <form className='date-container' noValidate onSubmit={this.formSubmit}>
                        <h3>Book</h3>
                        <TextField
                            id="date"
                            label="Select Date(s)"
                            type="date"
                            className='text'
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={this.dateGrab}
                            value={this.state.value}
                        />
                        <button type='submit' >Book these times</button>
                    </form>
                    <div >
                        {bookingOptions}
                    </div>
                </div>
            )
        }
    }
}