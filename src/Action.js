var Dispatcher = require('./Dispatcher');
var invariant = require('invariant');
var Promise = require('es6-promise').Promise;

/**
 * Action class
 */
class Action {

  /**
   * Constructs an Action object
   *
   * @param {function} callback - Callback method for Action
   * @constructor
   */
  constructor(callback) {
    this.callback = callback;
  }

  /**
   * Calls callback method from Dispatcher
   *
   * @param {...*} arguments - arguments for callback method
   * @returns Promise object
   */
  dispatch() {
    var payload = this.callback.apply(this, arguments);
    payload && invariant(payload.actionType, "Payload object requires an actionType property");
    return new Promise(function(resolve, reject){
      if ( !payload ) {
        return reject();
      }
      Dispatcher.dispatch(payload);
      resolve();
    });
  }
}

module.exports = Action;
