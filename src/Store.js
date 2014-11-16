var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var invariant = require('invariant');

/**
 * Store class
 */
class Store {

  /**
   * Constructs a Store object, extends it with EventEmitter and supplied
   * methods parameter,  and creates a mixin property for use in components.
   *
   * @param {object} methods - Public methods for Store instance
   * @param {function} callback - Callback method for Dispatcher dispatches
   * @constructor
   */
  constructor(methods, callback) {
    var self = this;
    this.callback = callback;
    invariant(!methods.callback, '"callback" is a reserved name and cannot be used as a method name.');
    invariant(!methods.mixin,'"mixin" is a reserved name and cannot be used as a method name.');
    assign(this, EventEmitter.prototype, methods);
    this.mixin = {
      componentDidMount: function() {
        self.addChangeListener(this.onChange);
      },
      componentWillUnmount: function() {
        self.removeChangeListener(this.onChange);
      }
    }
  }

  /**
   * Returns dispatch token
   */
  getDispatchToken() {
    return this.dispatcherID;
  }

  /**
   * Emits change event
   */
  emitChange() {
    this.emit('change');
  }

  /**
   * Adds a change listener
   *
   * @param {function} callback - Callback method for change event
   */
  addChangeListener(callback) {
    this.on('change', callback);
  }

  /**
   * Removes a change listener
   *
   * @param {function} callback - Callback method for change event
   */
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

}

module.exports = Store;