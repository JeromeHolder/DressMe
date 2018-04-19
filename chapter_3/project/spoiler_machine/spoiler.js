const request = require("request");
const cheerio = require("cheerio");

let movie;
let warningTime;
let title = [];
let headlines;
let overview;


// Accept command line arguments in any order and assigning the variables accordingly
if(!isNaN(parseInt(process.argv[2]))) {  
    movie = process.argv[3];
    warningTime = parseInt(process.argv[2]);
}
else {
    movie = process.argv[2];
    warningTime = parseInt(process.argv[3]);
}
const url = "https://www.google.ca/search?q=" + movie + "movie" + "news" + " -imdb";
const tmdbURL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key=1f39c18e7001daed72e0a151db90566a&query=' + movie;

// // Test if the movie exists, stores spoiler and headlines if it does
request(tmdbURL, function (error, response, body) {
  let obj = JSON.parse(body);
  if (error) throw new Error(error);
  else if (obj.results.length === 0) {
    console.log("That movie doesn't exist");
    return;
  }
  else {
    overview = "\n" + obj.results[0].overview + "\n";
    // Testing number and value of command line arguments
    if (warningTime < 0) {
      console.log('Error: Warning time cannot be negative');
    }
    else if (process.argv.length < 4) {
      console.log('Error: Not enough arguments.  Enter movie title (Surrounded by quotes if title is more than one word) and warning time.');
    }
    else if (process.argv.length > 4) {
      console.log('Error: Too many arguments.  Enter movie title (Surrounded by quotes if title is more than one word) and warning time.');
    }
    else {
      console.log("\n**spoiler warning** about to spoil the movie " + movie + " in " + warningTime + " seconds\n");
      setTimeout(function(){
        console.log(overview);
      }, (warningTime * 1000));
      request(url, function(error, response, body) {
        if(error) {
            console.log("Couldn't get page because of error: " + error);
            return;
        }
        var $ = cheerio.load(body), hline = $(".r a");
        hline.each(function (i, hline) {
            title.push($(hline).text()+"\n");
        })
        headlines = title.join("");
        console.log(headlines);
      })
    }
  }
});