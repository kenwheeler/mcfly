'use strict';

var Action = require('./Action');
var assign = require('object-assign');

/**
 * ActionsFactory class
 */


  /**
   * Constructs an ActionsFactory object and translates actions parameter into
   * Action objects.
   *
   * @param {object} actions - Object with methods to create actions with
   * @constructor
   */
  function ActionsFactory(actions) {
    var $ActionsFactory_actions = {}, a, action;
    for (a in actions) {
      if(actions.hasOwnProperty(a)){
        action = new Action(actions[a]);
        $ActionsFactory_actions[a] = action.dispatch.bind(action);
      }
    }
    assign(this, $ActionsFactory_actions);
  }


module.exports = ActionsFactory;
