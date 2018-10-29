const Schedule = require('../models/schedule');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
const verifyToken = require('./middlewares');
const moment = require('moment');

module.exports = (router) => {
  router.get('/requests', verifyToken, (request,response) => {
    Schedule.find('id start end serviced eventType', (err,schedule) => {
      if (err) {
        // Connection error was found
        response.status(500).json({success: false, message: err});
      }
      else {
        if (schedule) {
          response.status(200).json({success: true, schedule: schedule});
        }
        else {
          response.status(404).json({success: false, message: "No scheduled pickups in system."});
        }
      }
    });
    // TODO: implement the storage and supply request endpoints

  });
  
// TODO: implement later
  router.patch('/:id',verifyToken,(request, response) => {
    //The only thing that is able to change is the pending attribute
    Schedule.findOneAndUpdate({_id: request.params.id, eventType: request.body.eventType}, {serviced: request.body.serviced}, (err,waste_request) => {
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

  

  router.post('/', verifyToken, (request, response) => {
    let schedule = new Schedule({
      // _id = id is already autoincremented 
      requestId: request.body.requestId, // user id - request.body._id 
      start: request.body.start, // Location of lab
      end: request.body.end,
      eventType: request.body.eventType,
      serviced: false
    });
    schedule.save((error) => {
      if (error) {
        response.json({success: false, message: error});
      }
      else {
        response.json({success: true, message: 'Event has been scheduled!'});
      }
    });
  });
  return router;
}
