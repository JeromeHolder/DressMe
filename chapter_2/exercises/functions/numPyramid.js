function printPyramid(x) {
    for (let i = 1; i <= x; i++) {
        let newLine = '';
        let filler = '';
        for (let j = 0; j < i; j++) {
            newLine += i + " ";
        }
        for (let k = x - i; k > 0; k--) {
            filler += ' ';
        }
        console.log(filler + newLine);
    }
}
printPyramid(8);