'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function reThrow(reject, error) {
  if (error && error.stack) {
    console.error(error.stack);
  }
  return reject(error);
}

/**
 * Action class
 */

var Action = function () {

  /**
   * Constructs an Action object
   *
   * @param {function} callback - Callback method for Action
   * @constructor
   */

  function Action(callback) {
    _classCallCheck(this, Action);

    this.callback = callback;
  }

  /**
   * Calls callback method from Dispatcher
   *
   * @param {...*} arguments - arguments for callback method
   * @returns Promise object
   */


  _createClass(Action, [{
    key: 'dispatch',
    value: function dispatch() {
      return Promise.resolve(this.callback.apply(this, arguments)).then(function (payload) {
        return new Promise(function (resolve, reject) {
          if (!payload) return reThrow(reject, 'Payload needs to be an object');
          if (!payload.actionType) return reThrow(reject, 'Payload object requires an actionType property');

          try {
            _Dispatcher2.default.dispatch(payload);
          } catch (error) {
            reThrow(reject, error);
          }

          resolve();
        });
      });
    }
  }]);

  return Action;
}();

exports.default = Action;