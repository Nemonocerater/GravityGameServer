
module.exports = exports = MockLeaderboardConnector = function () {
	
	this.submittedScore = false;

	this.globalScores = [];
	this.otherGlobalScores = [1];

	this.friendsScores = [];

	this.submitScore = function (user, score, callback) {
		if (user != null && typeof score === 'number') {
			this.submittedScore = true;
			callback();
		}
	};

	this.getGlobalScores = function (page, callback) {
		if (page !== 0) {
			callback(null, this.otherGlobalScores);
		}
		callback(null, this.globalScores);
	};
	
	this.getFriendsScores = function (callback) {
		callback(null, this.friendsScores);
	};

};
