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

LeaderboardConnector.prototype.getGlobalScores = function (page, callback) {
	console.log('get global scores');
	callback(null, []);
};

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
