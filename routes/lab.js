const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');

module.exports = (authRouter) => {
  // Our get request to check if the email that was entered on the front end is already in use.
  authRouter.get('/users/me', (request,response) => {
    User.find({ _id: request.decoded.userId},'first last email phone building department room privilege', (err,user) => {
      if (err) {
        // Connection error was found
        response.status(500).json({success: false, message: err});
      }
      else {
        if (user) {
          response.status(200).json({success: true, users: user});
        }
        else {
          response.status(200).json({success: false, message: "No new registrations."});
        }
      }
    });
  });
  return authRouter;    
}