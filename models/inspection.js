const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
const connection = mongoose.createConnection("mongodb://xzou000:xzou000@ds121950.mlab.com:21950/ehos");

// Our schema for each waste pickup request
const inspectionSchema = new Schema({
    inspector: { type: Number, required: true }, // ID of the requester
    lab: { type: String, required: true }, // Location of lab will be an int later
    requested: { type: String }, // time inspection was created
});
inspectionSchema.plugin(autoIncrement.autoIncrement, 'Lab_Inspections'); // _id auto increment
// Let's immediately export the schema
module.exports = connection.model('Lab_Inspections', inspectionSchema);