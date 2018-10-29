const Waste = require('../models/waste');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
const verifyToken = require('./middlewares');
const moment = require('moment');

module.exports = (router) => {
  router.get('/', verifyToken, (request,response) => {
    Waste.find('_id userId location pending comments label requested', (err,waste_requests) => {
      if (err) {
        // Connection error was found
        response.status(500).json({success: false, message: err});
      }
      else {
        if (waste_requests) {
          response.status(200).json({success: true, requests: waste_requests});
        }
        else {
          response.status(404).json({success: false, message: "No requests in system."});
        }
      }
    });
    // TODO: implement the storage and supply request endpoints

  });
  
  router.get('/pickupRequests', verifyToken, (request,response) => {
    Waste.find('_id userId location pending comments label requested', (err,waste_requests) => {
        if (err) {
          // Connection error was found
          response.status(500).json({success: false, message: err});
        }
        else {
          if (waste_requests) {
            response.status(200).json({success: true, requests: waste_requests});
          }
          else {
            response.status(404).json({success: false, message: "No requests in system."});
          }
        }
      });
  });

  router.get('/pickupRequests/:id', verifyToken,(request,response) => {
    Waste.findOne({ _id: request.params.id }, '_id userId location pending comments label requested items', (err,waste_request) => {
      if (err) {
        // Connection error was found
        response.status(500).json({success: false, message: err});
      }
      else {
        if (waste_request) {
          response.status(200).json({success: true, request: waste_request});
        }
        else {
          response.status(404).json({success: false, message: "Request not in system."});
        }
      }
    });
  });

  router.patch('/pickupRequests/:id',verifyToken,(request, response) => {
    //The only thing that is able to change is the pending attribute, which relates with schedule assignment
    Waste.findOneAndUpdate({_id: request.params.id},{pending: request.body.pending}, (err,waste_request) => {
      if (err) {
        console.log(err);
        response.status(500).json({ success: false, message: err });
      }
      else if (!waste_request) {
        response.status(200).json({ success: false, message: "Request does not exist" });
      }
      else {
        response.status(200).json({ success: true, message: "Patched!" });
      }
    });
  });

  router.delete('/pickupRequests/:id',verifyToken,(request,response) => {
    Waste.findOneAndRemove({_id: request.params.id}, (err,waste_request) => {
      if (err) {
        console.log(err);
        response.status(500).json({ success: false, message: err });
      }
      else if(!waste_request){
        response.status(200).json({ success: false, message: "Request not Found" });
      }
      else {
        response.status(200).json({ success: true, message: "Request was deleted!" });
      }
    });
  });

  router.post('/pickupRequests', verifyToken, (request, response) => {
    let waste_request = new Waste({
      userId: request.body.requester, // user id - request.body._id 
      location: request.body.location, // Location of lab
      pending: true,
      comments: request.body.comments,
      requested: moment().format("YYYY-MM-DD"),
      label: 'LABEL FOR ' + moment().format("YYYY-MM-DD") + ' IS NEEDED',
      items: request.body.items
    });
    waste_request.save((error) => {
      if (error) {
        response.json({success: false, message: error});
      }
      else {
        response.json({success: true, message: 'Waste request sent!'});
      }
    });
  });
  return router;
}
