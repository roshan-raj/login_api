const express = require('express');
const bodyParser = require("body-parser");

const connection = require('./db/db_config');
const mysql = require('mysql');

var authenticateController = require('./controllers/authenticate-controller');
var registerController = require('./controllers/register-controller');

const app = express();
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

app.get('/login.html', function (req, res) {
    res.sendFile(__dirname + "/" + "login.html");
})

/* route to handle login and registration */
app.post('/api/register', registerController.register);
app.post('/api/authenticate', authenticateController.authenticate);

app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);

//Setting up server
var server = app.listen(process.env.PORT || 3003, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});