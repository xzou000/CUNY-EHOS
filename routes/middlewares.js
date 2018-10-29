const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
  
// // Middleware mounted for any request on the router
function verifyToken (request, response, next) {
    console.log("Request type: "+ request.method);
    const token = request.headers['authorization'];
    if (!token) {
        response.status(401).json({success: false, message: "Token was not provided"});
    }
    else {      
        jwt.verify(token,dbConfig.secret, (err, valid) => {
            if (err) {
                response.status(403).json({success: false, message: "Token error: " + err});
            }
            else {
                // Token is valud and passed
                request.decoded = valid;
                console.log("Token is valid");
                
                next();
            }
        });
    }
};
module.exports = verifyToken;

