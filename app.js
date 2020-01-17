// app.js

var express = require('express');
var bodyParser = require('body-parser');

var hnstory = require('./routes/hnstory.router'); // Imports routes for the hnstorys
var hnstory_removed = require('./routes/hnstory_removed.router'); // Imports routes for the hnstorys
var job = require('./jobs/job'); // Imports jobs
var app = express();

job.get_hnews()

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/hnstorys';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Cross Origin middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,DELETE,PUT")
    next()
   })
app.use('/hnstorys', hnstory);
app.use('/hnstory_removed', hnstory_removed);

var port = 3000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});


