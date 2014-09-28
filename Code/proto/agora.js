var Tie_Leaderboard = require('agoragames-leaderboard/lib/tie_ranking_leaderboard.js');
var leaderboard = new Tie_Leaderboard("gravity_game");

/*
leaderboard.rankMember ("jill", 50, "Random data", function (reply) {
	console.log(reply);
	leaderboard.totalMembers (function (num) {
		console.log(num);
	});
});
*/

leaderboard.leaders (0, {
		page_size: 4
	}, function (a) {
		console.log(a);
	});
