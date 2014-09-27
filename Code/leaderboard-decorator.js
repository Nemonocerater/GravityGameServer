var express = require('express');

function decorate (app, leaderboard_connector) {

	app.post('/leaderboard/:user/:oldScore/:newScore', function submitScore(req, res) {
		var user = req.params.user;
		var oldScore = parseInt(req.params.oldScore);
		var newScore = parseInt(req.params.newScore);

		leaderboard_connector.submitScore (user, oldScore, newScore, function (err) {
			if (err) {
				res.end(err);
				return;
			}
			res.end("Success");
		});
	});

	app.get('/leaderboard/global/:user/:page', function getGlobalScores(req, res) {
		var user = req.params.user;
		var page = parseInt(req.params.page);

		leaderboard_connector.getGlobalScores (user, page, function (err, data) {
			if (err) {
				res.end(err);
				return;
			}
			res.end(JSON.stringify(data));
		});
	});

	app.get('/leaderboard/friends', function getFriendsScores(req, res) {
		leaderboard_connector.getFriendsScores (function (err, data) {
			if (err) {
				res.end(err);
				return;
			}
			res.end(JSON.stringify(data));
		});
	});

}

module.exports.decorate = decorate;
