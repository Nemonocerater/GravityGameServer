var Tie_Leaderboard = require('agoragames-leaderboard/lib/tie_ranking_leaderboard.js');

function LeaderboardConnector() {
	this.leaderboard = new Tie_Leaderboard ("gravity_game");
}

LeaderboardConnector.prototype.submitScore = function (user, oldScore, newScore, callback) {
	this.leaderboard.rankMemberIf (newScoreIsLarger, user, newScore, oldScore, null, function (reply) {
		callback(null);
	});
};

function newScoreIsLarger (member, currentScore, score, memberData, leaderboardOptions) {
	if (score == null) return true;
	if (score > currentScore) return true;
	return false;
}

LeaderboardConnector.prototype.getGlobalScores = function (user, pageOffset, callback) {
	var connector = this;
	this.leaderboard.rankFor (user, function (rank) {
		console.log(rank);
		if (rank) {
			getGlobalPage (connector.leaderboard, rank, pageOffset, callback);
		} else {
			// get the first page of the leaderboard
			// since they aren't in the database yet
			getGlobalPage (connector.leaderboard, 1, 0, callback);
		}
	});
};

function getGlobalPage (leaderboard, rank, pageOffset, callback) {
	var basePage = Math.floor (rank / leaderboard.pageSize);
	var page = basePage + pageOffset;
	leaderboard.leaders (page, {}, function (leaders) {
		callback(null, leaders);
	});
}

LeaderboardConnector.prototype.getFriendsScores = function (callback) {
	console.log('get friends scores');
	callback(null, []);
};

module.exports = exports = LeaderboardConnector;

/*
 *	User
 *	{
 *		id: ...,
 *		name: ...,
 *		highscore: ...,
 *	}
 *
 *	Scores ???
 *	{
 *		id: ...,
 *		userId: ...,
 *		scores: ...
 *	}
 *
 *	Submit Score
 *	Get Global Scores
 *		Should be paged by offset from player.
 *		if there are 100 per page, then +1 are
 *		the 100 past the player. -1 are the 100
 *		before the player.
 *	Get Friends Scores
 *		Get all friend's scores.
 *
 *	??	Get Rank
 *	??	Get Score
 *
 */
