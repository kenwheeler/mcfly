'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flux = require('flux');

/** Creates a singlar instance of Facebook's Dispatcher */
var appDispatcher = new _flux.Dispatcher();

exports.default = appDispatcher;