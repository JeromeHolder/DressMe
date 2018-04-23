const express = require('express');
const app = express();
const request = require("request");
app.use(express.static('public'));
app.set('view engine', 'ejs');

let popurl = 'https://api.themoviedb.org/3/movie/popular?api_key=1f39c18e7001daed72e0a151db90566a&language=en-US&page=1'
request(popurl, function (error, res, body) {
    if (error) {
        console.log(error);
    }
    else {
        app.get('/', function(req, res) {
            res.render('index', JSON.parse(body));
        })
    }
});


app.get('/movie/:movieId', (req, res) => {
    let movieurl = 'https://api.themoviedb.org/3/movie/' + req.params.movieId + '?api_key=1f39c18e7001daed72e0a151db90566a&language=en-US';
    request(movieurl, function (err, res, body) {
        if(err) {
            console.log(err);
        }
        else {
            // set up to send to template --res.send won't work
            obj = JSON.parse(body);
            res.send(obj);
            // res.render('movie', JSON.parse(body));
        }
    })
    // let movies = getMovies();
    // for(let i = 0; i < movies.length; i++){
    //     if(req.params.movieId === movies[i].title){
    //         res.render('movie', movies[i]);
    //     }
    // }
});

app.listen(8080, function(){
    console.log('Server started on http://localhost:8080\nPress CTRL + C to stop server');
});

// API get popular for main page
// API search from search box
// API movie (using movie title from search)


// function getMovies() {
//     return [{
//         title: 'Blade Runner',
//         year: '1982',
//         rated: 'R',
//         released: '25 June 1982',
//         runtime: '1h 57min',  
//         genre: 'Sci-Fi, Thriller',
//         director: 'Ridley Scott',
//         writer: 'Hampton Fancher, David Peoples',
//         actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
//         plot: 'A blade runner must pursue and try to terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
//         language: 'English',
//         country: 'USA, Hong Kong'
//     },{
//         title: 'Ex Machina',
//         year: '2015',
//         rated: 'PG',
//         released: '8 May 2015',
//         runtime: '1h 48min',  
//         genre: 'Drama, Mystery, Sci-Fi',
//         director: 'Alex Garland',
//         writer: 'Alex Garland',
//         actors: 'Alicia Vikander, Domhnall Gleeson, Oscar Isaac',
//         plot: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a breath-taking humanoid A.I.',
//         language: 'English',
//         country: 'UK'
//     }];
// }