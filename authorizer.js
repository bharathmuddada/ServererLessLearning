const { CognitoJwtVerifier } = require("aws-jwt-verify");
const COGNITO_USERPOOL_ID = process.env.COGNITO_USERPOOL_ID;
const COGNITO_WEB_CLIENT_ID = process.env.COGNITO_WEB_CLIENT_ID;


const jwtVerifier = CognitoJwtVerifier.create({
    userPoolId: COGNITO_USERPOOL_ID,
    tokenUse: "id",
    clientId: COGNITO_WEB_CLIENT_ID
  })
const generatePolicy = (principalId, effect, resource) => { 
    var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        let policyDocument = {
        Version : '2012-10-17', // default version
        Statement : [{
            Action: 'execute-api:Invoke', // default action
            Effect: effect,
            Resource: resource,
        }],
    }; authResponse.policyDocument = policyDocument;
    }
    authResponse.context = {
        stringKey: 'stringval',
        numberKey: 123,
        booleanKey: true,
    };
    console.log('authResponse', authResponse);
    return authResponse;    
};

exports.handler =  (event,context,callback) => {
   //lambda authorizer code
   var token = event.authorizationToken;
   switch (token) {
       case 'allow':
           callback(null, generatePolicy('user', 'Allow', event.methodArn));
           break;
       case 'deny':
           callback(null, generatePolicy('user', 'Deny', event.methodArn));
           break;
       case 'unauthorized':
           callback('Unauthorized'); // Return a 401 Unauthorized response
           break;
       default:
           callback(null, generatePolicy('user', 'Deny', event.methodArn));
   }
 }