var React = require('react');
var FluxCounterActions = require('../actions/FluxCounterActions');

var FluxCounter = React.createClass({

  countOne: function() {
    FluxCounterActions.countOne();
  },

  render: function() {
    return (
      <div className="flux-counter">
        <p>{this.props.count}</p>
        <button type="button" onClick={this.countOne}>test</button>
      </div>
    );
  },

});

module.exports = FluxCounter;