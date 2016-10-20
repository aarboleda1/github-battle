var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');
var Raven = require('raven-js');

// Sign up for Sentry and get your keys at sentry.reactjsprogram.com
var sentryKey = 'e8b0a0bcc81041d0b217dd0f2db119d3'
var sentryApp = '107920';
var sentryURL = 'https://' + sentryKey + '@sentry.io/' + sentryApp;

var _APP_INFO = {
  name: 'Github Battle',
  branch: 'video12',
  version: '1.0'
};
//a method on the window object in order to see errors from Raven
window.onerror = function () {
  Raven.showReportDialog();
}
//this configures Raven
Raven.config(sentryURL, {
  release: _APP_INFO.version,
  tags: {
    branch: _APP_INFO.branch,
    github_commit: 'tehehe'
  }
}).install();

//console.log(window.thing.nope)

ReactDOM.render(routes, document.getElementById('app'));