'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Action = require('./Action');

var _Action2 = _interopRequireDefault(_Action);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * ActionsFactory class
 */

var ActionsFactory =

/**
 * Constructs an ActionsFactory object and translates actions parameter into
 * Action objects.
 *
 * @param {object} actions - Object with methods to create actions with
 * @constructor
 */
function ActionsFactory(actions) {
  _classCallCheck(this, ActionsFactory);

  var _actions = {};
  for (var a in actions) {
    if (actions.hasOwnProperty(a)) {
      var action = new _Action2.default(actions[a]);
      _actions[a] = action.dispatch.bind(action);
    }
  }
  (0, _objectAssign2.default)(this, _actions);
};

exports.default = ActionsFactory;