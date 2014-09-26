
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var leaderboard = require('./leaderboard-decorator');

module.exports.getServer = function getServer(port, leaderboard_connector) {
	var port = port;
	var app = express();
	
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	leaderboard.decorate (app, leaderboard_connector);
	
	var server = http.createServer(app);
	server.listen(port);
	return server;
};

