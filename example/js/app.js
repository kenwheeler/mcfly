var React = require('react');
var ReactDOM = require('react-dom');
var FluxCounterApp = require('./components/FluxCounterApp.react');

ReactDOM.render(
  <FluxCounterApp />,
  document.getElementById('flux-counter')
);
