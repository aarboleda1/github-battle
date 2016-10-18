var React = require('react');
var Results = require('../components/Results')

var ResultsContainer = React.createClass({
	getInitialState: function () {
		return {
			isLoading: true,
			score: []
		}
	},
	componentDidMount: function () {
		//do something with username
		//this function calls the githubHelpers method and returns a promise
		//once it is done running and 'battling' the results of the battle will be returned
		githubHelpers.battle(this.props.location.state.playersInfo)
		.then(function (scores) {
			this.setState({
			  scores: scores,
			  isLoading: false
			})			
		}.bind(this))
	},
	render: function () {
		return (
			<Results 
			isLoading={this.state.isLoading}
			playersInfo={this.props.location.state.playersInfo} 
			scores={this.state.scores} />
		) 
	}
});

module.exports = ResultsContainer;