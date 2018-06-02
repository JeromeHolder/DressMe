// Create a user
// let newUser = User({
//     fname: 'Basic',
//     lname: 'User',
//     address: {
//         number: 460,
//         street: 'King St W',
//         city: 'Toronto',
//         province: 'On'
//     },
//     addressString: '460+King+St+W+Toronto+On',
//     image: '/user.jpg',
//     blurb: 'I am a user'
// });
// newUser.save()
//        .then(savedUser => {
//            console.log(savedUser);
//        })
//        .catch(err => {
//            console.log(err);
//        });

// Create new SAs
// let newSA = SA({
//     fname: 'Johnny',
//     lname: 'Appleseed',
//     availRad: 20,
//     rating: 5,
//     address: {
//         number: 176,
//         street: 'Yonge St',
//         city: 'Toronto',
//         province: 'ON'
//     },
//     addressString: '176+Yonge+St+Toronto+ON',
//     image: '/Johnny_Appleseed.jpg',
//     expertise: [
//         'Formal',
//         'Business'
//     ],
//     id: 3,
//     avail: [{
//         day: '2018-06-08',
//         hours: [
//             {
//                 hour: 8,
//                 booked: false
//             },
//             {
//                 hour: 9,
//                 booked: false
//             },
//             {
//                 hour: 10,
//                 booked: false
//             },
//             {
//                 hour: 11,
//                 booked: false
//             }
//         ]
//         },
//         {
//         day: '2018-06-09',
//         hours: [
//             {
//                 hour: 8,
//                 booked: false
//             },
//             {
//                 hour: 9,
//                 booked: false
//             },
//             {
//                 hour: 10,
//                 booked: false
//             },
//             {
//                 hour: 11,
//                 booked: false
//             }
//         ]
//         },
//         {
//         day: '2018-06-10',
//         hours: [
//             {
//                 hour: 8,
//                 booked: false
//             },
//             {
//                 hour: 9,
//                 booked: false
//             },
//             {
//                 hour: 10,
//                 booked: false
//             },
//             {
//                 hour: 11,
//                 booked: false
//             }
//         ]
//         }
//     ]
// });

// newSA.save()
//      .then(savedSA => {
//          console.log(savedSA);
//      })
//      .catch(err => {
//          console.log(err);
//      });

// const shoppingAssistants = [
//     {
//         fname: 'John',
//         lname: 'Doe',
//         availRad: 5,
//         rating: 3.5,
//         address: {
//             number: 55,
//             street: 'Mill St',
//             city: 'Toronto',
//             province: 'ON'
//         },
//         addressString: '55+Mill+St+Toronto+ON',
//         image: '/John_Doe.jpg',
//         expertise: [
//             'Business Casual',
//             'Business'
//         ],
//         id: 0,
//         avail: [{
//             day: '2018-06-08',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             },
//             {
//             day: '2018-06-09',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             },
//             {
//             day: '2018-06-10',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             }
//         ]
//     },
//     {
//         fname: 'Jane',
//         lname: 'Doe',
//         availRad: 10,
//         rating: 4,
//         address: {
//             number: 220,
//             street: 'Yonge St',
//             city: 'Toronto',
//             province: 'ON'
//         },
//         addressString: '220+Yonge+St+Toronto+ON',
//         image: '/Jane_Doe.jpg',
//         expertise: [
//             'Casual'
//         ],
//         id: 1,
//         avail: [{
//             day: '2018-06-08',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             },
//             {
//             day: '2018-06-09',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             },
//             {
//             day: '2018-06-10',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             }
//         ]
//     },
//     {
//         fname: 'Sally',
//         lname: 'Happy',
//         availRad: 15,
//         rating: 4.5,
//         address: {
//             number: 93,
//             street: 'Front St E',
//             city: 'Toronto',
//             province: 'ON'
//         },
//         addressString: '93+Front+St+E+Toronto+ON',
//         image: '/Sally_Happy.jpg',
//         expertise: [
//             'Business'
//         ],
//         id: 2,
//         avail: [{
//             day: '2018-06-08',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             },
//             {
//             day: '2018-06-09',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             },
//             {
//             day: '2018-06-10',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             }
//         ]
//     },
//     {
//         fname: 'Johnny',
//         lname: 'Appleseed',
//         availRad: 20,
//         rating: 5,
//         address: {
//             number: 176,
//             street: 'Yonge St',
//             city: 'Toronto',
//             province: 'ON'
//         },
//         addressString: '176+Yonge+St+Toronto+ON',
//         image: '/Johnny_Appleseed.jpg',
//         expertise: [
//             'Formal',
//             'Business'
//         ],
//         id: 3,
//         avail: [{
//             day: '2018-06-08',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             },
//             {
//             day: '2018-06-09',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             },
//             {
//             day: '2018-06-10',
//             hours: [
//                 {
//                     hour: 8,
//                     booked: false
//                 },
//                 {
//                     hour: 9,
//                     booked: false
//                 },
//                 {
//                     hour: 10,
//                     booked: false
//                 },
//                 {
//                     hour: 11,
//                     booked: false
//                 }
//             ]
//             }
//         ]
//     }
// ];