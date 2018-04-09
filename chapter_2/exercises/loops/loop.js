// Even Numbers
const arr1 = [5,8,2,1,5,7,3,4,5,8,1,2,4,8,3,1,4,5,14,25];
const arr2 = [15,26,74,12,3,6,9,1,2,5];

for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] % 2 === 0) {
        console.log(arr1[i]);
    }
}

for (var i = 0; i < arr2.length; i++) {
    if (arr2[i] % 2 === 0) {
        console.log(arr2[i]);
    }
}

// Largest Number
for (var i = 1; i < arr1.length; i++) {
    var x = 0;
    if (arr1[i] > arr1[0]) {
        x = arr1[i];
    } else {
        x = arr1[0];
    }
}
console.log(x);


// Number Triangle
for (i = 1; i < 5; i++) {
    var numString = "";
    for (var y = 1; y <= i; y++) {
        numString = numString + i;
    }
    console.log(numString);
}

// Number Pyramid
// for (var i = 1; i < 5; i++) {
//     var whiteSpace = "   ";
//     var num = i + " ";
//     for (var j = 1; j < i; j++) {
//         whiteSpace = whiteSpace.substring(1,whiteSpace.length);
//         num = num + i + " ";
//     }
//     console.log(whiteSpace + num);
// }

for (let i = 1; i < 5; i++) {
    let newLine = '';
    let filler = '';
    for (let j = 0; j < i; j++) {
        newLine += i + " ";
    }
    for (let k = 4 - i; k > 0; k--) {
        filler += ' ';
    }
    console.log(filler + newLine);
}