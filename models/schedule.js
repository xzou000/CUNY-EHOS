const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
const connection = mongoose.createConnection("mongodb://xzou000:xzou000@ds121950.mlab.com:21950/ehos");

// Our schema for each waste pickup request
const scheduleSchema = new Schema({
    requestId: { type: Number }, // request id = _id from  inner join with users table to get first last, lab, department etc...
    start: { type: String, required: true }, // ID of lab person
    end: { type: String }, // Location of lab,
    eventType: { type: Number, required: true },
    serviced: { type: Boolean, required: true }, // pickup complete?
});
scheduleSchema.plugin(autoIncrement.autoIncrement, 'Schedule'); // _id auto increment
// Let's immediately export the schema
module.exports = connection.model('Schedule', scheduleSchema);