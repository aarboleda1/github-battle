var React = require('react');
var PropTypes = React.PropsTypes;

function UserDetailsWrapper (props) {
  return (
  	<div className='col-sm-6'>
	  <h1 className='lead' font-weight='bold'>{props.header}</h1>
	  {props.children}
	</div>
  )
}

module.exports = UserDetailsWrapper;