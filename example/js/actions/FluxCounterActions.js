var AppController = require('../controller/AppController');

var FluxCounterActions = AppController.createActions({
  countOne: function() {
    return {
      actionType: 'COUNT_ONE'
    }
  }
});

module.exports = FluxCounterActions;
