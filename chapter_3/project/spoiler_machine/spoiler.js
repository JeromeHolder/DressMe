const request = require("request");
const cheerio = require("cheerio");

// let movie;
// let warningTime;

// if(!isNaN(parseInt(process.argv[2]))) {  
//     movie = process.argv[3];
//     warningTime = parseInt(process.argv[2]);
//     // console.log(movie + warningTime);
// }
// else {
//     movie = process.argv[2];
//     warningTime = parseInt(process.argv[3]);
//     // console.log(movie + warningTime);
// }

// const url = "https://www.google.ca/search?q=" + movie + "movie" + "news" + "-imdb";
// if (warningTime < 0) {
//     console.log('Error: Warning time cannot be negative');
//     // return;
// }
// else if (process.argv.length < 4) {
//     console.log('Error: Not enough arguments.  Enter movie title (Surrounded by quotes if title is more than one word) and warning time.');
// }
// else if (process.argv.length > 4) {
//     console.log('Error: Too many arguments.  Enter movie title (Surrounded by quotes if title is more than one word) and warning time.');
// }
// else {
//     console.log("\n**spoiler warning** about to spoil the movie " + movie + " in " + warningTime + " seconds\n");
//     request(url, function(error, response, body) {
//         // let totalResults = 0;
//         if(error) {
//             console.log("Couldn't get page because of error: " + error);
//             return;
//         }
    
//         var $ = cheerio.load(body),
//             hline = $(".r a");
        
//         hline.each(function (i, hline) {
//             var title = $(hline).text();
//             console.log(title);
//         })
//     })
    
//     setTimeout(function(){
//         console.log("\nThis is the spoiler!");
//     }, (warningTime * 1000));
// }



// with http
// var http = require("https");

// var options = {
//   "method": "GET",
//   "hostname": "api.themoviedb.org",
//   "port": null,
//   "path": "/3/search/movie?include_adult=false&page=1&query=arrival&language=en-US&api_key=1f39c18e7001daed72e0a151db90566a",
//   "headers": {}
// };

// var req = http.request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//     let obj = JSON.parse(body);
//     console.log(obj.results[0].overview);
//   });
// });

// req.write("{}");
// req.end();

// with request

var options = { method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie',
  qs: 
   { include_adult: 'false',
     page: '1',
     language: 'en-US',
     api_key: '<<api_key>>' },
  body: '{}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});