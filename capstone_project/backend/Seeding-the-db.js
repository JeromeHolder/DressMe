// Create a user
// let newUser = User({
//     fname: 'Alan',
//     lname: 'Turing',
//     address: {
//         number: 460,
//         street: 'King St W',
//         city: 'Toronto',
//         province: 'On'
//     },
//     addressString: '460+King+St+W+Toronto+On',
//     image: '/user.jpg',
//     blurb: "I am terrible at finding good clothes for myself.  I never know what's trendy and I just can't keep up!",
//     bookings: [],
//     email: 'dressme@dressme.com',
//     password: '$2b$12$qW5s2a482Dl8VnNK2MEBW.JM4x0.4pl9MlDtcgc3HMXxGHuZaDGZm'
// });
// newUser.save()
//        .then(savedUser => {
//            console.log(savedUser);
//        })
//        .catch(err => {
//            console.log(err);
//        });

// Registering a new user
// app.post('/api/register', (req, res) => {
//     let {email, password} = req.body;
//     bcrypt.genSalt(12, (err, salt) => {
//         if(err){
//             return res.status(500).send('Error generating salt');
//         }
//         // If no error, use salt to generate hash
//         bcrypt.hash(password, salt, (err, hashedPassword) => {
//             if(err){
//                 return res.status(500).send('Error hashing password');
//             }
//             // If no error, save hashedPassword to db
//             console.log(hashedPassword);
//         });
//     });
// });

// Create new Schedules
// let newSchedule = Schedule({
//     day: '2018-06-11',
//     hours: [
//         {
//             hour: 8,
//             booked: false,
//             bookedBy: null
//         },
//         {
//             hour: 9,
//             booked: false,
//             bookedBy: null
//         },
//         {
//             hour: 10,
//             booked: false,
//             bookedBy: null
//         },
//         {
//             hour: 11,
//             booked: false,
//             bookedBy: null
//         },
//         {
//             hour: 12,
//             booked: false,
//             bookedBy: null
//         },
//         {
//             hour: 13,
//             booked: false,
//             bookedBy: null
//         },
//         {
//             hour: 14,
//             booked: false,
//             bookedBy: null
//         },
//     ]
// });

// newSchedule.save()
//      .then(savedSchedule => {
//          console.log(savedSchedule);
//      })
//      .catch(err => {
//          console.log(err);
//      }); 


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
//     avail: [
//     ],
//     blurb: '',
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
//         avail: [
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
//         avail: [
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
//         avail: [
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
//         avail: [
//         ]
//     }
// ];