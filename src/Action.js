'use strict';
import Dispatcher from './Dispatcher';

function reThrow(reject, error) {
  if (error && error.stack) {
    console.error(error.stack);
  }
  return reject(error);
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
      .then((payload) => {
        return new Promise((resolve, reject) => {
          if (!payload) return reThrow(reject, 'Payload needs to be an object');
          if (!payload.actionType) return reThrow(reject, 'Payload object requires an actionType property');

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
