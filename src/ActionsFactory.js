'use strict';

import Action from './Action';
import assign from 'object-assign';

/**
 * ActionsFactory class
 */
export default class ActionsFactory {

  /**
   * Constructs an ActionsFactory object and translates actions parameter into
   * Action objects.
   *
   * @param {object} actions - Object with methods to create actions with
   * @constructor
   */
  constructor(actions) {
    const _actions = {};
    for (let a in actions) {
      if(actions.hasOwnProperty(a)){
        const action = new Action(actions[a]);
        _actions[a] = action.dispatch.bind(action);
      }
    }
    assign(this, _actions);
  }
}
