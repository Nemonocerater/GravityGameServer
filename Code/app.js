var redis = require('redis');
var LeaderboardConnector = require('./lib/leaderboard-connector');
var config = require('./config').production;

var connector = new LeaderboardConnector();

var server = require('./rest-server').getServer(
	config.server.port,
	connector
);
