const fs = require('fs');

fs.readFile('quote.txt', 'utf8', function(err, data) {
    let dataString = data;
    // console.log(dataString);
    let arr = dataString.split(' ');
    // console.log(arr);
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].startsWith('b') || arr[i].startsWith('B')) {
            arr[i] = 'Brainstation';
        }
    }
    let newFile = arr.join(' ');
    // console.log(newFile);
    fs.writeFile('newquote.txt', newFile, function(){
        console.log('Done writing file');
    });
});