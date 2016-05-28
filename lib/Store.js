'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Store class
 */

var Store = function () {

  /**
   * Constructs a Store object, extends it with EventEmitter and supplied
   * methods parameter,  and creates a mixin property for use in components.
   *
   * @param {object} methods - Public methods for Store instance
   * @param {function} callback - Callback method for Dispatcher dispatches
   * @constructor
   */

  function Store(methods, callback) {
    _classCallCheck(this, Store);

    var self = this;
    this.callback = callback;
    (0, _invariant2.default)(!methods.callback, '"callback" is a reserved name and cannot be used as a method name.');
    (0, _invariant2.default)(!methods.mixin, '"mixin" is a reserved name and cannot be used as a method name.');
    (0, _objectAssign2.default)(this, _events.EventEmitter.prototype, methods);
    this.mixin = {
      componentDidMount: function componentDidMount() {
        var _this = this;

        var warn = void 0;
        var changeFn = void 0;

        try {
          warn = (console.warn || console.log).bind(console);
        } catch (e) {
          warn = function warn() {
            return false;
          };
        }

        if (!this.storeDidChange) {
          warn("A component that uses a McFly Store mixin is not implementing storeDidChange. onChange will be called instead, but this will no longer be supported from version 1.0.");
        }
        changeFn = this.storeDidChange || this.onChange;
        if (!changeFn) {
          warn("A change handler is missing from a component with a McFly mixin. Notifications from Stores are not being handled.");
        }
        this.listener = function () {
          _this.isMounted() && changeFn();
        };
        self.addChangeListener(this.listener);
      },
      componentWillUnmount: function componentWillUnmount() {
        this.listener && self.removeChangeListener(this.listener);
      }
    };
  }

  /**
   * Returns dispatch token
   */


  _createClass(Store, [{
    key: 'getDispatchToken',
    value: function getDispatchToken() {
      return this.dispatcherID;
    }

    /**
     * Emits change event
     */

  }, {
    key: 'emitChange',
    value: function emitChange() {
      this.emit('change');
    }

    /**
     * Adds a change listener
     *
     * @param {function} callback - Callback method for change event
     */

  }, {
    key: 'addChangeListener',
    value: function addChangeListener(callback) {
      this.on('change', callback);
    }

    /**
     * Removes a change listener
     *
     * @param {function} callback - Callback method for change event
     */

  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(callback) {
      this.removeListener('change', callback);
    }
  }]);

  return Store;
}();

exports.default = Store;