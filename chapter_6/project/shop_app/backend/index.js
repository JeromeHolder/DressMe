const express = require('express');
const app = express();
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
        },
        {
            name: 'High-heels',
            price: 130,
            picture: '/high-heels.jpg',
            type: 'shoe'
        },
        {
            name: 'Sandals',
            price: 40,
            picture: '/sandals.jpg',
            type: 'shoe'
        },
        {
            name: 'Linen',
            price: 120,
            picture: '/linen.jpg',
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
        },
        {
            name: 'Beanie',
            price: 20,
            picture: '/beanie.jpg',
            type: 'hat'
        },
        {
            name: 'Sun',
            price: 50,
            picture: '/sun.jpg',
            type: 'hat'
        },
        {
            name: 'Fez',
            price: 1000,
            picture: '/fez.jpg',
            type: 'hat'
        }
    ],
    cart: []
}

// Grabs item added to cart and sends back updated cart
app.post('/cart', (req, res) => {
    catalogue.cart.push(req.body.item);
    res.json(catalogue.cart);
})

// Sends catalogue to shop
app.get('/catalogue', (req, res) => {
    res.json(catalogue);
})

// Clears items in cart
app.post('/clearCart', (req, res) => {
    catalogue.cart = [];
    res.json(catalogue.cart);
})

app.listen(8080, ()=>{console.log("Server running on port 8080")});