// 'use strict';
// let init = require('./steps/init');

// let {an_authenticated_user} = require('./steps/given');
// let idToken;

// describe('Given an authenticated user', () => { 

//     beforeAll(async () => {
//     init();
//     let user = await an_authenticated_user();
//     idToken = user.AuthenticationResult.idToken;
//     console.log(idToken);
//     });
//   })


//   describe('When we invoke POST /notes endpoint', () => { 
//         it('Should create a new note', async () => {
//             const response = await fetch('https://api.example.com/notes', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': idToken,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ title: 'Test Note', content: 'This is a test note.' })
//             });
//             expect(response.status).toBe(200);
//         });
    
//   })

