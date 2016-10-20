var axios = require('axios');
var logCustomMessage = require('./logCustomMessage');

//if you do get rate limited fill out those bottom two variables
var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?clien_id" + id + "&client_secret=" + sec
//getUserInfo returns us a promise
function getUserInfo (username) {
	return axios.get('http://api.github.com/users/' + username + param);
}
//fetches username repos
function getRepos (username) {
	return axios.get('http://api.github.com/users/' + username + '/repos' + param + '&per_page100');
}
//calculates and adds up all the stars that the user has
function getTotalStars (repos) {
	return repos.data.reduce(function (prev, current) {
		return prev + current.stargazers_count
	}, 0)

}
//gets the repos, totalTotalStars and returns an object with that data
function getPlayersData (player) {
	return getRepos(player.login)
	.then(getTotalStars)
	.then(function (totalStars) {
		return {
			followers: player.followers,
			totalStars: totalStars
		}
	})
}
//returns an array, after running thru algorithm to determine a winner
function calculateScores (players) {
	return [
	  players[0].followers * 3 + players[0].totalStars,
	  players[1].followers * 3 + players[1].totalStars
	]
}


var helpers = {
	getPlayersInfo: function (players) {
		//loop over username and for each item in array. call getUserInfo
		//takes in an array of promises. and when each of those promises has resolved 
		//once first username and second username have been retrieved or resolved, the then function will run		
		return axios.all(players.map(function (username) {
			return getUserInfo(username)
		})).then(function (info) {
			return info.map(function (user) {
				return user.data;
			})
		}).catch(function (err) {
			console.warn('Error in getPlayersInfo', err)
		}) //will catch if there are any errors trying - not necessary but this is good practice
	}, 
	//this battle functio will put the two players against each other
	battle: function (players) {
		//this function invokes both playersData see line 23 above
		var playerOneData = getPlayersData(players[0]);
		var playerTwoData = getPlayersData(players[1]);

		return axios.all([playerOneData, playerTwoData])
		.then(calculateScores)
		.catch(function (err) {
			console.warn('Error in getPlayersInfo', err)
		})
	}
};

module.exports = helpers