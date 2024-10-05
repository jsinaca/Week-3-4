const dotenv = require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URL;
db.user = require('./userModel.js')(mongoose);
db.car = require('./carModel.js')(mongoose);

module.exports = db;