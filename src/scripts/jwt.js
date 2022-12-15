// Include Packages
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Set Variables
const jwtKey = "my_secret_key"; //probably have to change later
const jwtExpiry= '60d'; //how long before new one in seconds

// Functions


// Function Name: generateToken
// Function Description: Generate a JWT token for the user
// Function Params: userId
// Function Returns: JWT token (String); null if error
// Function Throws: Error if error
/* 
    Function Notes:
        - Use RSA SHA256 to generate the token
        - Use the userId to generate the token
        - Secret key is stored in the .env file
        - Timeout time = jwtExpiry
*/
function generateToken(uid) {
    return jwt.sign(uid, jwtKey);  
};
// TODO - Set JWT Expiry


// Function Name: parse
// Function Description: Verify the JWT token for the user
// Function Params: token
// Function Returns: True
// Function Throws: Error 403 if Token is invalid; Error 401 if token is empty; Error 404 if Token is not found
/*
    Function Notes:
        - Use RSA SHA256 to verify the token
        - Use the token to find out who the user is
        - This function will be called on every request, therefore, it should be fast; optimize as much as possible
*/
async function parse(token) {
    if (token) {
     try {
      return jwt.verify(token, jwtKey);
     } catch (err) {
      return null;
     }
    }
    return null;
};


module.exports = { generateToken, parse };