/*jshint esversion: 6 */
// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');


var dbConfig = config.get('Customer.dbConfig');
console.log(dbConfig.host);
mongoose.connect(dbConfig.host);
console.log('connected');

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server Setup
const port = 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

module.exports =server;
