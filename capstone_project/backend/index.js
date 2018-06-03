const express = require('express'),
      app = express(),
      axios = require('axios'),
      config = require('./config'),
      mongoose = require('mongoose'),
      User = require('./models/User'),
      SA = require('./models/SA'),
      Schedule = require('./models/Schedule');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Connect to mongod server
mongoose.connect('mongodb://localhost/Capstone');
const db = mongoose.connection;
db.on('open', ()=>{console.log('Connected to mongodb');});


// Allows CORS
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});

// Initial request on load - gets data for current user
app.get('/api/user', (req, res) => {
    User.findById('5b14420fd7161c0b282bbac3')
        .then(result => {
            if(!result) {
                console.log('User does not exist');
            }
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
});

// Initial request on load - gets list of SAs and uses google distance Matrix API to return distance from current user
app.post('/api/distance', (req, res) => {

    // Grabs user address from frontend
    let origin = req.body.origin;
    
    // Deep clone array and loop through to build destinations string for API call
    SA.find({})
      .populate('avail')
      .then(results => {
        let copy = Array.from(results);
        let destinations = '';
        copy.forEach(el => {
            destinations = destinations + '|' + el.addressString;
        });

        // API call
        axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+origin+'&destinations='+destinations+'key='+config.GOOGLE_API_KEY)
            .then(result => {

                //  Unpacking results from google
                let infoReturned = result.data.rows[0].elements;

                //  mapping results to get distance values
                let distancesFromUser = infoReturned.map( el => {
                    return parseFloat(el.distance.text)
                });

                //  mapping through copy to produce a new dataset with distances from user and without addresses to send to frontend
                const infoToSend = copy.map((el, i) => {
                    return {
                        'fname':el.fname,
                        'lname':el.lname,
                        'availRad':el.availRad,
                        'rating':el.rating,
                        'image':el.image,
                        'expertise':[...el.expertise],
                        'id':el.id,
                        'avail': el.avail,
                        'blurb': el.blurb,
                        distance: distancesFromUser[i]
                    }
                });
                res.json(infoToSend);
            })
        })
        .catch(err => {
            console.log(err);
        });
});

// Handles the booking function from frontend
app.put('/api/book', (req, res) => {
    let bookings = req.body.bookings;
    let day = req.body.day;
    let user = req.body.user
    let hours = req.body.hours;
    // loops through 'hours' and updates db for each element(hous id) in the array
    hours.forEach(el => {
        Schedule.updateOne(
            {'_id':day, 'hours._id': el},
            { $set: {'hours.$.booked':'true', 'hours.$.bookedBy':user}}
            )
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log('error' + err);
            });
    });
    // Updates the users record of bookings
    User.updateOne(
        {'_id': '5b14420fd7161c0b282bbac3'},
        {'bookings': bookings}
        )
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })    
});

app.put('/api/cancel', (req, res) => {
    let id = req.body.id;
    let bookings = req.body.bookings;
    // console.log(req.body);
    Schedule.updateOne(
        {'hours._id': id},
        { $set: {'hours.$.booked':'false'}},
        { $unset: {'hours.$.bookedBy': ""}} //not working
        )
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    Schedule.updateOne(
        {'hours._id': id},
        { $unset: {'hours.$.bookedBy': ""}} //not working
        )
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    User.updateOne(
        {'_id': '5b14420fd7161c0b282bbac3'},
        {'bookings': bookings}
        )
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
})

app.listen(8080, ()=>{console.log('Server running on 8080');});