var AppController = require('../controller/AppController');

var _count = 0;

function countOne(text) {
  _count++;
}

var CounterStore = AppController.createStore({

  getCount: function() {
    return _count;
  }

}, function(payload){

  switch(payload.actionType) {
    case 'COUNT_ONE':
      countOne();
    break;
    default:
      return true;
  }

  CounterStore.emitChange();

  return true;

});

module.exports = CounterStore;
