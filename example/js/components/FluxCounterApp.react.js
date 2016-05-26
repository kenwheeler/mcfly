var React = require('react');
var CounterStore = require('../stores/CounterStore');
var FluxCounterActions = require('../actions/FluxCounterActions');
var FluxCounter = require('./FluxCounter.react');

const getState = function() {
  return {
    count: CounterStore.getCount()
  }
}

var FluxCounterApp = React.createClass({

  mixins: [CounterStore.mixin],

  getInitialState: function() {
    return getState();
  },

  storeDidChange: function() {
    this.setState(getState());
  },

  render: function() {
  	return (
      <div className="flux-counter-app">
        <FluxCounter count={this.state.count} onClick={() => FluxCounterActions.countOne()} />
      </div>
  	);
  }

});

module.exports = FluxCounterApp;
