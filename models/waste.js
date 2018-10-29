const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
const connection = mongoose.createConnection("mongodb://xzou000:xzou000@ds121950.mlab.com:21950/ehos");
// Our schema for each waste pickup request
const wasteRequestSchema = new Schema({
    userId: { type: Number, required: true }, // ID of the requester
    location: { type: String, required: true }, // Location of lab
    pending: { type: Boolean, required: true }, // needs to be scheduled
    requested: { type: String },
    label: { type: String, required: true },
    items: { type: Array, "default": [], required: true, lowercase: true },
    comments: { type: String }
});

wasteRequestSchema.plugin(autoIncrement.autoIncrement, 'Waste_Requests');
// Let's immediately export the schema
module.exports = connection.model('Waste_Requests', wasteRequestSchema);