var React = require('react');
var PropTypes = React.PropTypes;
//this puke function is used to see all th user Data in JSON format
function puke(obj) {
	return <pre>{JSON.stringify(obj, null, ' ')}</pre>
}

function Results (props) {
  return ( 
  	<div>Results: {puke(props)}</div> 
  )
};
//these three PropTypes come from the ResultsContainer that will be rendered to the UI
Results.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	playersInfo: PropTypes.array.isRequired,
	scores: PropTypes.array.isRequired
}

module.exports = Results;