const express = require('express'),
      app = express(),
      axios = require('axios'),
      config = require('./config'),
      mongoose = require('mongoose'),
      User = require('./models/User'),
      SA = require('./models/SA'),
      Schedule = require('./models/Schedule'),
      bcrypt = require('bcrypt');
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

// Login function
app.post('/api/login', (req, res) => {
    let email = req.body.email;
    let pw_guess = req.body.password;

    User.find({'email': email})
        .then(result => {
            if(result.length === 0) {
                res.status(401).send('Incorrect username or password.');
            }
            else {
                let user = result[0];
                bcrypt.compare(pw_guess, user.password, (err, results) => {
                    if(err){
                        console.log(err);
                        return res.status(500).send('Error authenticating user.');
                    }
                    if(!results){
                        return res.status(401).send('Incorrect username or password');
                    }
                    else {
                        let loginInfo = {userAddress:user.addressString, results:results};
                        res.send(loginInfo);
                    };
                });
            };
        })
        .catch(err => {
            console.log(err);
        });
});

// Initial request on load - gets data for current user
app.get('/api/user', (req, res) => {
    User.findById('5b15664c5cbe38164c3f86ae')
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
        {'_id': user},
        {'bookings': bookings}
        )
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        }); 
    res.send('Booked');
});

// Handles cancelling appointments
app.put('/api/cancel', (req, res) => {
    let id = req.body.id;
    let bookings = req.body.bookings;
    let user = req.body.user
    // Changes booking status to false for SA's schedule
    Schedule.updateOne(
        {'hours._id': id},
        { $set: {'hours.$.booked':'false'}}
        )
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    // Removes the bookedBy field in the SA's schedule
    Schedule.updateOne(
        {'hours._id': id},
        { $unset: {'hours.$.bookedBy': ""}}
        )
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    // Updates the User's record of bookings
    User.updateOne(
        {'_id': user},
        {'bookings': bookings}
        )
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
    res.send('Cancelled');
});

app.listen(8080, ()=>{console.log('Server running on 8080');});