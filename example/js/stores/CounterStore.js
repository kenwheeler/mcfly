var mcFly = require('../flux/mcFly');

var _count = 0;

function countOne(text) {
  _count++;
}

var CounterStore = mcFly.createStore({

  getCount: function() {
    return _count;
  }

}, function(payload){
  var needsUpdate = false;

  switch(payload.actionType) {
    case 'COUNT_ONE':
      countOne();
      needsUpdate = true;
      break;
  }

  if (needsUpdate) {
    CounterStore.emitChange();
  }

});

module.exports = CounterStore;
