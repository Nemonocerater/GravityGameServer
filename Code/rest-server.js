
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var leaderboard = require('./leaderboard-decorator');

module.exports.getServer = function getServer(port, leaderboard_connector) {
	var port = port;
	var app = express();
	
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(function(req, res, next) {
		console.log('%s %s', req.method, req.url);
		next();
	});
	app.all('/', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	});
	leaderboard.decorate (app, leaderboard_connector);
	
	var server = http.createServer(app);
	server.listen(port);
	return server;
};

