var Dispatcher = require('./Dispatcher');

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
   * @constructor
   */
  dispatch() {
    Dispatcher.dispatch(this.callback.apply(this, arguments));
  }
}

module.exports = Action;
