
module.exports = exports = MockLeaderboardConnector = function () {
	
	this.submittedScore = false;

	this.globalScores = [];
	this.otherGlobalScores = [1];

	this.friendsScores = [];

	this.submitScore = function (user, oldScore, newScore, callback) {
		if (user != null &&
			typeof oldScore === 'number' &&
			typeof newScore === 'number')
		{
			this.submittedScore = true;
			callback();
		}
	};

	this.getGlobalScores = function (user, page, callback) {
		if (user !== null &&
			typeof page === 'number')
		{
			if (page !== 0)
			{
				callback(null, this.otherGlobalScores);
			}
			callback(null, this.globalScores);
		}
	};
	
	this.getFriendsScores = function (callback) {
		callback(null, this.friendsScores);
	};

};
