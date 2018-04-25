const express = require('express');
const app = express();
const request = require("request");
app.use(express.static('public'));
app.set('view engine', 'ejs');

let popurl = 'https://api.themoviedb.org/3/movie/popular?api_key=1f39c18e7001daed72e0a151db90566a&language=en-US&page=1'
let popresults = {};
request(popurl, (error, res, body) => {
    if (error) {
        console.log(error);
    }
    else {
        popresults = JSON.parse(body);
        app.get('/', (req, res) => {res.render('index', JSON.parse(body));})
    }
});

app.get('/movie/:movieId', (req, res) => {
    let movieurl = 'https://api.themoviedb.org/3/movie/' + req.params.movieId + '?api_key=1f39c18e7001daed72e0a151db90566a&language=en-US';
    request(movieurl, (err, response, content) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render('movie', JSON.parse(content));
        }
    })
});

app.get('/search', (req, res) => {
    let searchURL = "https://api.themoviedb.org/3/search/movie?api_key=1f39c18e7001daed72e0a151db90566a&language=en-US&query=" + req.query.searchTerm + "&page=1&include_adult=false"
    request(searchURL, (err, response, data) => {
        if(err) {
            console.log(err);
        }
        else {
            let movieData = {searchTerm: req.query.searchTerm, results: JSON.parse(data).results}
            res.render('search', movieData);
        }
    })
})

app.get('*', (req, res) =>{
    res.render('index', popresults);
})

app.listen(8080, () => {console.log('Server started on http://localhost:8080\nPress CTRL + C to stop server');});