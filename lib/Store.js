var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var invariant = require('invariant');

/**
 * Store class
 */


  /**
   * Constructs a Store object, extends it with EventEmitter and supplied
   * methods parameter,  and creates a mixin property for use in components.
   *
   * @param {object} methods - Public methods for Store instance
   * @param {function} callback - Callback method for Dispatcher dispatches
   * @constructor
   */
  function Store(methods, callback) {"use strict";
    var self = this;
    this.callback = callback;
    invariant(!methods.callback, '"callback" is a reserved name and cannot be used as a method name.');
    invariant(!methods.mixin,'"mixin" is a reserved name and cannot be used as a method name.');
    assign(this, EventEmitter.prototype, methods);
    this.mixin = {
      componentDidMount: function() {
        var warn = (console.warn || console.log).bind(console);
        if(!this.storeDidChange){
            warn("A component that uses a McFly Store mixin is not implementing\
                  storeDidChange. onChange will be called instead, but this will\
                  no longer be supported from version 1.0.");
        }
        this.listener = this.storeDidChange || this.onChange;
        if(!this.listener){
            warn("A change handler is missing from a component with a McFly mixin.\
                  Notifications from Stores are not being handled.");
        }
        this.listener && self.addChangeListener(this.listener);
      },
      componentWillUnmount: function() {
        this.listener && self.removeChangeListener(this.listener);
      }
    }
  }

  /**
   * Returns dispatch token
   */
  Store.prototype.getDispatchToken=function() {"use strict";
    return this.dispatcherID;
  };

  /**
   * Emits change event
   */
  Store.prototype.emitChange=function() {"use strict";
    this.emit('change');
  };

  /**
   * Adds a change listener
   *
   * @param {function} callback - Callback method for change event
   */
  Store.prototype.addChangeListener=function(callback) {"use strict";
    this.on('change', callback);
  };

  /**
   * Removes a change listener
   *
   * @param {function} callback - Callback method for change event
   */
  Store.prototype.removeChangeListener=function(callback) {"use strict";
    this.removeListener('change', callback);
  };



module.exports = Store;