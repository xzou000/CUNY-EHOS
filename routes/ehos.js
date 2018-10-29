const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
const verifyToken = require('./middlewares');

module.exports = (router) => {
  router.get('/users', verifyToken, (request,response) => {
    User.find({ _id: { $ne: request.decoded.userId }}, 'first last email phone building department room privilege approved', (err,user) => {
      if (err) {
        // Connection error was found
        response.status(500).json({success: false, message: err});
      }
      else {
        if (user) {
          response.status(200).json({success: true, users: user});
        }
        else {
          response.status(404).json({success: false, message: "Users not in system?"});
        }
      }
    });
  });
  
  router.get('/users/me', verifyToken, (request,response) => {
    User.findOne({ _id: request.decoded.userId }, 'first last email phone building department room privilege', (err,user) => {
      if (err) {
        // Connection error was found
        response.status(500).json({success: false, message: err});
      }
      else {
        if (user) {
          response.status(200).json({success: true, user: user});
        }
        else {
          response.status(200).json({success: false, message: "User not in system.. ."});
        }
      }
    });
  });

  router.get('/users/:id', verifyToken,(request,response) => {
    User.findOne({ _id: request.params.id }, 'first last email phone building department room privilege', (err,user) => {
      if (err) {
        // Connection error was found
        response.status(500).json({success: false, message: err});
      }
      else {
        if (user) {
          response.status(200).json({success: true, user: user});
        }
        else {
          response.status(404).json({success: false, message: "User not in system.. ."});
        }
      }
    });
  });

  router.patch('/users',verifyToken,(request, response) => {
    User.findOneAndUpdate({email: request.body.email}, request.body.user, (err,email) => {
      if (err) {
        console.log(err);
        response.status(500).json({ success: false, message: err });
      }
      else if (!email) {
        response.status(200).json({ success: false, message: "Email does not exist" });
      }
      else {
        response.status(200).json({ success: true, message: "Patched!" });
      }
    });
  });
  router.put('/users',verifyToken,(request, response) => {
    User.update({privilege: 2, approved: false},{approved: true}, {multi: true}, (err,accounts)=>{
      if (err) {
        response.status(500).json({ success: false, message: err });        
      }
      else {
        response.status(200).json({ success: true, message: "Users were approved!" });        
      }
    });
  });

  router.delete('/users/:email',(request,response) => {
    User.findOneAndRemove({email: request.params.email}, (err,email) => {
      if (err) {
        console.log(err);
        response.status(500).json({ success: false, message: err });
      }
      else if(!email){
        response.status(200).json({ success: false, message: "User not Found" });
      }
      else {
        response.status(200).json({ success: true, message: "User was deleted!" });
      }
    });
  });
  return router;
}
