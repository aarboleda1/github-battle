var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');
var Raven = require('raven-js')


ReactDOM.render(routes, document.getElementById('app'));