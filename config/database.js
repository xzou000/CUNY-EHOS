/*
  This config file stores the info needed to connect to my test MongoDB database
*/
const hashKey = require('crypto').randomBytes(256).toString('hex'); // Use crypto module in nodejs to create a secret
module.exports = {
    uri: "mongodb://xzou000:xzou000@ds121950.mlab.com:21950/ehos",
    secret: hashKey,
    options: { useMongoClient: true },
    db: 'ehos'
}