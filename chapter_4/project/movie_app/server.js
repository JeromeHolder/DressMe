const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', {movies: getMovies()});
})

app.listen(8080, function(){
    console.log('Server started on http://localhost:8080\nPress CTRL + C to stop server');
})

function getMovies() {
    return [{
        title: 'Blade Runner',
        year: '1982',
        rated: 'R',
        released: '25 June 1982',
        runtime: '1h 57min',  
        genre: 'Sci-Fi, Thriller',
        director: 'Ridley Scott',
        writer: 'Hampton Fancher, David Peoples',
        actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
        plot: 'A blade runner must pursue and try to terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
        language: 'English',
        country: 'USA, Hong Kong'
    },{
        title: 'Ex Machina',
        year: '2015',
        rated: 'PG',
        released: '8 May 2015',
        runtime: '1h 48min',  
        genre: 'Drama, Mystery, Sci-Fi',
        director: 'Alex Garland',
        writer: 'Alex Garland',
        actors: 'Alicia Vikander, Domhnall Gleeson, Oscar Isaac',
        plot: 'A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a breath-taking humanoid A.I.',
        language: 'English',
        country: 'UK'
    }];
}