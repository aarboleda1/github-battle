var React = require('react');
var PropTypes = React.PropTypes;

var styles = {
	container: {
		position: 'fixed',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		fontSize: '55px'
	},
	content: {
		textAlign: 'center',
		position: 'absolute',
		width: '100%',
		marginTop: '30px'
	}
}
//this module is a loading module, it when successfully mounted, it allows presents a load component that uses the setTimeoutInterval to make the Loading feature appear that is is blinking
var Loading = React.createClass({
	//these are props that can be interchanged when reusing this component
	propTypes: {
		text: PropTypes.string,
		speed: PropTypes.number
	},
	getDefaultProps: function () {
		return {
		  text: 'Loading',
		  speed: 350
		}
	},
	getInitialState: function() {
		//this is the intial state in the loading ubtton
		//the initial state of text is the value that is passed in as a prop
		this.originalText = this.props.text;
		return {
			text: this.originalText
		}
	},
	componentDidMount: function () {
		var stopper = this.originalText + '...'
		//once the Loading component is mounted, the set interval will run and change the 'state' of the of the Loading Comoponent. once it reaches
		//the stopper variable, it will reset it's state back to 'Loading'
		this.interval = setInterval(function () {
			if(this.state.text === stopper){
				
				this.setState({
					text: this.originalText
				})
			}else {
				//to make the text appear that it is blinking
				this.setState({
					text: this.state.text + '.'
				})	
			}
		}.bind(this), this.props.speed)
		//use the this binding above so that the this inside setState points to the same this object outside
	},
	componentWillUnmount: function () {
		clearInterval(this.interval)// points to the same interval from componentDidMount and clearInterval removes that
	},
	render: function () {
		return (
			<div style={styles.container}>
				<p style={styles.content}>{this.state.text}</p>
			</div>
		) 
	}
});

module.exports = Loading