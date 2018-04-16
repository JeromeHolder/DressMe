const textArr = ['Hello', 'World'];
const textArr2 = ['The', 'Quick', 'Brown', 'Fox', 'This is a test'];

function framedString(x) {
    let border = '*';
    var maxLength = 0;
    for (var i = 1; i < x.length; i++) {
        if (x[i].length > x[0].length) {
            maxLength = x[i].length;
        }
    }
    console.log(border.repeat(maxLength + 4));
    for (let j = 0; j < x.length; j++) {
        let fill = ' ';
        let count = (maxLength - x[j].length);
        console.log("* " + x[j] + fill.repeat(count) + " *");
    }
    console.log(border.repeat(maxLength + 4));
}
framedString(textArr2);