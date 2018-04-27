const express = require('express');
const app = express();
const request = require("request");
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Calls API for popular movies
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

// Calls API for specific movie >> gets movie ID from dynamic link in search.ejs and index.ejs
app.get('/movie/:movieId', (req, res) => {
    // Used append_to_response to include /videos for trailer link
    let movieurl = 'https://api.themoviedb.org/3/movie/' + req.params.movieId + '?api_key=1f39c18e7001daed72e0a151db90566a&language=en-US&append_to_response=videos';
    request(movieurl, (err, response, content) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render('movie', JSON.parse(content));
        }
    })
});

// Calls API for search terms
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

// Redirects any non-existent endpoint to index
app.get('*', (req, res) =>{
    res.render('index', popresults);
})


app.listen(8080, () => {console.log('Server started on http://localhost:8080\nPress CTRL + C to stop server');});