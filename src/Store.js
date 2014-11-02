var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('./Dispatcher');
var assign = require('object-assign');

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