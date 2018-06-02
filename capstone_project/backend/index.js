const express = require('express'),
      app = express(),
      axios = require('axios'),
      config = require('./config'),
      mongoose = require('mongoose'),
      User = require('./models/User'),
      SA = require('./models/SA');
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

// This adds/updates existing records
// SA.updateOne(
//     {'_id': '5b12e4c9ef85b32a609679cb'},
//     { $set: {'blurb':'test 2'} }
// )
// .then(result => {
//     console.log(result);
// })
// .catch(err => {
//     console.log('error' + err);
// })

// finds a record by id
// SA.findById('5b12e4c9ef85b32a609679cb')
    // .then(result => {
    //     console.log(result);
    // })
    // .catch(err => {
    //     console.log(err);
    // })

app.post('/distance', (req, res) => {
    // Grabs user address from frontend
    let origin = req.body.origin;
    // Deep clone array and loop through to build destinations string for API call
    SA.find({})
      .then(results => {
        // console.log(results[0].avail[0].hours);
        let copy = Array.from(results);
        let destinations = '';
        for(let i = 0; i < copy.length; i++) {
            destinations = destinations + '|' + copy[i].addressString;
        };
        // API call
        axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+origin+'&destinations='+destinations+'key='+config.GOOGLE_API_KEY)
            .then(result => {

                //  unpacking results
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
                        distance: distancesFromUser[i]
                    }
                });
                res.json(infoToSend);
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
});

app.put('/book', (req, res) => {
    SA.updateOne(
        {'_id':'5b12fdfe39b7e907a4f76b34', 'avail._id': '5b12fdfe39b7e907a4f76b3f', 'avail.hours._id': '5b12fdfe39b7e907a4f76b42'},
        { $set: {'avail.hours.$$.booked':'true'} }
    )
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log('error' + err);
    })
})

app.listen(8080, ()=>{console.log('Server running on 8080');});