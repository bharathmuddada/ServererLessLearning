// 'use strict';

// const AWS = require('aws-sdk');
// AWS.config.region = 'us-east-1';


// exports.an_authenticated_user = async () => {
//     const userPoolID = process.env.USER_POOL_ID;
//     const clientID = process.env.CLIENT_ID;
//     const username = process.env.USERNAME;
//     const password = process.env.PASSWORD;

//     const params = {
//         AuthFlow: 'ADMIN_NO_SRP_AUTH',
//         ClientId: clientID,
//         UserPoolId: userPoolID,
//         AuthParameters: {
//             USERNAME: username,
//             PASSWORD: password
//         }
//     };

//     let user = await CognitoIdentity.adminInitiateAuth(params).promise();
//     return user;
// }