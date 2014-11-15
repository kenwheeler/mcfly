// __tests__/Action-test.js

jest.dontMock('../Action');
jest.dontMock('invariant');

describe('Action', function() {

  var Action = require('../Action');
  var Dispatcher = require('../Dispatcher');
  var mockAction;
  var callback;

  it('should attach the callback argument to the instance', function() {

    callback = function() {
      return;
    };

    mockAction = new Action(callback);

    expect(mockAction.callback).toBe(callback);

  });

  it('should throw if actionType isn\'t supplied', function(){

    callback = function(argument) {
      return{
        test: argument
      };
    };

    mockAction = new Action(callback);

    expect(function() {
      mockAction.dispatch("test");
    }).toThrow();

  });

  it('should not throw if actionType IS supplied', function(){

    callback = function(argument) {
      return{
        actionType: 'TEST_ACTION',
        test: argument
      };
    };

    mockAction = new Action(callback);

    expect(function() {
      mockAction.dispatch("test");
    }).not.toThrow();

  });

  pit('should reject if returns falsy value', function(){

    callback = function(argument) {
      return false;
    };

    return (new Action(callback)).dispatch("test")["catch"](
      function(error){
        expect(error).toBeUndefined();
      });

  });

  pit('should resolve if actionType IS supplied', function(){

    callback = function(argument) {
      return{
        actionType: 'TEST_ACTION',
        test: argument
      };
    };

    return (new Action(callback)).dispatch("test").then(
      function(success){
        expect(success).toBeUndefined();
      });

  });

  it('should have dispatched the supplied payload', function(){

      expect(Dispatcher.dispatch.mock.calls.length).toEqual(2);

  });

});