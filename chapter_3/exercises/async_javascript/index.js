const fs = require('fs');

var content;

fs.readFile('quote.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    if (data.indexOf('d') >= 0) {
        console.log(data);
    }
})