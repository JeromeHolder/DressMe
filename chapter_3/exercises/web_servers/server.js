const express = require('express');
const app = express();

const twoDays = 17280000;
app.use(express.static('public', {
    maxAge: twoDays
}));

app.get('/', (req, res) => {
    res.send("Hello");
})

app.get('/joke', (req, res) => {
    return res.sendFile(__dirname + '/joke.html');
});

app.get('/calculator', (req, res) => {
    return res.sendFile(__dirname + '/public/calculator.html')
})

app.listen(8080, () => {
    console.log("Server started on http://localhost:8080");
    console.log("Press CTRL + C to stop server");
});