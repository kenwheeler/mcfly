var mcFly = require('../flux/mcFly');

var FluxCounterActions = mcFly.createActions({
  countOne: function() {
    return {
      actionType: 'COUNT_ONE'
    }
  }
});

module.exports = FluxCounterActions;
