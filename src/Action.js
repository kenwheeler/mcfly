'use strict';
import Dispatcher from './Dispatcher';
import { Promise } from 'es6-promise';


function reThrow(reject, error) {
  setTimeout(() => {
    if (error && error.stack) {
        console.error(error.stack);
    }
    throw error;
  }, 0);
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

          try {
            Dispatcher.dispatch(payload);
          } catch (error) {
            reThrow(reject, error);
          }

          resolve();
        });
      });
  }
}

export default Action;
