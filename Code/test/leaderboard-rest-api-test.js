
var assert = require('assert');
var http = require('http');
var rest_server = require('../rest-server');
var MockLeaderboardConnector = require('./mock-leaderboard-connector');
var config = require('../config').development;

describe('leaderboard-rest-api-test', function () {
	var server;
	var mock_leaderboard_connector;
	
	before(function() {
		mock_leaderboard_connector = new MockLeaderboardConnector();
		server = rest_server.getServer(
			config.server.port,
			mock_leaderboard_connector);
	});

	describe('SubmitScore', function () {

		beforeEach( function () {
			mock_leaderboard_connector.submittedScore = false;
		});

		it('Submits a Score', function (done) {
			var user = "Some_User";
			var oldScore = 11;
			var newScore = 34;

			var url = '/leaderboard/' + user + "/" + oldScore + "/" + newScore;

			sendRequest('POST', url, {}, function (res) {
				// If there is no on data function then the
				// code will timeout and the test will fail.
				res.on('data', function(chunk) {});
				res.on('end', function () {
					assert(mock_leaderboard_connector.submittedScore, "Score was not submitted");
					done();
				});
			});
		});

	});

	describe('GetGlobalScores', function () {
		
		var user = 'test_user';

		it('Get Global Scores on page 0', function (done) {
			var page = 0;
			var url = '/leaderboard/global/' + user + '/' + page;

			sendRequest('GET', url, {}, function (res) {
				res.on('data', function (chunk) {
					var data = chunk.toString();
					var expected = JSON.stringify(mock_leaderboard_connector.globalScores);
					assert.strictEqual(data, expected);
				});
				res.on('end', function () {
					done();
				});
			});
		});

		it('Get Different Page of data', function (done) {
			var page = 1;
			var url = '/leaderboard/global/' + user + '/' + page;

			sendRequest('GET', url, {}, function (res) {
				res.on('data', function (chunk) {
					var data = chunk.toString();
					var expected = JSON.stringify(mock_leaderboard_connector.otherGlobalScores);
					assert.strictEqual(data, expected);
				});
				res.on('end', function () {
					done();
				});
			});
		});

	});

	describe('GetFriendsScores', function () {

		it('Get Friend\'s Scores', function (done) {
			var url = '/leaderboard/friends';

			sendRequest('GET', url, {}, function (res) {
				res.on('data', function (chunk) {
					var data = chunk.toString();
					var expected = JSON.stringify(mock_leaderboard_connector.friendsScores);
					assert.strictEqual(data, expected);
				});
				res.on('end', function () {
					done();
				});
			});
		});

	});

});

function sendRequest(method, path, data, callback) {
	var request_options = {
			host: 'localhost',
			port: config.server.port,
			path: path,
			method: method,
			headers: {
				'Content-Type': 'application/json'
			}
		};
	
	var request = http.request(request_options, callback);
	request.write(JSON.stringify(data));

	request.on('error', function (e) {
		var messageHeader = "sendRequest Error: ";
		if (typeof e === "string") {
			throw new Error(messageHeader + e);
		} else {
			throw new Error(messageHeader + e.message);
		}
	});

	request.end();
}

function checkIfErrorWasReturned(chunk) {
	var response = chunk.toString();
	var errorRegex = /^Error/;
	assert(errorRegex.exec(response) != null, "Error message was not formatted properly " + response);
}
