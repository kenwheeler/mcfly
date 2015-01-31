'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var iv = require('invariant');

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
    iv(!methods.callback, '"callback" is a reserved name and cannot be used as a method name.');
    iv(!methods.mixin,'"mixin" is a reserved name and cannot be used as a method name.');
    assign(this, EventEmitter.prototype, methods);
    this.mixin = {
      componentDidMount: function() {
        var warn = (console.warn || console.log).bind(console),
          changeFn;
        if(!this.storeDidChange){
            warn("A component that uses a McFly Store mixin is not implementing storeDidChange. onChange will be called instead, but this will no longer be supported from version 1.0.");
        }
        changeFn = this.storeDidChange || this.onChange;
        if(!changeFn){
            warn("A change handler is missing from a component with a McFly mixin. Notifications from Stores are not being handled.");
        }
        this.listener = ()=>{ this.isMounted() && changeFn(); }
        self.addChangeListener(this.listener);
      },
      componentWillUnmount: function() {
        this.listener && self.removeChangeListener(this.listener);
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
