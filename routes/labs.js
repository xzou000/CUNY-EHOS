const Inspection = require('../models/inspection');
const Schedule = require('../models/schedule');
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');
const verifyToken = require('./middlewares');
const moment = require('moment');

module.exports = (router) => {
  router.get('/inspections', verifyToken, (request,response) => {
    Inspection.find('inspector lab requested', (err,inspections) => {
      if (err) {
        // Connection error was found
        response.status(500).json({success: false, message: err});
      }
      else {
        if (inspections) {
          response.status(200).json({success: true, inspections: inspections});
        }
        else {
          response.status(404).json({success: false, message: "No inspections in system."});
        }
      }
    });
  });
  router.get('/inspections/:id', verifyToken, (request,response) => {
    Inspection.findOne({_id: request.params.id},'inspector lab requested', (err,inspection) => {
      if (err) {
        // Connection error was found
        response.status(500).json({success: false, message: err});
      }
      else {
        if (inspection) {
          response.status(200).json({success: true, inspection: inspection});
        }
        else {
          response.status(404).json({success: false, message: "Inspection is not in system"});
        }
      }
    });
  });
  
  router.patch('/inspections/:id',verifyToken,(request, response) => {
    //The only thing that is able to change is the pending attribute
    Inspection.findOneAndUpdate({_id: request.params.id}, request.body.serviced, (err,waste_request) => {
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

  router.post('/inspections', verifyToken, (request, response) => {
    let inspection = new Inspection({
      // _id = id is already autoincremented 
      inspector: request.body.inspector, // user id - request.body._id 
      lab: request.body.lab, // Location of lab
      requested: request.body.requested,
    });
    inspection.save((error,ins_obj) => {
      if (error) {
        response.json({success: false, message: error});
      }
      else {
        console.log(inspection);
        
        let schedule = new Schedule({
          // _id = id is already autoincremented 
          requestId: ins_obj._id, // user id - request.body._id 
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
      }
    });
  });
  return router;
}
