// __tests__/Store-test.js

jest.dontMock('../Store');
jest.dontMock('../Dispatcher');
jest.dontMock('object-assign');
jest.dontMock('invariant');

describe('Store', function() {

  var Store = require('../Store');
  var mockStore;

  mockStore = new Store({
    testMethod: function(){
      return true;
    }
  },function(payload){
    switch(payload.actionType) {
      case 'ADD_TEST':
        return true;
      break;
    }
  });

  it('should return a new instance with methods attached via the methods argument', function() {

    expect(mockStore.testMethod).toBeDefined();

  });

  it('should attach the supplied callback to the new instance', function() {

    expect(mockStore.callback).toBeDefined();

  });

  it('should be merged with EventEmitter', function() {

    expect("on" in mockStore).toEqual(true);
    expect("removeListener" in mockStore).toEqual(true);
    expect("emit" in mockStore).toEqual(true);

  });

  it('should create a mixin property', function() {

    expect(mockStore.mixin).toBeDefined();

  });

  it('should return a dispatcherID when getDispatchToken is called', function() {

    mockStore.dispatcherID = 5;
    expect(mockStore.getDispatchToken()).toEqual(5);

  });

  it('should throw if a supplied method is named "callback"', function() {

    expect(function() {
      Store.constructor({
        callback: function(){
          return true;
        }
      },function(payload){});
    }).toThrow();

  });

  it('should throw if a supplied method is named "mixin"', function() {

    expect(function() {
      Store.constructor({
        mixin: function(){
          return true;
        }
      },function(payload){});
    }).toThrow();

  });

});