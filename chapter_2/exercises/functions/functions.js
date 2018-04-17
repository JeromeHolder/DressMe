//Array of people, there is no need to change this
const PERSONDATA = [{
    name:"Michael",
    rank:4,
    age:19,
    score: 66
},{
    name:"Emily",
    rank:7,
    age:22,
    score: 37
},{
    name:"Sam",
    rank:2,
    age:23,
    score:80
},{
    name:"William",
    rank:10,
    age:26,
    score:11
},{
    name:"James",
    rank:8,
    age:26,
    score:28
},{
    name:"Mia",
    rank:5,
    age:28,
    score:54
},{
    name:"Isabella",
    rank:1,
    age:31,
    score:100
},{
    name:"Alex",
    rank:3,
    age:34,
    score:75
},{
    name:"Olivia",
    rank:6,
    age:36,
    score:42
},{
    name:"Geoff",
    rank:9,
    age:41,
    score:19
}]

// console.log(nameSearch("James",PERSONDATA));  // Should log that James was found at position #5

// function nameSearch(named, arr) {
//     for(var i = 0; i < arr.length; i++) {
//         if (arr[i].name === named) {
//             return named + " was found at position " + i;
//         }
//         else {
//             return named + " was not found";  
//             //if i comment the else out it will return the index correctly and undefined otherwise
//         }
//     }
// }
// search("Eric",PERSONDATA)   // Should log that Eric was not found.

// console.log(filter(PERSONDATA, 50)) // Should display an array of everyone with a score greater than 50
/* Ex:
[ { name: 'Alex', rank: 3, age: 34, score: 75 },
  { name: 'Isabella', rank: 1, age: 31, score: 100 },
  { name: 'Mia', rank: 5, age: 28, score: 54 },
  { name: 'Michael', rank: 4, age: 19, score: 66 },
  { name: 'Sam', rank: 2, age: 23, score: 80 } ]
*/

/*
    Write your functions below.
*/

// console.log(filter(PERSONDATA, 45));

// function filter(arr, x) {
//     let filtered = [];
//     arr.forEach(function(person){
//         if(person.score < x) {
//             filtered.push(person);
//         }
//     })
//     // for(var i = 0; i < arr.length; i++) {
//     //     if (arr[i].score < x) {
//     //         filtered.push(arr[i]);
//     //     }
//     // }
//     return filtered;
// }

const result = PERSONDATA.filter(item => item.score < 45);
console.log(result);

// console.log(PERSONDATA[0].score);