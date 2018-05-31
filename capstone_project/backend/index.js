const express = require('express'),
      app = express(),
      axios = require('axios'),
      config = require('./config'),
      request = require('request'),
      cheerio = require('cheerio');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Allows CORS
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});

const shoppingAssistants = [
    {
        fname: 'John',
        lname: 'Doe',
        availRad: 5,
        rating: 3.5,
        address: {
            number: 300,
            street: 'Borough Dr',
            city: 'Scarborough',
            province: 'On'
        },
        addressString: '300+Borough+Dr+Scarborough+On',
        image: '/John_Doe.jpg',
        expertise: [
            'Business Casual',
            'Business'
        ],
        id: 0,
        avail: [{
            day: '2018-05-31',
            hours: [8, 9, 10, 11]
        }]
    },
    {
        fname: 'Jane',
        lname: 'Doe',
        availRad: 10,
        rating: 4,
        address: {
            number: 300,
            street: 'Borough Dr',
            city: 'Scarborough',
            province: 'On'
        },
        addressString: '300+Borough+Dr+Scarborough+On',
        image: '/Jane_Doe.jpg',
        expertise: [
            'Casual'
        ],
        id: 1,
        avail: [{
            day: '2018-05-31',
            hours: [8, 9, 10, 11]
        }]
    },
    {
        fname: 'Sally',
        lname: 'Happy',
        availRad: 15,
        rating: 4.5,
        address: {
            number: 300,
            street: 'Borough Dr',
            city: 'Scarborough',
            province: 'On'
        },
        addressString: '300+Borough+Dr+Scarborough+On',
        image: '/Sally_Happy.jpg',
        expertise: [
            'Business'
        ],
        id: 2,
        avail: [{
            day: '2018-05-31',
            hours: [8, 9, 10, 11]
        }]
    },
    {
        fname: 'Johnny',
        lname: 'Appleseed',
        availRad: 20,
        rating: 5,
        address: {
            number: 300,
            street: 'Borough Dr',
            city: 'Scarborough',
            province: 'On'
        },
        addressString: '300+Borough+Dr+Scarborough+On',
        image: '/Johnny_Appleseed.jpg',
        expertise: [
            'Formal',
            'Business'
        ],
        id: 3,
        avail: [{
            day: '2018-05-31',
            hours: [8, 9, 10, 11]
        }]
    }
];

app.post('/distance', (req, res) => {
    // Grabs user address from frontend
    let origin = req.body.origin;
    // Deep clone array and loop through to build destinations string for API call
    let copy = Array.from(shoppingAssistants);
    let destinations = '';
    for(let i = 0; i < copy.length; i++) {
        destinations = destinations + '|' + copy[i].addressString;
    };
    // API call
    axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins='+origin+'&destinations='+destinations+'key='+config.GOOGLE_API_KEY)
         .then(result => {
            //  unpacking results
             let infoReturned = result.data.rows[0].elements;
             let distancesFromUser;
            //  mapping results to get distance values
             distancesFromUser = infoReturned.map( el => {
                 return parseFloat(el.distance.text)
             });
            //  mapping through copy to produce a new dataset with distances from user and without addresses to send to frontend
             const infoToSend = copy.map((el, i) => {
                 let sendAvail = el.avail.map(obj => {
                     return {...obj}
                 })
               return {
                   'fname':el.fname,
                   'lname':el.lname,
                   'availRad':el.availRad,
                   'rating':el.rating,
                   'image':el.image,
                   'expertise':[...el.expertise],
                   'id':el.id,
                   'avail': sendAvail,
                   distance: distancesFromUser[i]
                }
             })
             res.json(infoToSend);
         })
         .catch(err => {
             console.log(err);
         });
});



app.get('/getHeadlines', (req, res) => {
    const url = "https://www.google.ca/search?q=" + "fashion" + "trends" + "toronto";
    let title = [];

    request(url, (error, response, body) => {
        if(error){
            console.log(error);
            return;
        }
        var $ = cheerio.load(body), hline = $(".r a");
        // console.log($(hline).attr('href'));
        hline.each((i, hline) => {
            title.push({text:$(hline).text(), link:$(hline).attr('href')} );
        })
        res.json(title);
    });
});

app.listen(8080, ()=>{console.log('Server running on 8080');});