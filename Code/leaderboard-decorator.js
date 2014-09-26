var express = require('express');

function decorate (app, leaderboard_connector) {

	app.post('/leaderboard/:user/:score', function submitScore(req, res) {
		var user = req.params.user;
		var score = parseInt(req.params.score);

		leaderboard_connector.submitScore (user, score, function (err) {
			if (err) {
				res.end(err);
			}
			res.end("Success");
		});
	});

	app.get('/leaderboard/global/:page', function getGlobalScores(req, res) {
		var page = parseInt(req.params.page);

		leaderboard_connector.getGlobalScores (page, function (err, data) {
			if (err) {
				res.end(err);
			}
			res.end(JSON.stringify(data));
		});
	});

	app.get('/leaderboard/friends', function getFriendsScores(req, res) {
		leaderboard_connector.getFriendsScores (function (err, data) {
			if (err) {
				res.end(err);
			}
			res.end(JSON.stringify(data));
		});
	});

}

module.exports.decorate = decorate;
