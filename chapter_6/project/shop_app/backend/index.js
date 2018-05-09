const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(express.json());

// Allows CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let catalogue = {
    shoes: [
        {
            name: 'Cross-trainer',
            price: 120,
            picture: '/crossTrainer.jpg',
            type: 'shoe'
        },
        {
            name: 'Running',
            price: 100,
            picture: '/running.jpg',
            type: 'shoe'
        },
        {
            name: 'Dress',
            price: 150,
            picture: '/dress.jpg',
            type: 'shoe'
        }
    ],
    hats: [
        {
            name: 'Baseball cap',
            price: 30,
            picture: '/baseballCap.jpg',
            type: 'hat'
        },
        {
            name: 'Flat cap',
            price: 65,
            picture: '/flatCap.jpg',
            type: 'hat'
        },
        {
            name: 'Top hat',
            price: 90,
            picture: '/topHat.jpg',
            type: 'hat'
        }
    ]
}

let cart = []

// Grabs item added to cart and sends back updated cart
app.post('/cart', (req, res) => {
    cart.push(req.body.item);
    res.json(cart);
})

// Sends catalogue to shop
app.get('/catalogue', (req, res) => {
    res.json(catalogue);
})

app.listen(8080, ()=>{console.log("Server running on port 8080")});