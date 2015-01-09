'use strict';
var Dispatcher = require('./Dispatcher');
var Promise = require('es6-promise').Promise;


function reThrow(reject, error) {
  setTimeout(function(){ throw error; }, 0);
  return reject();
}

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
    return Promise.resolve(this.callback.apply(this, arguments))
      .then(function(payload){
        return new Promise(function(resolve, reject){
          if (!payload) return reject();
          if (!payload.actionType) return reThrow(reject,
            "Payload object requires an actionType property"
          );
          Dispatcher.dispatch(payload)
          resolve();
        });
      });
  }
}

module.exports = Action;
