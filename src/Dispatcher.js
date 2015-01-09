'use strict';

var Dispatcher = require('flux').Dispatcher;

/** Creates a singlar instance of Facebook's Dispatcher */
var AppDispatcher = new Dispatcher();

module.exports = AppDispatcher;
